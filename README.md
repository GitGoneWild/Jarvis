# Jarvis

A cross-platform desktop personal productivity app built with ElectronJS, TypeScript, and modern web technologies. Inspired by GitHub Desktop's clean UI/UX design.

## Features

- **Personal Home Dashboard** - Real-time overview of tasks, events, and upcoming birthdays
- **Tasks / Todo List** - Create, edit, complete, and organize tasks with priorities and due dates
- **Calendar with Events & Reminders** - Full-featured calendar with support for meetings, birthdays, events, and reminders
- **Full-Featured Settings Panel** - Persistent preferences for theme, sidebar state, start page, and notifications
- **Stylish App Bar** - Custom GitHub Desktop-inspired title bar with window controls
- **Sidebar Navigation** - Easy access to Home, Tasks, Calendar, and Settings with collapsible sidebar
- **Dark/Light Themes** - Smooth theme transitions with system theme support
- **Cross-Platform** - Works on Windows, macOS, and Linux

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run the application
npm start
```

### Development

```bash
# Build TypeScript
npm run build

# Lint code
npm run lint

# Format code
npm run format
```

### Building for Production

```bash
# Build for Windows
npm run build:win

# Build for macOS
npm run build:mac

# Build for Linux
npm run build:linux

# Build for all platforms
npm run build:all
```

## Project Structure

```
jarvis/
├── src/
│   ├── main/           # Electron main process
│   │   ├── main.ts     # Main entry point with IPC handlers
│   │   └── preload.ts  # Preload script for IPC bridge
│   ├── renderer/       # Frontend code
│   │   ├── index.html  # Main HTML file with app bar, sidebar, and sections
│   │   ├── styles.css  # CSS styles with theming support
│   │   └── renderer.ts # Frontend TypeScript with all UI logic
│   ├── types/          # TypeScript type definitions
│   │   └── global.d.ts # Shared types for settings, tasks, events
│   └── assets/         # Icons, images, fonts
├── dist/               # Compiled output
├── release/            # Built applications
└── package.json        # Project configuration
```

## Data Persistence

Jarvis uses `electron-store` to persist user data:

- **Settings** - Theme, sidebar state, default start page, notification preferences
- **Tasks** - Full CRUD with title, description, due date, priority, and status
- **Events** - Calendar events with date, time, type, recurrence, and reminders

All data is stored locally in the user's app data directory.

## Technologies

- **Electron** - Cross-platform desktop framework
- **TypeScript** - Type-safe JavaScript
- **HTML/CSS** - Modern styling with CSS variables for theming
- **electron-store** - Simple data persistence

## License

MIT
