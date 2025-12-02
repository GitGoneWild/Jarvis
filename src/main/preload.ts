import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('jarvisAPI', {
  getTheme: (): Promise<string> => ipcRenderer.invoke('get-theme'),
  sendQuery: (message: string): Promise<string> => ipcRenderer.invoke('jarvis-query', message),
});
