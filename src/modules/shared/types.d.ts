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
export interface ModuleSettings {
    health: HealthSettings;
    vpn: VPNSettings;
    bookmarks: BookmarkSettings;
    updater: UpdaterSettings;
    realDebrid: RealDebridSettings;
    tools: ToolsSettings;
}
export declare const defaultModuleSettings: ModuleSettings;
//# sourceMappingURL=types.d.ts.map