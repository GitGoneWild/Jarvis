// Shared Types for All Modules

// ========================================
// Timer / Activity Tracking Module Types
// ========================================

export interface ActivityTimer {
  id: string;
  name: string;
  category: string;
  startTime: string;
  endTime: string | null;
  duration: number; // in seconds
  tags: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActiveTimer {
  id: string;
  name: string;
  category: string;
  startTime: string;
  tags: string[];
}

export interface TimerSettings {
  enabled: boolean;
  defaultCategory: string;
  categories: string[];
  autoStopAfterHours: number;
  showInCalendar: boolean;
}

export interface TimerData {
  activities: ActivityTimer[];
  activeTimer: ActiveTimer | null;
}

// ========================================
// News Dashboard Module Types
// ========================================

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  imageUrl: string | null;
  publishedAt: string;
  category: 'general' | 'sports' | 'technology' | 'business' | 'entertainment';
}

export interface SportsScore {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: 'scheduled' | 'live' | 'finished';
  competition: string;
  startTime: string;
}

export interface NewsSettings {
  enabled: boolean;
  refreshIntervalMinutes: number;
  showSports: boolean;
  preferredSources: string[];
}

export interface NewsData {
  articles: NewsArticle[];
  sports: SportsScore[];
  lastUpdated: string | null;
}

// ========================================
// Movie/TV Recommender Module Types
// ========================================

export interface RecommendationQuestion {
  id: string;
  question: string;
  options: string[];
}

export interface RecommendationAnswer {
  questionId: string;
  answer: string;
}

export interface MovieTVRecommendation {
  id: string;
  title: string;
  type: 'movie' | 'tv';
  year: number;
  rating: number;
  genre: string[];
  description: string;
  posterUrl: string | null;
  backdropUrl: string | null;
}

export interface RecommenderSettings {
  enabled: boolean;
  includeMovies: boolean;
  includeTVShows: boolean;
  preferredLanguage: string;
  adultContent: boolean;
}

// ========================================
// API Service Integrations Module Types
// ========================================

export type ApiServiceName = 'lastfm' | 'sonarr' | 'radarr' | 'ollama';

export interface ApiServiceConfig {
  name: ApiServiceName;
  displayName: string;
  baseUrl: string;
  apiKey: string;
  username?: string;
  status: 'not_configured' | 'connected' | 'error';
  lastTested: string | null;
  errorMessage: string | null;
}

export interface OllamaStatus {
  version: string;
  models: string[];
  isRunning: boolean;
}

export interface LastFMUserInfo {
  username: string;
  realName: string;
  playCount: number;
  registeredAt: string;
  imageUrl: string | null;
}

export interface LastFMRecentTrack {
  name: string;
  artist: string;
  album: string;
  imageUrl: string | null;
  playedAt: string | null;
  nowPlaying: boolean;
}

export interface SonarrStatus {
  version: string;
  seriesCount: number;
  episodeCount: number;
  queueCount: number;
}

export interface RadarrStatus {
  version: string;
  movieCount: number;
  queueCount: number;
}

export interface ApiIntegrationsSettings {
  lastfm: Omit<ApiServiceConfig, 'name' | 'displayName'> & { username: string };
  sonarr: Omit<ApiServiceConfig, 'name' | 'displayName'>;
  radarr: Omit<ApiServiceConfig, 'name' | 'displayName'>;
  ollama: Omit<ApiServiceConfig, 'name' | 'displayName' | 'apiKey'>;
}

// ========================================
// Playground Module Types
// ========================================

export interface FunFact {
  id: string;
  fact: string;
  category: string;
  source: string | null;
}

export interface OnThisDay {
  id: string;
  year: number;
  event: string;
  category: 'historical' | 'birth' | 'death' | 'holiday';
}

export interface PlaygroundData {
  funFacts: FunFact[];
  onThisDay: OnThisDay[];
  lastUpdated: string | null;
}

