import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null = null;

// Get the base path for resources
const isDev = !app.isPackaged;
const basePath = isDev ? path.join(__dirname, '../../') : path.join(__dirname, '../');

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    frame: true,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    backgroundColor: '#1e1e2e',
  });

  // Load index.html from src/renderer
  mainWindow.loadFile(path.join(basePath, 'src/renderer/index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
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

// IPC handlers for theme and settings
ipcMain.handle('get-theme', () => {
  return 'dark';
});

ipcMain.handle('jarvis-query', async (_event, message: string) => {
  // Basic Jarvis AI stub - echoes messages with some processing
  const responses: Record<string, string> = {
    hello: "Hello! I'm Jarvis, your personal assistant. How can I help you today?",
    help: 'I can help you with various tasks. Try asking me about the weather, your tasks, or just have a chat!',
    time: `The current time is ${new Date().toLocaleTimeString()}.`,
    date: `Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`,
  };

  const lowerMessage = message.toLowerCase().trim();

  for (const [key, response] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }

  return `I received your message: "${message}". I'm still learning, but I'm here to assist you!`;
});
