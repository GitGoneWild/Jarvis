// User Settings
export interface UserSettings {
  theme: 'dark' | 'light' | 'system';
  sidebarExpanded: boolean;
  defaultStartPage: 'home' | 'tasks' | 'calendar' | 'settings';
  notifications: {
    enabled: boolean;
    sounds: boolean;
    taskReminders: boolean;
    eventReminders: boolean;
  };
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

  // Window controls
  minimizeWindow: () => void;
  maximizeWindow: () => void;
  closeWindow: () => void;
  isMaximized: () => Promise<boolean>;
  onWindowStateChange: (callback: (maximized: boolean) => void) => void;

  // Platform
  getPlatform: () => string;
}

declare global {
  interface Window {
    jarvisAPI: JarvisAPI;
  }
}
