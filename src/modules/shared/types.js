// Shared Types for All Modules
// Default Settings for all modules
export const defaultModuleSettings = {
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
};
//# sourceMappingURL=types.js.map