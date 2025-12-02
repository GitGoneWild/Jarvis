import { app, BrowserWindow, ipcMain, nativeTheme } from 'electron';
import * as path from 'path';
import * as crypto from 'crypto';
import Store from 'electron-store';
import type { StoreSchema, UserSettings, Task, CalendarEvent } from '../types/global';

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
};

// Initialize electron-store
const store = new Store<StoreSchema>({
  defaults: {
    settings: defaultSettings,
    tasks: [],
    events: [],
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
