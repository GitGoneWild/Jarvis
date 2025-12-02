export interface JarvisAPI {
  getTheme: () => Promise<string>;
  sendQuery: (message: string) => Promise<string>;
}

declare global {
  interface Window {
    jarvisAPI: JarvisAPI;
  }
}
