# AGENTS.md - Debug Mode

This file provides guidance to agents when debugging code in this repository.

## Language Requirements
- **ALL comments and documentation must be in English only**
- Code, comments and variable names must be in English

## Debugging VS Code Extensions

### Running in Debug Mode
- Press `F5` in VS Code with this project open
- Launches "Extension Development Host" - a separate VS Code instance with the extension loaded
- Test the extension in the new window, not your main VS Code instance

### Extension Host Output
- Extension logs appear in "Extension Host" output channel, NOT Debug Console
- View: View → Output → Select "Extension Host" from dropdown

### Webview Debugging
- Webview dev tools accessed via Command Palette: "Developer: Open Webview Developer Tools"
- Not F12 like browser dev tools

### Configuration Testing
- Settings are saved to workspace (`vscode.ConfigurationTarget.Workspace`)
- Changes apply only to current workspace, allowing different settings per project
- Settings are stored in `.vscode/settings.json` in the workspace root
- Manually verify settings in `.vscode/settings.json` after toggling

### Common Issues
- Menu not appearing: Check `webviewId` regex in `package.json` - may need adjustment for specific preview extensions
- Settings not changing: Ensure async/await is used for `config.update()` calls
