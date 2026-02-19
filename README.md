# Toggle Preview Scroll Sync

A minimal VS Code extension that provides commands to toggle scroll synchronization between editor and preview panels for HTML and Markdown files.

## Features

- **Toggle Preview Scroll Sync (to ON)**: Enable scroll synchronization between editor and preview panels
- **Toggle Preview Scroll Sync (to OFF)**: Disable scroll synchronization between editor and preview panels
- **Dynamic Command Display**: Only one command is visible at any given time based on current state
- **Multiple Access Points**: Commands available in Command Palette, editor tab context menu, and editor title bar
- **Workspace-Scoped Settings**: Settings are saved at workspace level, allowing different behavior per project

## Installation

### From VS Code Marketplace

1. Open VS Code
2. Go to Extensions view (Ctrl+Shift+X)
3. Search for "Toggle Preview Scroll Sync"
4. Click "Install" button
5. Reload VS Code when prompted

### From VSIX File

1. Download the `.vsix` file from the [Releases](https://github.com/yourusername/toggle-preview-scroll-sync/releases) page
2. Open VS Code
3. Go to Extensions view (Ctrl+Shift+X)
4. Click the "..." menu in the top-right corner
5. Select "Install from VSIX..."
6. Navigate to and select the downloaded `.vsix` file
7. Click "Install"
8. Reload VS Code when prompted

## Usage

### Command Palette

1. Open Command Palette: `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
2. Type "Toggle Preview Scroll Sync"
3. Select the appropriate command:
   - "Toggle Preview Scroll Sync (to ON)" - if scroll sync is currently disabled
   - "Toggle Preview Scroll Sync (to OFF)" - if scroll sync is currently enabled
4. Press Enter to execute

### Editor Tab Context Menu

1. Right-click on a Markdown or HTML file tab
2. Select "Toggle Preview Scroll Sync (to ON)" or "Toggle Preview Scroll Sync (to OFF)"
3. Click to execute

### Editor Title Bar

1. Open a Markdown or HTML file
2. Look for the sync icon `$(sync)` in the editor title bar (next to "Split Editor Right")
3. Click the icon to toggle scroll sync

## Settings

The extension modifies the following VS Code settings:

- `html.preview.scrollPreviewWithEditor`
- `html.preview.scrollEditorWithPreview`
- `markdown.preview.scrollEditorWithPreview`

Settings are saved at the **workspace level**, meaning each project can have its own scroll sync configuration.

## Development

### Prerequisites

- Node.js (LTS) 18.x or higher
- VS Code 1.80.0 or higher
- `@vscode/vsce` package for packaging

### Install Dependencies

```bash
npm install
```

### Run in Debug Mode

1. Open this project in VS Code
2. Press `F5` to launch the Extension Development Host
3. Test the extension in the new VS Code window

### Package Extension

```bash
npm install -g @vscode/vsce
vsce package
```

This creates a `.vsix` file that can be shared or published to the VS Code Marketplace.

### Publish to VS Code Marketplace

1. Create a publisher account at [VS Code Marketplace](https://marketplace.visualstudio.com/manage)
2. Install the `vsce` CLI tool: `npm install -g @vscode/vsce`
3. Create a `vsce` publisher: `vsce create-publisher your-publisher-name`
4. Login to your publisher: `vsce login your-publisher-name`
5. Publish the extension: `vsce publish`
6. Follow the prompts to provide extension details

## Known Limitations

- **Preview Panel "More Actions" Menu**: Commands cannot be added to the "More Actions" (three dots) menu in built-in preview panels. This is a VS Code API limitation.
- **Checkbox in Context Menu**: Cannot display checkboxes in the editor tab context menu. VS Code only supports checkboxes in specific menu types.
- **Dynamic Command Titles**: Cannot dynamically change a single command's title. The extension uses two separate commands with different IDs to work around this limitation.

## Troubleshooting

### Command Not Visible

If commands are not visible in the expected locations:

1. Ensure you have opened a Markdown or HTML file (for editor title bar and context menu)
2. Check that the extension is activated (look for "Toggle Preview Scroll Sync" in the Extensions view)
3. Try reloading VS Code (`Ctrl+Shift+P` → "Reload Window")
4. Check the VS Code output panel for any errors

### Settings Not Changing

If scroll sync settings are not changing:

1. Check that you're in a workspace (not a single file)
2. Try manually changing the settings in VS Code settings
3. Reload VS Code and try the command again

### Extension Not Working

If the extension is not working:

1. Check VS Code version (requires 1.80.0 or higher)
2. Check the Extensions view for any errors
3. Try reinstalling the extension
4. Check the VS Code Developer Tools console for error messages

## Contributing

Contributions are welcome! Please feel free to:

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request
5. Follow the coding standards in [AGENTS.md](AGENTS.md)

## License

This project is licensed under the MIT License.

## Support

For issues, questions, or suggestions:

1. Open an issue on [GitHub](https://github.com/yourusername/toggle-preview-scroll-sync/issues)
2. Check existing issues before creating a new one
3. Provide detailed information about the problem
4. Include steps to reproduce the issue
5. Specify your VS Code version and operating system

## Documentation

- [Product Requirements Document (PRD)](docs/llm/PRD.md)
- [Development Guidelines](AGENTS.md)

---

**Version**: 1.0.0  
**Last Updated**: 2026-02-19  
