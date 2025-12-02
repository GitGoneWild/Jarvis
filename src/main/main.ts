import { app, BrowserWindow, ipcMain, nativeTheme, shell, net } from 'electron';
import * as path from 'path';
import * as crypto from 'crypto';
import { exec } from 'child_process';
import { promisify } from 'util';
import Store from 'electron-store';
import type { StoreSchema, UserSettings, Task, CalendarEvent } from '../types/global';
import type {
  Meal,
  WeightEntry,
  SleepEntry,
  BloodPressureEntry,
  Medication,
  Bookmark,
  VPNProfile,
  VPNStatus,
  DetectedTool,
  ToolName,
  UpdateInfo,
  RealDebridAccount,
  HealthData,
  VPNData,
  BookmarksData,
  ToolsData,
  TimerData,
  ActivityTimer,
  ActiveTimer,
  NewsData,
  NewsArticle,
  SportsScore,
  MovieTVRecommendation,
  RecommendationAnswer,
  ApiServiceName,
  LastFMUserInfo,
  LastFMRecentTrack,
  SonarrStatus,
  RadarrStatus,
  OllamaStatus,
  PlaygroundData,
  FunFact,
  OnThisDay,
  MP3Data,
  MP3Folder,
} from '../modules/shared/types';
import { defaultModuleSettings as defaultModules } from '../modules/shared/types';

const execAsync = promisify(exec);

// GitHub repository for auto-update checks
const GITHUB_REPO = 'GitGoneWild/Jarvis';

