import type {
  ModuleSettings,
  HealthData,
  VPNData,
  BookmarksData,
  ToolsData,
  TimerData,
  NewsData,
  ActivityTimer,
  ActiveTimer,
  NewsArticle,
  SportsScore,
  MovieTVRecommendation,
  LastFMUserInfo,
  LastFMRecentTrack,
  SonarrStatus,
  RadarrStatus,
  ApiServiceName,
  OllamaStatus,
  PlaygroundData,
  FunFact,
  OnThisDay,
  MP3Data,
  MP3Track,
  MP3Folder,
} from '../modules/shared/types';

// User Settings
export interface UserSettings {
  theme: 'dark' | 'light' | 'system';
  sidebarExpanded: boolean;
  defaultStartPage: 'home' | 'tasks' | 'calendar' | 'settings' | 'health' | 'vpn' | 'bookmarks' | 'tools' | 'timers' | 'news' | 'playground' | 'integrations' | 'mp3';
  notifications: {
    enabled: boolean;
    sounds: boolean;
    taskReminders: boolean;
    eventReminders: boolean;
  };
  modules: ModuleSettings;
}

// Task
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
  createdAt: string;
  updatedAt: string;
  reminder: string | null;
}

// Calendar Event
export type EventType = 'birthday' | 'meeting' | 'event' | 'reminder';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string | null;
  endTime: string | null;
  type: EventType;
  recurring: boolean;
  reminder: 'none' | 'on-time' | '10-minutes' | '1-hour' | '1-day';
  createdAt: string;
  updatedAt: string;
}

// Store Schema
export interface StoreSchema {
  settings: UserSettings;
  tasks: Task[];
  events: CalendarEvent[];
  health: HealthData;
  vpn: VPNData;
  bookmarks: BookmarksData;
  tools: ToolsData;
  timer: TimerData;
  news: NewsData;
}

// Jarvis API exposed via preload
export interface JarvisAPI {
  // Settings
  getSettings: () => Promise<UserSettings>;
  saveSettings: (settings: UserSettings) => Promise<void>;

  // Tasks
  getTasks: () => Promise<Task[]>;
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Task>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<Task | null>;
  deleteTask: (id: string) => Promise<boolean>;

