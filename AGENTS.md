# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Project Overview
Minimal VS Code extension that adds "Toggle Scroll Sync" command to toggle scroll synchronization between editor and preview panels for HTML/Markdown files.

## Development Commands
- **Install dependencies**: `npm install` (if adding dependencies)
- **Package extension**: `npm install -g @vscode/vsce && vsce package` (creates .vsix file)
- **Run in debug mode**: Press `F5` in VS Code with this project open (launches Extension Development Host)
- **Install from VSIX**: Extensions → "..." → "Install from VSIX..." (in main VS Code instance)

## Critical Implementation Details
- Extension uses **CommonJS** (require/module.exports), NOT ES modules
- Settings are saved with `vscode.ConfigurationTarget.Workspace` - affects only current workspace, allowing different settings per project
- Toggle logic inverts value: `newValue = !currentHtml`, then applies same value to all three settings
- Status message: "ON" when `newValue` is true (sync enabled), "OFF" when `newValue` is false (sync disabled)
- Command available in Command Palette: `Ctrl+Shift+P` → "Toggle Scroll Sync"
- **KNOWN LIMITATION**: Menu item does NOT appear in webview "More Actions" (three dots) menu - this is a VS Code API limitation with certain webview implementations
- Activation event: `onStartupFinished` - extension loads after VS Code startup
- Configuration access: `vscode.workspace.getConfiguration(null)` to avoid resource scoped warnings

## Extension Settings Modified
1. `html.preview.scrollPreviewWithEditor`
2. `html.preview.scrollEditorWithPreview`
3. `markdown.preview.scrollEditorWithPreview`

## Code Style
- **ALL comments and documentation must be in English only**
- Async/await for VS Code configuration updates
- Command registration pattern: `vscode.commands.registerCommand()`
- Always push commands to `context.subscriptions` for cleanup

## Known Issues
- Menu item does not appear in webview "More Actions" menu for some preview extensions (e.g., george-alisson.html-preview-vscode)
- Command works reliably from Command Palette (`Ctrl+Shift+P`)
- This is due to VS Code API limitations with third-party webview implementations
