import { contextBridge, ipcRenderer } from 'electron';
import type { UserSettings, Task, CalendarEvent } from '../types/global';

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

  // Window controls
  minimizeWindow: (): void => ipcRenderer.send('minimize-window'),
  maximizeWindow: (): void => ipcRenderer.send('maximize-window'),
  closeWindow: (): void => ipcRenderer.send('close-window'),
  isMaximized: (): Promise<boolean> => ipcRenderer.invoke('is-maximized'),
  onWindowStateChange: (callback: (maximized: boolean) => void): void => {
    onWindowStateChange = callback;
  },

  // Platform
  getPlatform: (): string => process.platform,
});

// Listen for maximize/unmaximize events to update UI
ipcRenderer.on('window-maximized', () => {
  if (onWindowStateChange) onWindowStateChange(true);
});

ipcRenderer.on('window-unmaximized', () => {
  if (onWindowStateChange) onWindowStateChange(false);
});