export interface PlaygroundSettings {
  enabled: boolean;
  showFunFacts: boolean;
  showOnThisDay: boolean;
  showRecommender: boolean;
}

// ========================================
// MP3 Module Types
// ========================================

export interface MP3Track {
  id: string;
  filePath: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  genre: string | null;
  year: number | null;
  trackNumber: number | null;
  coverArt: string | null; // base64 encoded image
  addedAt: string;
  lastPlayedAt: string | null;
  playCount: number;
}

export interface MP3Folder {
  id: string;
  path: string;
  name: string;
  trackCount: number;
  addedAt: string;
}

export interface MP3PlaybackState {
  currentTrackId: string | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  shuffle: boolean;
  repeat: 'none' | 'one' | 'all';
}

export interface MP3Data {
  folders: MP3Folder[];
  tracks: MP3Track[];
  playHistory: Array<{ trackId: string; playedAt: string }>;
  playbackState: MP3PlaybackState;
}

export interface MP3Settings {
  enabled: boolean;
  defaultVolume: number;
  continueListening: boolean;
  showHistory: boolean;
}

// ========================================
// Health Module Types
// ========================================

export interface Meal {
  id: string;
  date: string;
  time: string;
  items: string[];
  calories: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  unit: 'kg' | 'lbs';
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface SleepEntry {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  quality: 'poor' | 'fair' | 'good' | 'excellent';
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface BloodPressureEntry {
  id: string;
  date: string;
  time: string;
  systolic: number;
  diastolic: number;
  pulse: number | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: 'daily' | 'twice-daily' | 'three-times-daily' | 'weekly' | 'as-needed';
  times: string[];
  startDate: string;
  endDate: string | null;
  active: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface MedicationReminder {
  id: string;
  medicationId: string;
  scheduledTime: string;
  status: 'pending' | 'taken' | 'skipped' | 'snoozed';
  takenAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface HealthData {
  meals: Meal[];
  weightEntries: WeightEntry[];
  sleepEntries: SleepEntry[];
  bloodPressureEntries: BloodPressureEntry[];
  medications: Medication[];
  medicationReminders: MedicationReminder[];
}

export interface HealthSettings {
  enabled: boolean;
  weightUnit: 'kg' | 'lbs';
  heightUnit: 'cm' | 'in';
  remindersEnabled: boolean;
  defaultSnoozeMinutes: number;
}

// ========================================
// VPN Module Types
// ========================================

export interface VPNProfile {
  id: string;
  name: string;
  configPath: string;
  isDefault: boolean;
  lastUsed: string | null;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface VPNStatus {
  connected: boolean;
  activeProfileId: string | null;
  externalIP: string | null;
  dnsServers: string[];
  uploadSpeed: number;
  downloadSpeed: number;
  connectedSince: string | null;
}

export interface VPNSettings {
  enabled: boolean;
  autoConnectOnStart: boolean;
  defaultProfileId: string | null;
  showStatusInHeader: boolean;
}

export interface VPNData {
  profiles: VPNProfile[];
  status: VPNStatus;
}

// ========================================
// Bookmarks Module Types
// ========================================

export type BookmarkType = 'url' | 'app' | 'game' | 'folder' | 'file';

export interface Bookmark {
  id: string;
  label: string;
  type: BookmarkType;
  target: string;
  icon: string | null;
  category: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface BookmarkSettings {
  enabled: boolean;
  showOnHome: boolean;
  defaultCategory: string;
  sortBy: 'label' | 'type' | 'order' | 'createdAt';
}

export interface BookmarksData {
  bookmarks: Bookmark[];
  categories: string[];
}

// ========================================
// Updater Module Types
// ========================================

export interface UpdateInfo {
  currentVersion: string;
  latestVersion: string;
  isOutdated: boolean;
  releaseNotes: string;
  releaseUrl: string;
  downloadUrl: string;
  publishedAt: string;
}

export interface UpdaterSettings {
  checkOnStartup: boolean;
  autoDownload: boolean;
  notifyOnly: boolean;
  lastChecked: string | null;
  ignoredVersion: string | null;
}

// ========================================
// Real-Debrid Module Types
// ========================================

export interface RealDebridAccount {
  username: string;
  email: string;
  premium: boolean;
  expirationDate: string | null;
}

export interface RealDebridSettings {
  enabled: boolean;
  apiKey: string;
  connected: boolean;
  lastValidated: string | null;
}

// ========================================
// Tools Module Types
// ========================================

export type ToolName = 'terraform' | 'docker' | 'ansible' | 'python' | 'node' | 'go' | 'kubectl' | 'aws-cli';

export interface DetectedTool {
  name: ToolName;
  displayName: string;
  installed: boolean;
  version: string | null;
  path: string | null;
  docsUrl: string;
  lastChecked: string;
}

export interface ToolsSettings {
  enabled: boolean;
  showInNav: boolean;
  toolsToCheck: ToolName[];
}

export interface ToolsData {
  detectedTools: DetectedTool[];
  lastFullScan: string | null;
}

// ========================================
// Extended Global Settings
// ========================================

export interface ModuleSettings {
  health: HealthSettings;
  vpn: VPNSettings;
  bookmarks: BookmarkSettings;
  updater: UpdaterSettings;
  realDebrid: RealDebridSettings;
  tools: ToolsSettings;
  timer: TimerSettings;
  news: NewsSettings;
  recommender: RecommenderSettings;
  apiIntegrations: ApiIntegrationsSettings;
  playground: PlaygroundSettings;
  mp3: MP3Settings;
}

// Default Settings for all modules
export const defaultModuleSettings: ModuleSettings = {
  health: {
    enabled: true,
    weightUnit: 'kg',
    heightUnit: 'cm',
    remindersEnabled: true,
    defaultSnoozeMinutes: 10,
  },
  vpn: {
    enabled: true,
    autoConnectOnStart: false,
    defaultProfileId: null,
    showStatusInHeader: true,
  },
  bookmarks: {
    enabled: true,
    showOnHome: true,
    defaultCategory: 'General',
    sortBy: 'order',
  },
  updater: {
    checkOnStartup: true,
    autoDownload: false,
    notifyOnly: true,
    lastChecked: null,
    ignoredVersion: null,
  },
  realDebrid: {
    enabled: false,
    apiKey: '',
    connected: false,
    lastValidated: null,
  },
  tools: {
    enabled: true,
    showInNav: false,
    toolsToCheck: ['terraform', 'docker', 'ansible', 'python', 'node', 'go'],
  },
  timer: {
    enabled: true,
    defaultCategory: 'Work',
    categories: ['Work', 'Exercise', 'Learning', 'Personal', 'Other'],
    autoStopAfterHours: 8,
    showInCalendar: true,
  },
  news: {
    enabled: true,
    refreshIntervalMinutes: 15,
    showSports: true,
    preferredSources: [],
  },
  recommender: {
    enabled: true,
    includeMovies: true,
    includeTVShows: true,
    preferredLanguage: 'en',
    adultContent: false,
  },
  apiIntegrations: {
    lastfm: {
      baseUrl: 'https://ws.audioscrobbler.com/2.0/',
      apiKey: '',
      username: '',
      status: 'not_configured',
      lastTested: null,
      errorMessage: null,
    },
    sonarr: {
      baseUrl: '',
      apiKey: '',
      status: 'not_configured',
      lastTested: null,
      errorMessage: null,
    },
    radarr: {
      baseUrl: '',
      apiKey: '',
      status: 'not_configured',
      lastTested: null,
      errorMessage: null,
    },
    ollama: {
      baseUrl: 'http://localhost:11434',
      status: 'not_configured',
      lastTested: null,
      errorMessage: null,
    },
  },
  playground: {
    enabled: true,
    showFunFacts: true,
    showOnThisDay: true,
    showRecommender: true,
  },
  mp3: {
    enabled: true,
    defaultVolume: 0.7,
    continueListening: true,
    showHistory: true,
  },
};
