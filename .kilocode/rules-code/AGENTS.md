# AGENTS.md - Code Mode

This file provides guidance to agents when working with code in this repository.

## Language Requirements
- **ALL comments and documentation must be in English only**
- Code, comments and variable names must be in English

## Extension Development Rules

### Module System
- Use **CommonJS** (`require`/`module.exports`), NOT ES modules (`import`/`export`)
- VS Code extension API requires CommonJS for compatibility

### Configuration Updates
- Use `vscode.ConfigurationTarget.Workspace` for settings that apply only to current workspace (allows different settings per project)
- Use async/await for all `config.update()` calls
- Settings modified: `html.preview.scrollPreviewWithEditor`, `html.preview.scrollEditorWithPreview`, `markdown.preview.scrollEditorWithPreview`

### Command Registration
- Pattern: `vscode.commands.registerCommand(commandId, handler)`
- Always push to `context.subscriptions` for cleanup: `context.subscriptions.push(command)`
- Command IDs should follow `extensionName.action` naming convention

### Menu Contribution
- Use `webview/title` menu location for webview title bar buttons
- `when` clause uses regex: `webviewId =~ /.*pattern.*/`
- Group: `navigation` for standard placement

### Activation
- No `activationEvents` defined = loads on startup
- Consider adding `onCommand:toggleScrollSync.toggle` for lazy activation
