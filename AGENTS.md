# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Project Overview
Minimal VS Code extension that adds "Toggle Scroll Sync" command to webview title menus for HTML/Markdown preview panels.

## Development Commands
- **Install dependencies**: `npm install` (if adding dependencies)
- **Package extension**: `npm install -g @vscode/vsce && vsce package` (creates .vsix file)
- **Run in debug mode**: Press `F5` in VS Code with this project open (launches Extension Development Host)
- **Install from VSIX**: Extensions → "..." → "Install from VSIX..." (in main VS Code instance)

## Critical Implementation Details
- Extension uses **CommonJS** (require/module.exports), NOT ES modules
- Settings are saved with `vscode.ConfigurationTarget.Workspace` - affects only current workspace, allowing different settings per project
- Toggle logic inverts value: `newValue = !currentHtml`, then applies same value to all three settings
- Status message shows inverted logic: "OFF" when `newValue` is true (because true = sync enabled = scroll sync ON)
- Menu appears only in webviews matching regex `/.*preview.*/` or `/.*html.*/` (webview title menu)
- No `activationEvents` defined - extension loads on startup (consider adding activation events for performance)

## Extension Settings Modified
1. `html.preview.scrollPreviewWithEditor`
2. `html.preview.scrollEditorWithPreview`
3. `markdown.preview.scrollEditorWithPreview`

## Code Style
- **ALL comments and documentation must be in English only**
- Async/await for VS Code configuration updates
- Command registration pattern: `vscode.commands.registerCommand()`
- Always push commands to `context.subscriptions` for cleanup