  // Calendar Events
  getEvents: () => Promise<CalendarEvent[]>;
  createEvent: (event: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => Promise<CalendarEvent>;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => Promise<CalendarEvent | null>;
  deleteEvent: (id: string) => Promise<boolean>;

  // Health Module
  getHealthData: () => Promise<HealthData>;
  createMeal: (meal: Omit<import('../modules/shared/types').Meal, 'id' | 'createdAt' | 'updatedAt'>) => Promise<import('../modules/shared/types').Meal>;
  updateMeal: (id: string, updates: Partial<import('../modules/shared/types').Meal>) => Promise<import('../modules/shared/types').Meal | null>;
  deleteMeal: (id: string) => Promise<boolean>;
  createWeightEntry: (entry: Omit<import('../modules/shared/types').WeightEntry, 'id' | 'createdAt' | 'updatedAt'>) => Promise<import('../modules/shared/types').WeightEntry>;
  updateWeightEntry: (id: string, updates: Partial<import('../modules/shared/types').WeightEntry>) => Promise<import('../modules/shared/types').WeightEntry | null>;
  deleteWeightEntry: (id: string) => Promise<boolean>;
  createSleepEntry: (entry: Omit<import('../modules/shared/types').SleepEntry, 'id' | 'createdAt' | 'updatedAt'>) => Promise<import('../modules/shared/types').SleepEntry>;
  updateSleepEntry: (id: string, updates: Partial<import('../modules/shared/types').SleepEntry>) => Promise<import('../modules/shared/types').SleepEntry | null>;
  deleteSleepEntry: (id: string) => Promise<boolean>;
  createBloodPressureEntry: (entry: Omit<import('../modules/shared/types').BloodPressureEntry, 'id' | 'createdAt' | 'updatedAt'>) => Promise<import('../modules/shared/types').BloodPressureEntry>;
  updateBloodPressureEntry: (id: string, updates: Partial<import('../modules/shared/types').BloodPressureEntry>) => Promise<import('../modules/shared/types').BloodPressureEntry | null>;
  deleteBloodPressureEntry: (id: string) => Promise<boolean>;
  createMedication: (med: Omit<import('../modules/shared/types').Medication, 'id' | 'createdAt' | 'updatedAt'>) => Promise<import('../modules/shared/types').Medication>;
  updateMedication: (id: string, updates: Partial<import('../modules/shared/types').Medication>) => Promise<import('../modules/shared/types').Medication | null>;
  deleteMedication: (id: string) => Promise<boolean>;

  // Bookmarks Module
  getBookmarksData: () => Promise<BookmarksData>;
  createBookmark: (bookmark: Omit<import('../modules/shared/types').Bookmark, 'id' | 'createdAt' | 'updatedAt'>) => Promise<import('../modules/shared/types').Bookmark>;
  updateBookmark: (id: string, updates: Partial<import('../modules/shared/types').Bookmark>) => Promise<import('../modules/shared/types').Bookmark | null>;
  deleteBookmark: (id: string) => Promise<boolean>;
  launchBookmark: (id: string) => Promise<boolean>;

  // VPN Module
  getVPNData: () => Promise<VPNData>;
  importVPNProfile: (configPath: string, name: string) => Promise<import('../modules/shared/types').VPNProfile>;
  deleteVPNProfile: (id: string) => Promise<boolean>;
  connectVPN: (profileId: string) => Promise<boolean>;
  disconnectVPN: () => Promise<boolean>;
  getVPNStatus: () => Promise<import('../modules/shared/types').VPNStatus>;

  // Tools Module
  getToolsData: () => Promise<ToolsData>;
  scanTools: () => Promise<import('../modules/shared/types').DetectedTool[]>;
  openToolDocs: (toolName: import('../modules/shared/types').ToolName) => Promise<void>;

  // Updater Module
  checkForUpdates: () => Promise<import('../modules/shared/types').UpdateInfo | null>;
  downloadUpdate: () => Promise<boolean>;
  installUpdate: () => Promise<void>;

  // Real-Debrid Module
  validateRealDebridKey: (apiKey: string) => Promise<import('../modules/shared/types').RealDebridAccount | null>;

  // Timer Module
  getTimerData: () => Promise<TimerData>;
  startTimer: (name: string, category: string, tags?: string[]) => Promise<ActiveTimer>;
  stopTimer: (notes?: string) => Promise<ActivityTimer | null>;
  getActiveTimer: () => Promise<ActiveTimer | null>;
  getActivities: (startDate?: string, endDate?: string) => Promise<ActivityTimer[]>;
  deleteActivity: (id: string) => Promise<boolean>;
  updateActivity: (id: string, updates: Partial<ActivityTimer>) => Promise<ActivityTimer | null>;

  // News Module
  getNewsData: () => Promise<NewsData>;
  fetchNews: () => Promise<NewsArticle[]>;
  fetchSportsScores: () => Promise<SportsScore[]>;

  // Recommender Module
  getRecommendations: (answers: import('../modules/shared/types').RecommendationAnswer[]) => Promise<MovieTVRecommendation[]>;

  // API Integrations Module
  testApiConnection: (service: ApiServiceName) => Promise<{ success: boolean; error?: string }>;
  getLastFMUserInfo: () => Promise<LastFMUserInfo | null>;
  getLastFMRecentTracks: () => Promise<LastFMRecentTrack[]>;
  getSonarrStatus: () => Promise<SonarrStatus | null>;
  getRadarrStatus: () => Promise<RadarrStatus | null>;

  // Window controls
  minimizeWindow: () => void;
  maximizeWindow: () => void;
  closeWindow: () => void;
  isMaximized: () => Promise<boolean>;
  onWindowStateChange: (callback: (maximized: boolean) => void) => void;

  // Platform
  getPlatform: () => string;
  getAppVersion: () => string;
}

declare global {
  interface Window {
    jarvisAPI: JarvisAPI;
  }
}
