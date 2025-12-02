# Contributing to Jarvis

Thank you for your interest in contributing to Jarvis! This document provides guidelines and steps for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+
- Git

### Development Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Jarvis.git
   cd Jarvis
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Build the application**:
   ```bash
   npm run build
   ```

5. **Start the application**:
   ```bash
   npm start
   ```

## Development Workflow

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Build and start the Electron app |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run lint` | Run ESLint to check code style |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run clean` | Remove build artifacts |

### Project Structure

```
Jarvis/
├── src/
│   ├── main/           # Electron main process
│   │   ├── main.ts     # Main entry point
│   │   └── preload.ts  # Preload script for IPC
│   ├── renderer/       # Renderer process (UI)
│   │   ├── index.html  # Main HTML file
│   │   ├── renderer.ts # Renderer logic
│   │   └── styles.css  # Application styles
│   ├── modules/        # Feature modules
│   │   └── shared/     # Shared types and utilities
│   └── types/          # TypeScript type definitions
├── .github/            # GitHub workflows and templates
├── dist/               # Compiled output (git-ignored)
└── release/            # Build artifacts (git-ignored)
```

## Making Changes

### Branch Naming

Use descriptive branch names:
- `feature/add-new-feature`
- `fix/issue-description`
- `docs/update-readme`
- `refactor/cleanup-code`

### Commit Messages

Follow conventional commit format:
- `feat: add new timer feature`
- `fix: resolve calendar date parsing issue`
- `docs: update installation instructions`
- `refactor: simplify task sorting logic`
- `style: format code with prettier`
- `chore: update dependencies`

### Code Style

- **TypeScript**: Follow the existing code patterns
- **ESLint**: All code must pass linting (`npm run lint`)
- **Prettier**: Code should be formatted (`npm run format`)
- **Comments**: Add comments for complex logic
- **Types**: Use explicit types; avoid `any`

### Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** with clear, atomic commits
3. **Run quality checks**:
   ```bash
   npm run lint
   npm run typecheck
   npm run build
   ```
4. **Push your branch** and open a Pull Request
5. **Fill out the PR template** with details about your changes
6. **Address review feedback** promptly

### PR Checklist

Before submitting:
- [ ] Code compiles without errors
- [ ] Linting passes
- [ ] No new TypeScript errors
- [ ] Changes are tested manually
- [ ] Documentation is updated if needed
- [ ] Commit messages are clear

## Reporting Issues

### Bug Reports

Include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- OS and version
- Screenshots if applicable

### Feature Requests

Include:
- Clear description of the feature
- Use case / motivation
- Proposed implementation (optional)

## Architecture Guidelines

### Electron Security

- Never enable `nodeIntegration` in renderer
- Use `contextBridge` for IPC communication
- Sanitize all user inputs before rendering
- Follow [Electron Security Best Practices](https://www.electronjs.org/docs/latest/tutorial/security)

### Module Design

- Keep modules loosely coupled
- Use shared types from `src/modules/shared/types.ts`
- Follow single responsibility principle
- Handle errors gracefully with user feedback

## Questions?

Feel free to open a Discussion or reach out to the maintainers if you have questions about contributing.

Thank you for contributing to Jarvis! 🎉