// Secure HTML sanitization - removes all HTML tags iteratively until no more are found
function sanitizeHtml(input: string | null | undefined): string {
  if (!input) return '';
  let result = input;
  let previous = '';
  // Iteratively remove tags until the string doesn't change
  while (result !== previous) {
    previous = result;
    result = result.replace(/<[^>]*>/g, '');
  }
  // Also escape any remaining angle brackets
  return result.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

let mainWindow: BrowserWindow | null = null;

// Get the base path for resources
const isDev = !app.isPackaged;
const basePath = isDev ? path.join(__dirname, '../../') : path.join(__dirname, '../');

// Default settings
const defaultSettings: UserSettings = {
  theme: 'dark',
  sidebarExpanded: true,
  defaultStartPage: 'home',
  notifications: {
    enabled: true,
    sounds: true,
    taskReminders: true,
    eventReminders: true,
  },
  modules: defaultModules,
};

// Default data for modules
const defaultHealthData: HealthData = {
  meals: [],
  weightEntries: [],
  sleepEntries: [],
  bloodPressureEntries: [],
  medications: [],
  medicationReminders: [],
};

const defaultVPNData: VPNData = {
  profiles: [],
  status: {
    connected: false,
    activeProfileId: null,
    externalIP: null,
    dnsServers: [],
    uploadSpeed: 0,
    downloadSpeed: 0,
    connectedSince: null,
  },
};

const defaultBookmarksData: BookmarksData = {
  bookmarks: [],
  categories: ['General', 'Work', 'Personal', 'Entertainment'],
};

const defaultToolsData: ToolsData = {
  detectedTools: [],
  lastFullScan: null,
};

const defaultTimerData: TimerData = {
  activities: [],
  activeTimer: null,
};

const defaultNewsData: NewsData = {
  articles: [],
  sports: [],
  lastUpdated: null,
};

const defaultPlaygroundDataStore: PlaygroundData = {
  funFacts: [],
  onThisDay: [],
  lastUpdated: null,
};

const defaultMP3DataStore: MP3Data = {
  folders: [],
  tracks: [],
  playHistory: [],
  playbackState: {
    currentTrackId: null,
    isPlaying: false,
    currentTime: 0,
    volume: 0.7,
    shuffle: false,
    repeat: 'none',
  },
};

// Initialize electron-store
const store = new Store<StoreSchema>({
  defaults: {
    settings: defaultSettings,
    tasks: [],
    events: [],
    health: defaultHealthData,
    vpn: defaultVPNData,
    bookmarks: defaultBookmarksData,
    tools: defaultToolsData,
    timer: defaultTimerData,
    news: defaultNewsData,
    playground: defaultPlaygroundDataStore,
    mp3: defaultMP3DataStore,
  },
});

// Generate unique ID using crypto for security
function generateId(): string {
  return crypto.randomUUID();
}

function createWindow(): void {
  const settings = store.get('settings', defaultSettings);

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    frame: false,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 16, y: 16 },
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    backgroundColor: settings.theme === 'light' ? '#eff1f5' : '#1e1e2e',
  });

  // Load index.html from src/renderer
  mainWindow.loadFile(path.join(basePath, 'src/renderer/index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Handle maximize/unmaximize for app bar button state
  mainWindow.on('maximize', () => {
    mainWindow?.webContents.send('window-maximized');
  });

  mainWindow.on('unmaximize', () => {
    mainWindow?.webContents.send('window-unmaximized');
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// ========================================
// Settings IPC Handlers
// ========================================

ipcMain.handle('get-settings', (): UserSettings => {
  return store.get('settings', defaultSettings);
});

ipcMain.handle('save-settings', (_event, settings: UserSettings): void => {
  store.set('settings', settings);

  // Apply theme
  if (settings.theme === 'system') {
    nativeTheme.themeSource = 'system';
  } else {
    nativeTheme.themeSource = settings.theme;
  }
});

// ========================================
// Task IPC Handlers
// ========================================

ipcMain.handle('get-tasks', (): Task[] => {
  return store.get('tasks', []);
});

ipcMain.handle('create-task', (_event, taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task => {
  const tasks = store.get('tasks', []);
  const now = new Date().toISOString();
  const newTask: Task = {
    ...taskData,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  tasks.push(newTask);
  store.set('tasks', tasks);
  return newTask;
});

ipcMain.handle('update-task', (_event, id: string, updates: Partial<Task>): Task | null => {
  const tasks = store.get('tasks', []);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;

  tasks[index] = {
    ...tasks[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  store.set('tasks', tasks);
  return tasks[index];
});

ipcMain.handle('delete-task', (_event, id: string): boolean => {
  const tasks = store.get('tasks', []);
  const filtered = tasks.filter((t) => t.id !== id);
  if (filtered.length === tasks.length) return false;
  store.set('tasks', filtered);
  return true;
});

// ========================================
// Calendar Event IPC Handlers
// ========================================

ipcMain.handle('get-events', (): CalendarEvent[] => {
  return store.get('events', []);
});

ipcMain.handle('create-event', (_event, eventData: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>): CalendarEvent => {
  const events = store.get('events', []);
  const now = new Date().toISOString();
  const newEvent: CalendarEvent = {
    ...eventData,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  events.push(newEvent);
  store.set('events', events);
  return newEvent;
});

ipcMain.handle('update-event', (_event, id: string, updates: Partial<CalendarEvent>): CalendarEvent | null => {
  const events = store.get('events', []);
  const index = events.findIndex((e) => e.id === id);
  if (index === -1) return null;

  events[index] = {
    ...events[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  store.set('events', events);
  return events[index];
});

ipcMain.handle('delete-event', (_event, id: string): boolean => {
  const events = store.get('events', []);
  const filtered = events.filter((e) => e.id !== id);
  if (filtered.length === events.length) return false;
  store.set('events', filtered);
  return true;
});

// ========================================
// Window Control IPC Handlers
// ========================================

ipcMain.on('minimize-window', () => {
  mainWindow?.minimize();
});

ipcMain.on('maximize-window', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});

ipcMain.on('close-window', () => {
  mainWindow?.close();
});

ipcMain.handle('is-maximized', (): boolean => {
  return mainWindow?.isMaximized() ?? false;
});

// ========================================
// Health Module IPC Handlers
// ========================================

ipcMain.handle('get-health-data', (): HealthData => {
  return store.get('health', defaultHealthData);
});

ipcMain.handle('create-meal', (_event, mealData: Omit<Meal, 'id' | 'createdAt' | 'updatedAt'>): Meal => {
  const health = store.get('health', defaultHealthData);
  const now = new Date().toISOString();
  const newMeal: Meal = {
    ...mealData,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  health.meals.push(newMeal);
  store.set('health', health);
  return newMeal;
});

ipcMain.handle('update-meal', (_event, id: string, updates: Partial<Meal>): Meal | null => {
  const health = store.get('health', defaultHealthData);
  const index = health.meals.findIndex((m) => m.id === id);
  if (index === -1) return null;
  health.meals[index] = { ...health.meals[index], ...updates, updatedAt: new Date().toISOString() };
  store.set('health', health);
  return health.meals[index];
});

ipcMain.handle('delete-meal', (_event, id: string): boolean => {
  const health = store.get('health', defaultHealthData);
  const originalLength = health.meals.length;
  health.meals = health.meals.filter((m) => m.id !== id);
  if (health.meals.length === originalLength) return false;
  store.set('health', health);
  return true;
});

ipcMain.handle('create-weight-entry', (_event, entryData: Omit<WeightEntry, 'id' | 'createdAt' | 'updatedAt'>): WeightEntry => {
  const health = store.get('health', defaultHealthData);
  const now = new Date().toISOString();
  const newEntry: WeightEntry = {
    ...entryData,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  health.weightEntries.push(newEntry);
  store.set('health', health);
  return newEntry;
});

ipcMain.handle('update-weight-entry', (_event, id: string, updates: Partial<WeightEntry>): WeightEntry | null => {
  const health = store.get('health', defaultHealthData);
  const index = health.weightEntries.findIndex((w) => w.id === id);
  if (index === -1) return null;
  health.weightEntries[index] = { ...health.weightEntries[index], ...updates, updatedAt: new Date().toISOString() };
  store.set('health', health);
  return health.weightEntries[index];
});

ipcMain.handle('delete-weight-entry', (_event, id: string): boolean => {
  const health = store.get('health', defaultHealthData);
  const originalLength = health.weightEntries.length;
  health.weightEntries = health.weightEntries.filter((w) => w.id !== id);
  if (health.weightEntries.length === originalLength) return false;
  store.set('health', health);
  return true;
});

ipcMain.handle('create-sleep-entry', (_event, entryData: Omit<SleepEntry, 'id' | 'createdAt' | 'updatedAt'>): SleepEntry => {
  const health = store.get('health', defaultHealthData);
  const now = new Date().toISOString();
  const newEntry: SleepEntry = {
    ...entryData,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  health.sleepEntries.push(newEntry);
  store.set('health', health);
  return newEntry;
});

ipcMain.handle('update-sleep-entry', (_event, id: string, updates: Partial<SleepEntry>): SleepEntry | null => {
  const health = store.get('health', defaultHealthData);
  const index = health.sleepEntries.findIndex((s) => s.id === id);
  if (index === -1) return null;
  health.sleepEntries[index] = { ...health.sleepEntries[index], ...updates, updatedAt: new Date().toISOString() };
  store.set('health', health);
  return health.sleepEntries[index];
});

ipcMain.handle('delete-sleep-entry', (_event, id: string): boolean => {
  const health = store.get('health', defaultHealthData);
  const originalLength = health.sleepEntries.length;
  health.sleepEntries = health.sleepEntries.filter((s) => s.id !== id);
  if (health.sleepEntries.length === originalLength) return false;
  store.set('health', health);
  return true;
});

ipcMain.handle('create-blood-pressure-entry', (_event, entryData: Omit<BloodPressureEntry, 'id' | 'createdAt' | 'updatedAt'>): BloodPressureEntry => {
  const health = store.get('health', defaultHealthData);
  const now = new Date().toISOString();
  const newEntry: BloodPressureEntry = {
    ...entryData,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  health.bloodPressureEntries.push(newEntry);
  store.set('health', health);
  return newEntry;
});

ipcMain.handle('update-blood-pressure-entry', (_event, id: string, updates: Partial<BloodPressureEntry>): BloodPressureEntry | null => {
  const health = store.get('health', defaultHealthData);
  const index = health.bloodPressureEntries.findIndex((b) => b.id === id);
  if (index === -1) return null;
  health.bloodPressureEntries[index] = { ...health.bloodPressureEntries[index], ...updates, updatedAt: new Date().toISOString() };
  store.set('health', health);
  return health.bloodPressureEntries[index];
});

ipcMain.handle('delete-blood-pressure-entry', (_event, id: string): boolean => {
  const health = store.get('health', defaultHealthData);
  const originalLength = health.bloodPressureEntries.length;
  health.bloodPressureEntries = health.bloodPressureEntries.filter((b) => b.id !== id);
  if (health.bloodPressureEntries.length === originalLength) return false;
  store.set('health', health);
  return true;
});

ipcMain.handle('create-medication', (_event, medData: Omit<Medication, 'id' | 'createdAt' | 'updatedAt'>): Medication => {
  const health = store.get('health', defaultHealthData);
  const now = new Date().toISOString();
  const newMed: Medication = {
    ...medData,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  health.medications.push(newMed);
  store.set('health', health);
  return newMed;
});

ipcMain.handle('update-medication', (_event, id: string, updates: Partial<Medication>): Medication | null => {
  const health = store.get('health', defaultHealthData);
  const index = health.medications.findIndex((m) => m.id === id);
  if (index === -1) return null;
  health.medications[index] = { ...health.medications[index], ...updates, updatedAt: new Date().toISOString() };
  store.set('health', health);
  return health.medications[index];
});

ipcMain.handle('delete-medication', (_event, id: string): boolean => {
  const health = store.get('health', defaultHealthData);
  const originalLength = health.medications.length;
  health.medications = health.medications.filter((m) => m.id !== id);
  if (health.medications.length === originalLength) return false;
  store.set('health', health);
  return true;
});

// ========================================
// Bookmarks Module IPC Handlers
// ========================================

ipcMain.handle('get-bookmarks-data', (): BookmarksData => {
  return store.get('bookmarks', defaultBookmarksData);
});

ipcMain.handle('create-bookmark', (_event, bookmarkData: Omit<Bookmark, 'id' | 'createdAt' | 'updatedAt'>): Bookmark => {
  const bookmarks = store.get('bookmarks', defaultBookmarksData);
  const now = new Date().toISOString();
  const newBookmark: Bookmark = {
    ...bookmarkData,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  bookmarks.bookmarks.push(newBookmark);
  store.set('bookmarks', bookmarks);
  return newBookmark;
});

ipcMain.handle('update-bookmark', (_event, id: string, updates: Partial<Bookmark>): Bookmark | null => {
  const bookmarks = store.get('bookmarks', defaultBookmarksData);
  const index = bookmarks.bookmarks.findIndex((b) => b.id === id);
  if (index === -1) return null;
  bookmarks.bookmarks[index] = { ...bookmarks.bookmarks[index], ...updates, updatedAt: new Date().toISOString() };
  store.set('bookmarks', bookmarks);
  return bookmarks.bookmarks[index];
});

ipcMain.handle('delete-bookmark', (_event, id: string): boolean => {
  const bookmarks = store.get('bookmarks', defaultBookmarksData);
  const originalLength = bookmarks.bookmarks.length;
  bookmarks.bookmarks = bookmarks.bookmarks.filter((b) => b.id !== id);
  if (bookmarks.bookmarks.length === originalLength) return false;
  store.set('bookmarks', bookmarks);
  return true;
});

ipcMain.handle('launch-bookmark', async (_event, id: string): Promise<boolean> => {
  const bookmarks = store.get('bookmarks', defaultBookmarksData);
  const bookmark = bookmarks.bookmarks.find((b) => b.id === id);
  if (!bookmark) return false;

  try {
    if (bookmark.type === 'url') {
      await shell.openExternal(bookmark.target);
    } else {
      await shell.openPath(bookmark.target);
    }
    return true;
  } catch {
    return false;
  }
});

// ========================================
// VPN Module IPC Handlers
// ========================================

ipcMain.handle('get-vpn-data', (): VPNData => {
  return store.get('vpn', defaultVPNData);
});

ipcMain.handle('import-vpn-profile', async (_event, configPath: string, name: string): Promise<VPNProfile> => {
  const vpn = store.get('vpn', defaultVPNData);
  const now = new Date().toISOString();
  const newProfile: VPNProfile = {
    id: generateId(),
    name,
    configPath,
    isDefault: vpn.profiles.length === 0,
    lastUsed: null,
    description: '',
    createdAt: now,
    updatedAt: now,
  };
  vpn.profiles.push(newProfile);
  store.set('vpn', vpn);
  return newProfile;
});

ipcMain.handle('delete-vpn-profile', (_event, id: string): boolean => {
  const vpn = store.get('vpn', defaultVPNData);
  const originalLength = vpn.profiles.length;
  vpn.profiles = vpn.profiles.filter((p) => p.id !== id);
  if (vpn.profiles.length === originalLength) return false;
  store.set('vpn', vpn);
  return true;
});

ipcMain.handle('connect-vpn', async (_event, _profileId: string): Promise<boolean> => {
  // Note: VPN connection requires OpenVPN client installation and proper system configuration
  // This is a placeholder for future implementation
  console.log('VPN connection not yet implemented. Requires OpenVPN client integration.');
  return false;
});

ipcMain.handle('disconnect-vpn', async (): Promise<boolean> => {
  // Note: VPN disconnection requires OpenVPN client integration
  // This is a placeholder for future implementation
  console.log('VPN disconnection not yet implemented. Requires OpenVPN client integration.');
  return false;
});

ipcMain.handle('get-vpn-status', (): VPNStatus => {
  const vpn = store.get('vpn', defaultVPNData);
  return vpn.status;
});

// ========================================
// Tools Module IPC Handlers
// ========================================

const toolDefinitions: Record<ToolName, { command: string; displayName: string; docsUrl: string }> = {
  terraform: { command: 'terraform --version', displayName: 'Terraform', docsUrl: 'https://www.terraform.io/docs' },
  docker: { command: 'docker --version', displayName: 'Docker', docsUrl: 'https://docs.docker.com' },
  ansible: { command: 'ansible --version', displayName: 'Ansible', docsUrl: 'https://docs.ansible.com' },
  python: { command: 'python3 --version || python --version', displayName: 'Python', docsUrl: 'https://docs.python.org' },
  node: { command: 'node --version', displayName: 'Node.js', docsUrl: 'https://nodejs.org/docs' },
  go: { command: 'go version', displayName: 'Go', docsUrl: 'https://go.dev/doc' },
  kubectl: { command: 'kubectl version --client', displayName: 'Kubectl', docsUrl: 'https://kubernetes.io/docs' },
  'aws-cli': { command: 'aws --version', displayName: 'AWS CLI', docsUrl: 'https://docs.aws.amazon.com/cli' },
};

async function detectTool(name: ToolName): Promise<DetectedTool> {
  const def = toolDefinitions[name];
  const now = new Date().toISOString();
  try {
    const { stdout } = await execAsync(def.command);
    const versionMatch = stdout.match(/(\d+\.\d+\.\d+)/);
    return {
      name,
      displayName: def.displayName,
      installed: true,
      version: versionMatch ? versionMatch[1] : stdout.trim().split('\n')[0],
      path: null,
      docsUrl: def.docsUrl,
      lastChecked: now,
    };
  } catch {
    return {
      name,
      displayName: def.displayName,
      installed: false,
      version: null,
      path: null,
      docsUrl: def.docsUrl,
      lastChecked: now,
    };
  }
}

ipcMain.handle('get-tools-data', (): ToolsData => {
  return store.get('tools', defaultToolsData);
});

ipcMain.handle('scan-tools', async (): Promise<DetectedTool[]> => {
  const settings = store.get('settings', defaultSettings);
  const toolsToCheck = settings.modules.tools.toolsToCheck;
  const detectedTools: DetectedTool[] = [];

  for (const toolName of toolsToCheck) {
    const result = await detectTool(toolName);
    detectedTools.push(result);
  }

  const tools = store.get('tools', defaultToolsData);
  tools.detectedTools = detectedTools;
  tools.lastFullScan = new Date().toISOString();
  store.set('tools', tools);

  return detectedTools;
});

ipcMain.handle('open-tool-docs', async (_event, toolName: ToolName): Promise<void> => {
  const def = toolDefinitions[toolName];
  if (def) {
    await shell.openExternal(def.docsUrl);
  }
});

// ========================================
// Updater Module IPC Handlers
// ========================================

ipcMain.handle('check-for-updates', async (): Promise<UpdateInfo | null> => {
  try {
    const response = await net.fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`);
    if (!response.ok) return null;

    const release = await response.json() as {
      tag_name: string;
      body: string;
      html_url: string;
      assets: Array<{ browser_download_url: string }>;
      published_at: string;
    };
    const latestVersion = release.tag_name.replace(/^v/, '');
    const currentVersion = app.getVersion();

    const isOutdated = compareVersions(currentVersion, latestVersion) < 0;

    return {
      currentVersion,
      latestVersion,
      isOutdated,
      releaseNotes: release.body || '',
      releaseUrl: release.html_url,
      downloadUrl: release.assets[0]?.browser_download_url || release.html_url,
      publishedAt: release.published_at,
    };
  } catch {
    return null;
  }
});

function compareVersions(v1: string, v2: string): number {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const p1 = parts1[i] || 0;
    const p2 = parts2[i] || 0;
    if (p1 < p2) return -1;
    if (p1 > p2) return 1;
  }
  return 0;
}

ipcMain.handle('download-update', async (): Promise<boolean> => {
  // Note: Full auto-update requires electron-updater package integration
  // This is a placeholder that returns false indicating manual update is needed
  console.log('Auto-download not implemented. Please download update manually from GitHub.');
  return false;
});

ipcMain.handle('install-update', async (): Promise<void> => {
  // Note: Full auto-update requires electron-updater package integration
  // This is a placeholder - users should download and install manually
  console.log('Auto-install not implemented. Please install update manually.');
});

// ========================================
// Real-Debrid Module IPC Handlers
// ========================================

ipcMain.handle('validate-real-debrid-key', async (_event, apiKey: string): Promise<RealDebridAccount | null> => {
  try {
    const response = await net.fetch('https://api.real-debrid.com/rest/1.0/user', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) return null;

    const user = await response.json() as {
      username: string;
      email: string;
      type: string;
      expiration: string;
    };
    return {
      username: user.username,
      email: user.email,
      premium: user.type === 'premium',
      expirationDate: user.expiration || null,
    };
  } catch {
    return null;
  }
});

// ========================================
// Timer Module IPC Handlers
// ========================================

ipcMain.handle('get-timer-data', (): TimerData => {
  return store.get('timer', defaultTimerData);
});

ipcMain.handle('start-timer', (_event, name: string, category: string, tags: string[] = []): ActiveTimer => {
  const timer = store.get('timer', defaultTimerData);
  
  // If there's already an active timer, stop it first
  if (timer.activeTimer) {
    const activity = createActivityFromTimer(timer.activeTimer, '');
    timer.activities.push(activity);
  }
  
  const activeTimer: ActiveTimer = {
    id: generateId(),
    name,
    category,
    startTime: new Date().toISOString(),
    tags,
  };
  
  timer.activeTimer = activeTimer;
  store.set('timer', timer);
  return activeTimer;
});

function createActivityFromTimer(activeTimer: ActiveTimer, notes: string): ActivityTimer {
  const now = new Date();
  const startTime = new Date(activeTimer.startTime);
  const duration = Math.floor((now.getTime() - startTime.getTime()) / 1000);
  
  return {
    id: activeTimer.id,
    name: activeTimer.name,
    category: activeTimer.category,
    startTime: activeTimer.startTime,
    endTime: now.toISOString(),
    duration,
    tags: activeTimer.tags,
    notes,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };
}

ipcMain.handle('stop-timer', (_event, notes: string = ''): ActivityTimer | null => {
  const timer = store.get('timer', defaultTimerData);
  
  if (!timer.activeTimer) return null;
  
  const activity = createActivityFromTimer(timer.activeTimer, notes);
  timer.activities.push(activity);
  timer.activeTimer = null;
  store.set('timer', timer);
  
  return activity;
});

ipcMain.handle('get-active-timer', (): ActiveTimer | null => {
  const timer = store.get('timer', defaultTimerData);
  return timer.activeTimer;
});

ipcMain.handle('get-activities', (_event, startDate?: string, endDate?: string): ActivityTimer[] => {
  const timer = store.get('timer', defaultTimerData);
  let activities = timer.activities;
  
  if (startDate) {
    const start = new Date(startDate);
    activities = activities.filter(a => new Date(a.startTime) >= start);
  }
  
  if (endDate) {
    const end = new Date(endDate);
    activities = activities.filter(a => new Date(a.startTime) <= end);
  }
  
  return activities.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
});

ipcMain.handle('delete-activity', (_event, id: string): boolean => {
  const timer = store.get('timer', defaultTimerData);
  const originalLength = timer.activities.length;
  timer.activities = timer.activities.filter(a => a.id !== id);
  if (timer.activities.length === originalLength) return false;
  store.set('timer', timer);
  return true;
});

ipcMain.handle('update-activity', (_event, id: string, updates: Partial<ActivityTimer>): ActivityTimer | null => {
  const timer = store.get('timer', defaultTimerData);
  const index = timer.activities.findIndex(a => a.id === id);
  if (index === -1) return null;
  timer.activities[index] = { ...timer.activities[index], ...updates, updatedAt: new Date().toISOString() };
  store.set('timer', timer);
  return timer.activities[index];
});

// ========================================
// News Module IPC Handlers
// ========================================

ipcMain.handle('get-news-data', (): NewsData => {
  return store.get('news', defaultNewsData);
});

ipcMain.handle('fetch-news', async (): Promise<NewsArticle[]> => {
  try {
    // Using a free RSS-to-JSON service for BBC News
    const response = await net.fetch('https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/news/world/rss.xml');
    
    if (!response.ok) return [];
    
    const data = await response.json() as {
      items: Array<{
        title: string;
        description: string;
        link: string;
        enclosure?: { link: string };
        pubDate: string;
      }>;
      feed: { title: string };
    };
    
    const articles: NewsArticle[] = data.items.slice(0, 10).map((item, index) => ({
      id: `news-${Date.now()}-${index}`,
      title: sanitizeHtml(item.title),
      description: sanitizeHtml(item.description),
      source: data.feed?.title || 'BBC News',
      url: item.link,
      imageUrl: item.enclosure?.link || null,
      publishedAt: item.pubDate,
      category: 'general' as const,
    }));
    
    const news = store.get('news', defaultNewsData);
    news.articles = articles;
    news.lastUpdated = new Date().toISOString();
    store.set('news', news);
    
    return articles;
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return [];
  }
});

ipcMain.handle('fetch-sports-scores', async (): Promise<SportsScore[]> => {
  try {
    // Using a free RSS-to-JSON service for BBC Sport
    const response = await net.fetch('https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/sport/rss.xml');
    
    if (!response.ok) return [];
    
    const data = await response.json() as {
      items: Array<{
        title: string;
        description: string;
        link: string;
        pubDate: string;
      }>;
    };
    
    // Parse sport headlines as "scores" - this is a simplified representation
    const scores: SportsScore[] = data.items.slice(0, 5).map((item, index) => ({
      id: `sport-${Date.now()}-${index}`,
      homeTeam: item.title.split(' - ')[0] || item.title,
      awayTeam: item.title.split(' - ')[1] || '',
      homeScore: 0,
      awayScore: 0,
      status: 'finished' as const,
      competition: 'Sports News',
      startTime: item.pubDate,
    }));
    
    const news = store.get('news', defaultNewsData);
    news.sports = scores;
    store.set('news', news);
    
    return scores;
  } catch (error) {
    console.error('Failed to fetch sports scores:', error);
    return [];
  }
});

// ========================================
// Recommender Module IPC Handlers
// ========================================

ipcMain.handle('get-recommendations', async (_event, answers: RecommendationAnswer[]): Promise<MovieTVRecommendation[]> => {
  // Map user answers to search parameters
  const genreAnswer = answers.find(a => a.questionId === 'q1')?.answer || 'Action';
  const settings = store.get('settings', defaultSettings);
  const includeTV = settings.modules.recommender.includeTVShows;
  const includeMovies = settings.modules.recommender.includeMovies;
  
  // Genre mapping for API query
  const genreMap: Record<string, string> = {
    'Action': 'action',
    'Comedy': 'comedy',
    'Drama': 'drama',
    'Horror': 'horror',
    'Sci-Fi': 'sci-fi',
    'Romance': 'romance',
    'Documentary': 'documentary',
  };
  
  const genre = genreMap[genreAnswer] || 'action';
  
  try {
    // Using a free movie database API
    const response = await net.fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(genre)}`);
    
    if (!response.ok) return generateFallbackRecommendations(genreAnswer);
    
    const data = await response.json() as Array<{
      show: {
        id: number;
        name: string;
        type: string;
        premiered: string;
        rating: { average: number | null };
        genres: string[];
        summary: string;
        image: { medium: string; original: string } | null;
      };
    }>;
    
    const recommendations: MovieTVRecommendation[] = data.slice(0, 6).map(item => ({
      id: `rec-${item.show.id}`,
      title: item.show.name,
      type: (item.show.type === 'Scripted' && !includeMovies) ? 'tv' : 
            (includeTV ? 'tv' : 'movie'),
      year: item.show.premiered ? parseInt(item.show.premiered.split('-')[0]) : 2020,
      rating: item.show.rating?.average || 7.0,
      genre: item.show.genres || [genreAnswer],
      description: sanitizeHtml(item.show.summary) || 'No description available.',
      posterUrl: item.show.image?.medium || null,
      backdropUrl: item.show.image?.original || null,
    }));
    
    return recommendations;
  } catch (error) {
    console.error('Failed to get recommendations from API:', error);
    return generateFallbackRecommendations(genreAnswer);
  }
});

function generateFallbackRecommendations(genre: string): MovieTVRecommendation[] {
  // Fallback recommendations when API fails
  const fallbackData: Record<string, MovieTVRecommendation[]> = {
    'Action': [
      { id: 'fb-1', title: 'Die Hard', type: 'movie', year: 1988, rating: 8.2, genre: ['Action', 'Thriller'], description: 'An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party.', posterUrl: null, backdropUrl: null },
      { id: 'fb-2', title: 'Mad Max: Fury Road', type: 'movie', year: 2015, rating: 8.1, genre: ['Action', 'Adventure'], description: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler.', posterUrl: null, backdropUrl: null },
    ],
    'Comedy': [
      { id: 'fb-3', title: 'The Office', type: 'tv', year: 2005, rating: 8.9, genre: ['Comedy'], description: 'A mockumentary on a group of typical office workers.', posterUrl: null, backdropUrl: null },
      { id: 'fb-4', title: 'Brooklyn Nine-Nine', type: 'tv', year: 2013, rating: 8.4, genre: ['Comedy', 'Crime'], description: 'Jake Peralta, an immature but talented NYPD detective.', posterUrl: null, backdropUrl: null },
    ],
    'Drama': [
      { id: 'fb-5', title: 'Breaking Bad', type: 'tv', year: 2008, rating: 9.5, genre: ['Crime', 'Drama', 'Thriller'], description: 'A high school chemistry teacher turned methamphetamine manufacturer.', posterUrl: null, backdropUrl: null },
      { id: 'fb-6', title: 'The Shawshank Redemption', type: 'movie', year: 1994, rating: 9.3, genre: ['Drama'], description: 'Two imprisoned men bond over a number of years.', posterUrl: null, backdropUrl: null },
    ],
  };
  
  return fallbackData[genre] || fallbackData['Action'];
}

// ========================================
// API Integrations Module IPC Handlers
// ========================================

// Helper function for API connection testing with common patterns
async function testArrServiceConnection(baseUrl: string, apiKey: string, endpoint: string): Promise<{ success: boolean; error?: string }> {
  if (!apiKey) return { success: false, error: 'API key not configured' };
  if (!baseUrl) return { success: false, error: 'Base URL not configured' };
  
  try {
    const url = new URL(endpoint, baseUrl);
    const response = await net.fetch(url.toString(), {
      headers: { 'X-Api-Key': apiKey },
    });
    if (!response.ok) throw new Error('Connection failed');
    return { success: true };
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Connection failed';
    return { success: false, error };
  }
}

ipcMain.handle('test-api-connection', async (_event, service: ApiServiceName): Promise<{ success: boolean; error?: string }> => {
  const settings = store.get('settings', defaultSettings);
  const integration = settings.modules.apiIntegrations[service];
  
  try {
    switch (service) {
      case 'lastfm': {
        const lastfmConfig = integration as typeof settings.modules.apiIntegrations.lastfm;
        if (!lastfmConfig.apiKey) {
          return { success: false, error: 'API key not configured' };
        }
        const response = await net.fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${encodeURIComponent(lastfmConfig.username || '')}&api_key=${encodeURIComponent(lastfmConfig.apiKey)}&format=json`
        );
        if (!response.ok) throw new Error('Invalid API key or username');
        return { success: true };
      }
      case 'sonarr': {
        const sonarrConfig = integration as typeof settings.modules.apiIntegrations.sonarr;
        return testArrServiceConnection(sonarrConfig.baseUrl, sonarrConfig.apiKey, '/api/v3/system/status');
      }
      case 'radarr': {
        const radarrConfig = integration as typeof settings.modules.apiIntegrations.radarr;
        return testArrServiceConnection(radarrConfig.baseUrl, radarrConfig.apiKey, '/api/v3/system/status');
      }
      case 'ollama': {
        const ollamaConfig = integration as typeof settings.modules.apiIntegrations.ollama;
        if (!ollamaConfig.baseUrl) return { success: false, error: 'Ollama URL not configured' };
        const url = new URL('/api/tags', ollamaConfig.baseUrl);
        const response = await net.fetch(url.toString());
        if (!response.ok) throw new Error('Connection failed');
        return { success: true };
      }
      default:
        return { success: false, error: 'Unknown service' };
    }
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Connection failed';
    return { success: false, error };
  }
});

ipcMain.handle('get-lastfm-user-info', async (): Promise<LastFMUserInfo | null> => {
  const settings = store.get('settings', defaultSettings);
  const integration = settings.modules.apiIntegrations.lastfm;
  
  if (!integration.apiKey || !integration.username) return null;
  
  try {
    const response = await net.fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${encodeURIComponent(integration.username)}&api_key=${encodeURIComponent(integration.apiKey)}&format=json`
    );
    
    if (!response.ok) return null;
    
    const data = await response.json() as {
      user: {
        name: string;
        realname: string;
        playcount: string;
        registered: { unixtime: string };
        image: Array<{ '#text': string }>;
      };
    };
    
    return {
      username: data.user.name,
      realName: data.user.realname || '',
      playCount: parseInt(data.user.playcount) || 0,
      registeredAt: new Date(parseInt(data.user.registered.unixtime) * 1000).toISOString(),
      imageUrl: data.user.image?.[2]?.['#text'] || null,
    };
  } catch (error) {
    console.error('Failed to get LastFM user info:', error);
    return null;
  }
});

ipcMain.handle('get-lastfm-recent-tracks', async (): Promise<LastFMRecentTrack[]> => {
  const settings = store.get('settings', defaultSettings);
  const integration = settings.modules.apiIntegrations.lastfm;
  
  if (!integration.apiKey || !integration.username) return [];
  
  try {
    const response = await net.fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(integration.username)}&api_key=${encodeURIComponent(integration.apiKey)}&format=json&limit=10`
    );
    
    if (!response.ok) return [];
    
    const data = await response.json() as {
      recenttracks: {
        track: Array<{
          name: string;
          artist: { '#text': string };
          album: { '#text': string };
          image: Array<{ '#text': string }>;
          date?: { uts: string };
          '@attr'?: { nowplaying: string };
        }>;
      };
    };
    
    return data.recenttracks.track.map(track => ({
      name: track.name,
      artist: track.artist['#text'],
      album: track.album['#text'],
      imageUrl: track.image?.[2]?.['#text'] || null,
      playedAt: track.date ? new Date(parseInt(track.date.uts) * 1000).toISOString() : null,
      nowPlaying: track['@attr']?.nowplaying === 'true',
    }));
  } catch (error) {
    console.error('Failed to get LastFM recent tracks:', error);
    return [];
  }
});

ipcMain.handle('get-sonarr-status', async (): Promise<SonarrStatus | null> => {
  const settings = store.get('settings', defaultSettings);
  const integration = settings.modules.apiIntegrations.sonarr;
  
  if (!integration.apiKey || !integration.baseUrl) return null;
  
  try {
    const statusUrl = new URL('/api/v3/system/status', integration.baseUrl);
    const statusResponse = await net.fetch(statusUrl.toString(), {
      headers: { 'X-Api-Key': integration.apiKey },
    });
    
    if (!statusResponse.ok) return null;
    
    const statusData = await statusResponse.json() as { version: string };
    
    // Get series count
    const seriesUrl = new URL('/api/v3/series', integration.baseUrl);
    const seriesResponse = await net.fetch(seriesUrl.toString(), {
      headers: { 'X-Api-Key': integration.apiKey },
    });
    const seriesData = await seriesResponse.json() as Array<{ episodeCount: number }>;
    
    // Get queue count
    const queueUrl = new URL('/api/v3/queue', integration.baseUrl);
    const queueResponse = await net.fetch(queueUrl.toString(), {
      headers: { 'X-Api-Key': integration.apiKey },
    });
    const queueData = await queueResponse.json() as { totalRecords: number };
    
    return {
      version: statusData.version,
      seriesCount: seriesData.length,
      episodeCount: seriesData.reduce((sum, s) => sum + (s.episodeCount || 0), 0),
      queueCount: queueData.totalRecords || 0,
    };
  } catch (error) {
    console.error('Failed to get Sonarr status:', error);
    return null;
  }
});

ipcMain.handle('get-radarr-status', async (): Promise<RadarrStatus | null> => {
  const settings = store.get('settings', defaultSettings);
  const integration = settings.modules.apiIntegrations.radarr;
  
  if (!integration.apiKey || !integration.baseUrl) return null;
  
  try {
    const statusUrl = new URL('/api/v3/system/status', integration.baseUrl);
    const statusResponse = await net.fetch(statusUrl.toString(), {
      headers: { 'X-Api-Key': integration.apiKey },
    });
    
    if (!statusResponse.ok) return null;
    
    const statusData = await statusResponse.json() as { version: string };
    
    // Get movie count
    const movieUrl = new URL('/api/v3/movie', integration.baseUrl);
    const movieResponse = await net.fetch(movieUrl.toString(), {
      headers: { 'X-Api-Key': integration.apiKey },
    });
    const movieData = await movieResponse.json() as Array<unknown>;
    
    // Get queue count
    const queueUrl = new URL('/api/v3/queue', integration.baseUrl);
    const queueResponse = await net.fetch(queueUrl.toString(), {
      headers: { 'X-Api-Key': integration.apiKey },
    });
    const queueData = await queueResponse.json() as { totalRecords: number };
    
    return {
      version: statusData.version,
      movieCount: movieData.length,
      queueCount: queueData.totalRecords || 0,
    };
  } catch (error) {
    console.error('Failed to get Radarr status:', error);
    return null;
  }
});

// ========================================
// Ollama Integration IPC Handlers
// ========================================

ipcMain.handle('get-ollama-status', async (): Promise<OllamaStatus | null> => {
  const settings = store.get('settings', defaultSettings);
  const integration = settings.modules.apiIntegrations.ollama;
  
  if (!integration.baseUrl) return null;
  
  try {
    const tagsUrl = new URL('/api/tags', integration.baseUrl);
    const response = await net.fetch(tagsUrl.toString());
    
    if (!response.ok) return null;
    
    const data = await response.json() as { models: Array<{ name: string }> };
    
    return {
      version: 'Connected',
      models: data.models?.map(m => m.name) || [],
      isRunning: true,
    };
  } catch (error) {
    console.error('Failed to get Ollama status:', error);
    return null;
  }
});

// ========================================
// Playground Module IPC Handlers
// ========================================

const defaultPlaygroundData: PlaygroundData = {
  funFacts: [],
  onThisDay: [],
  lastUpdated: null,
};

ipcMain.handle('get-playground-data', (): PlaygroundData => {
  return defaultPlaygroundData;
});

ipcMain.handle('fetch-fun-fact', async (): Promise<FunFact | null> => {
  try {
    const response = await net.fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
    
    if (!response.ok) return null;
    
    const data = await response.json() as { id: string; text: string; source: string };
    
    return {
      id: data.id || `fact-${Date.now()}`,
      fact: sanitizeHtml(data.text),
      category: 'random',
      source: data.source || null,
    };
  } catch (error) {
    console.error('Failed to fetch fun fact:', error);
    return null;
  }
});

ipcMain.handle('fetch-on-this-day', async (): Promise<OnThisDay[]> => {
  try {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    
    const response = await net.fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`);
    
    if (!response.ok) return [];
    
    const data = await response.json() as {
      events?: Array<{ year: number; text: string }>;
      births?: Array<{ year: number; text: string }>;
    };
    
    const events: OnThisDay[] = [];
    
    // Add historical events
    if (data.events) {
      data.events.slice(0, 5).forEach((event, index) => {
        events.push({
          id: `event-${index}`,
          year: event.year,
          event: sanitizeHtml(event.text),
          category: 'historical',
        });
      });
    }
    
    // Add notable births
    if (data.births) {
      data.births.slice(0, 3).forEach((birth, index) => {
        events.push({
          id: `birth-${index}`,
          year: birth.year,
          event: sanitizeHtml(birth.text),
          category: 'birth',
        });
      });
    }
    
    return events;
  } catch (error) {
    console.error('Failed to fetch On This Day data:', error);
    return [];
  }
});

// ========================================
// MP3 Module IPC Handlers
// ========================================

const defaultMP3Data: MP3Data = {
  folders: [],
  tracks: [],
  playHistory: [],
  playbackState: {
    currentTrackId: null,
    isPlaying: false,
    currentTime: 0,
    volume: 0.7,
    shuffle: false,
    repeat: 'none',
  },
};

ipcMain.handle('get-mp3-data', (): MP3Data => {
  return defaultMP3Data;
});

ipcMain.handle('add-mp3-folder', async (_event, folderPath: string): Promise<MP3Folder | null> => {
  try {
    const folder: MP3Folder = {
      id: generateId(),
      path: folderPath,
      name: path.basename(folderPath),
      trackCount: 0,
      addedAt: new Date().toISOString(),
    };
    
    return folder;
  } catch (error) {
    console.error('Failed to add MP3 folder:', error);
    return null;
  }
});

// ========================================
// App Info IPC Handlers
// ========================================

ipcMain.handle('get-app-version', (): string => {
  return app.getVersion();
});
