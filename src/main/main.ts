import { app, BrowserWindow, ipcMain, nativeTheme, shell } from 'electron';
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
} from '../modules/shared/types';
import { defaultModuleSettings as defaultModules } from '../modules/shared/types';

const execAsync = promisify(exec);

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
  // VPN connection logic would be implemented here
  // This is a placeholder - actual implementation requires OpenVPN or similar
  return false;
});

ipcMain.handle('disconnect-vpn', async (): Promise<boolean> => {
  // VPN disconnection logic would be implemented here
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

const GITHUB_REPO = 'GitGoneWild/Jarvis';

ipcMain.handle('check-for-updates', async (): Promise<UpdateInfo | null> => {
  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`);
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
  // Placeholder - actual implementation would use electron-updater
  return false;
});

ipcMain.handle('install-update', async (): Promise<void> => {
  // Placeholder - actual implementation would use electron-updater
});

// ========================================
// Real-Debrid Module IPC Handlers
// ========================================

ipcMain.handle('validate-real-debrid-key', async (_event, apiKey: string): Promise<RealDebridAccount | null> => {
  try {
    const response = await fetch('https://api.real-debrid.com/rest/1.0/user', {
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
// App Info IPC Handlers
// ========================================

ipcMain.handle('get-app-version', (): string => {
  return app.getVersion();
});
