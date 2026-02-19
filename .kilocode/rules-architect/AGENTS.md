# AGENTS.md - Architect Mode

This file provides guidance to agents when designing or planning changes to this repository.

## Language Requirements
- **ALL comments and documentation must be in English only**
- Code, comments and variable names must be in English

## Architecture Overview

### Extension Structure
- **Single-purpose extension**: Toggles scroll sync settings for HTML/Markdown previews
- **Minimal codebase**: Only 2 files (package.json, extension.js)
- **No build step**: Pure JavaScript, CommonJS modules
- **No dependencies**: Uses only built-in VS Code API

### Design Decisions

#### Why CommonJS Instead of ES Modules?
- VS Code extension API requires CommonJS for compatibility
- Extension entry point specified as `"main": "./extension.js"` in package.json
- Cannot use `import`/`export` syntax

#### Global vs Workspace Settings
- Uses `vscode.ConfigurationTarget.Workspace` for all settings
- Decision: User wants toggle to work per workspace/project, allowing different settings for different projects
- Benefit: Each workspace can have its own scroll sync state
- Settings are stored in `.vscode/settings.json` in the workspace root

#### Menu Placement
- Location: `webview/title` (webview title bar menu)
- When clause: `webviewId =~ /.*preview.*/ || webviewId =~ /.*html.*/`
- Rationale: Targets only preview panels, not all webviews
- Limitation: May not work with all HTML preview extensions if they use different webviewId patterns

#### No Activation Events
- Extension loads on VS Code startup (no `activationEvents` defined)
- Trade-off: Slightly slower startup vs instant command availability
- Optimization: Could add `onCommand:toggleScrollSync.toggle` for lazy activation

### Extension Points

#### Adding New Settings to Toggle
To add more settings to the toggle command:
1. Get current value in extension.js
2. Add `config.update()` call with same `newValue`
3. Ensure setting is boolean (toggle logic assumes boolean)

#### Supporting More Preview Types
To support additional preview extensions:
1. Update `when` clause in package.json with additional regex patterns
2. Test with target extension to verify webviewId pattern

#### Adding Keyboard Shortcut
Add to `keybindings.json`:
```json
{
  "key": "ctrl+shift+s",
  "command": "toggleScrollSync.toggle"
}
```
