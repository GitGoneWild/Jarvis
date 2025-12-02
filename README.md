# Jarvis

A cross-platform desktop personal assistant built with ElectronJS, TypeScript, and modern web technologies. Inspired by GitHub Desktop's clean UI/UX design.

## Features

- **Sidebar Navigation** - Easy access to Home, Tasks, Notes, and Settings
- **Chat Interface** - Interact with Jarvis through a modern chat UI
- **Dark/Light Themes** - Smooth theme transitions with persisted preferences
- **Settings Panel** - Customize your experience with various options
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
│   │   ├── main.ts     # Main entry point
│   │   └── preload.ts  # Preload script for IPC
│   ├── renderer/       # Frontend code
│   │   ├── index.html  # Main HTML file
│   │   ├── styles.css  # CSS styles
│   │   └── renderer.ts # Frontend TypeScript
│   ├── assets/         # Icons, images, fonts
│   └── utils/          # Helper functions
├── dist/               # Compiled output
├── release/            # Built applications
└── package.json        # Project configuration
```

## Technologies

- **Electron** - Cross-platform desktop framework
- **TypeScript** - Type-safe JavaScript
- **HTML/CSS** - Modern styling with CSS variables for theming

## License

MIT