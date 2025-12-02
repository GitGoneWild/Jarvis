import { contextBridge, ipcRenderer } from 'electron';
import type { UserSettings, Task, CalendarEvent } from '../types/global';
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
} from '../modules/shared/types';

// Callback storage for window state changes
let onWindowStateChange: ((maximized: boolean) => void) | null = null;

contextBridge.exposeInMainWorld('jarvisAPI', {
  // Settings
  getSettings: (): Promise<UserSettings> => ipcRenderer.invoke('get-settings'),
  saveSettings: (settings: UserSettings): Promise<void> => ipcRenderer.invoke('save-settings', settings),

  // Tasks
  getTasks: (): Promise<Task[]> => ipcRenderer.invoke('get-tasks'),
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> =>
    ipcRenderer.invoke('create-task', task),
  updateTask: (id: string, updates: Partial<Task>): Promise<Task | null> =>
    ipcRenderer.invoke('update-task', id, updates),
  deleteTask: (id: string): Promise<boolean> => ipcRenderer.invoke('delete-task', id),

  // Calendar Events
  getEvents: (): Promise<CalendarEvent[]> => ipcRenderer.invoke('get-events'),
  createEvent: (event: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>): Promise<CalendarEvent> =>
    ipcRenderer.invoke('create-event', event),
  updateEvent: (id: string, updates: Partial<CalendarEvent>): Promise<CalendarEvent | null> =>
    ipcRenderer.invoke('update-event', id, updates),
  deleteEvent: (id: string): Promise<boolean> => ipcRenderer.invoke('delete-event', id),

  // Health Module
  getHealthData: (): Promise<HealthData> => ipcRenderer.invoke('get-health-data'),
  createMeal: (meal: Omit<Meal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Meal> =>
    ipcRenderer.invoke('create-meal', meal),
  updateMeal: (id: string, updates: Partial<Meal>): Promise<Meal | null> =>
    ipcRenderer.invoke('update-meal', id, updates),
  deleteMeal: (id: string): Promise<boolean> => ipcRenderer.invoke('delete-meal', id),
  createWeightEntry: (entry: Omit<WeightEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<WeightEntry> =>
    ipcRenderer.invoke('create-weight-entry', entry),
  updateWeightEntry: (id: string, updates: Partial<WeightEntry>): Promise<WeightEntry | null> =>
    ipcRenderer.invoke('update-weight-entry', id, updates),
  deleteWeightEntry: (id: string): Promise<boolean> => ipcRenderer.invoke('delete-weight-entry', id),
  createSleepEntry: (entry: Omit<SleepEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<SleepEntry> =>
    ipcRenderer.invoke('create-sleep-entry', entry),
  updateSleepEntry: (id: string, updates: Partial<SleepEntry>): Promise<SleepEntry | null> =>
    ipcRenderer.invoke('update-sleep-entry', id, updates),
  deleteSleepEntry: (id: string): Promise<boolean> => ipcRenderer.invoke('delete-sleep-entry', id),
  createBloodPressureEntry: (entry: Omit<BloodPressureEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<BloodPressureEntry> =>
    ipcRenderer.invoke('create-blood-pressure-entry', entry),
  updateBloodPressureEntry: (id: string, updates: Partial<BloodPressureEntry>): Promise<BloodPressureEntry | null> =>
    ipcRenderer.invoke('update-blood-pressure-entry', id, updates),
  deleteBloodPressureEntry: (id: string): Promise<boolean> => ipcRenderer.invoke('delete-blood-pressure-entry', id),
  createMedication: (med: Omit<Medication, 'id' | 'createdAt' | 'updatedAt'>): Promise<Medication> =>
    ipcRenderer.invoke('create-medication', med),
  updateMedication: (id: string, updates: Partial<Medication>): Promise<Medication | null> =>
    ipcRenderer.invoke('update-medication', id, updates),
  deleteMedication: (id: string): Promise<boolean> => ipcRenderer.invoke('delete-medication', id),

  // Bookmarks Module
  getBookmarksData: (): Promise<BookmarksData> => ipcRenderer.invoke('get-bookmarks-data'),
  createBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt' | 'updatedAt'>): Promise<Bookmark> =>
    ipcRenderer.invoke('create-bookmark', bookmark),
  updateBookmark: (id: string, updates: Partial<Bookmark>): Promise<Bookmark | null> =>
    ipcRenderer.invoke('update-bookmark', id, updates),
  deleteBookmark: (id: string): Promise<boolean> => ipcRenderer.invoke('delete-bookmark', id),
  launchBookmark: (id: string): Promise<boolean> => ipcRenderer.invoke('launch-bookmark', id),

  // VPN Module
  getVPNData: (): Promise<VPNData> => ipcRenderer.invoke('get-vpn-data'),
  importVPNProfile: (configPath: string, name: string): Promise<VPNProfile> =>
    ipcRenderer.invoke('import-vpn-profile', configPath, name),
  deleteVPNProfile: (id: string): Promise<boolean> => ipcRenderer.invoke('delete-vpn-profile', id),
  connectVPN: (profileId: string): Promise<boolean> => ipcRenderer.invoke('connect-vpn', profileId),
  disconnectVPN: (): Promise<boolean> => ipcRenderer.invoke('disconnect-vpn'),
  getVPNStatus: (): Promise<VPNStatus> => ipcRenderer.invoke('get-vpn-status'),

  // Tools Module
  getToolsData: (): Promise<ToolsData> => ipcRenderer.invoke('get-tools-data'),
  scanTools: (): Promise<DetectedTool[]> => ipcRenderer.invoke('scan-tools'),
  openToolDocs: (toolName: ToolName): Promise<void> => ipcRenderer.invoke('open-tool-docs', toolName),

  // Updater Module
  checkForUpdates: (): Promise<UpdateInfo | null> => ipcRenderer.invoke('check-for-updates'),
  downloadUpdate: (): Promise<boolean> => ipcRenderer.invoke('download-update'),
  installUpdate: (): Promise<void> => ipcRenderer.invoke('install-update'),

  // Real-Debrid Module
  validateRealDebridKey: (apiKey: string): Promise<RealDebridAccount | null> =>
    ipcRenderer.invoke('validate-real-debrid-key', apiKey),

  // Timer Module
  getTimerData: (): Promise<TimerData> => ipcRenderer.invoke('get-timer-data'),
  startTimer: (name: string, category: string, tags?: string[]): Promise<ActiveTimer> =>
    ipcRenderer.invoke('start-timer', name, category, tags),
  stopTimer: (notes?: string): Promise<ActivityTimer | null> =>
    ipcRenderer.invoke('stop-timer', notes),
  getActiveTimer: (): Promise<ActiveTimer | null> => ipcRenderer.invoke('get-active-timer'),
  getActivities: (startDate?: string, endDate?: string): Promise<ActivityTimer[]> =>
    ipcRenderer.invoke('get-activities', startDate, endDate),
  deleteActivity: (id: string): Promise<boolean> => ipcRenderer.invoke('delete-activity', id),
  updateActivity: (id: string, updates: Partial<ActivityTimer>): Promise<ActivityTimer | null> =>
    ipcRenderer.invoke('update-activity', id, updates),

  // News Module
  getNewsData: (): Promise<NewsData> => ipcRenderer.invoke('get-news-data'),
  fetchNews: (): Promise<NewsArticle[]> => ipcRenderer.invoke('fetch-news'),
  fetchSportsScores: (): Promise<SportsScore[]> => ipcRenderer.invoke('fetch-sports-scores'),

  // Recommender Module
  getRecommendations: (answers: RecommendationAnswer[]): Promise<MovieTVRecommendation[]> =>
    ipcRenderer.invoke('get-recommendations', answers),

  // API Integrations Module
  testApiConnection: (service: ApiServiceName): Promise<{ success: boolean; error?: string }> =>
    ipcRenderer.invoke('test-api-connection', service),
  getLastFMUserInfo: (): Promise<LastFMUserInfo | null> => ipcRenderer.invoke('get-lastfm-user-info'),
  getLastFMRecentTracks: (): Promise<LastFMRecentTrack[]> => ipcRenderer.invoke('get-lastfm-recent-tracks'),
  getSonarrStatus: (): Promise<SonarrStatus | null> => ipcRenderer.invoke('get-sonarr-status'),
  getRadarrStatus: (): Promise<RadarrStatus | null> => ipcRenderer.invoke('get-radarr-status'),

  // Window controls
  minimizeWindow: (): void => ipcRenderer.send('minimize-window'),
  maximizeWindow: (): void => ipcRenderer.send('maximize-window'),
  closeWindow: (): void => ipcRenderer.send('close-window'),
  isMaximized: (): Promise<boolean> => ipcRenderer.invoke('is-maximized'),
  onWindowStateChange: (callback: (maximized: boolean) => void): void => {
    onWindowStateChange = callback;
  },

  // Platform & App Info
  getPlatform: (): string => process.platform,
  getAppVersion: (): string => ipcRenderer.invoke('get-app-version') as unknown as string,
});

// Listen for maximize/unmaximize events to update UI
ipcRenderer.on('window-maximized', () => {
  if (onWindowStateChange) onWindowStateChange(true);
});

ipcRenderer.on('window-unmaximized', () => {
  if (onWindowStateChange) onWindowStateChange(false);
});
