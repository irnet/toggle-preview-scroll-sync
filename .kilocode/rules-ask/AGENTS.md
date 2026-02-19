# AGENTS.md - Ask Mode

This file provides guidance to agents when answering questions about this repository.

## Language Requirements
- **ALL comments and documentation must be in English only**
- Code, comments and variable names must be in English

## Project Context

### Purpose
This VS Code extension adds a "Toggle Scroll Sync" command to the three-dot menu in HTML/Markdown preview panels. It allows users to quickly toggle scroll synchronization between the editor and preview without going into settings.

### How It Works
1. User opens an HTML or Markdown file and opens the preview panel
2. User clicks the three dots (More Actions) in the preview panel's title bar
3. User selects "Toggle Scroll Sync" from the menu
4. Extension inverts the current scroll sync settings
5. Settings are saved to workspace (affects only current workspace/project)
6. A notification shows the new state

### Settings Modified
The extension toggles three VS Code settings simultaneously:
- `html.preview.scrollPreviewWithEditor` - Sync preview scroll with editor
- `html.preview.scrollEditorWithPreview` - Sync editor scroll with preview
- `markdown.preview.scrollEditorWithPreview` - Sync editor scroll with Markdown preview

### Important Notes
- Extension uses CommonJS (require/module.exports), not ES modules
- No build process - pure JavaScript extension
- Settings are workspace-specific (saved to `.vscode/settings.json`), allowing different settings per project
- Menu only appears in webviews matching `/.*preview.*/` or `/.*html.*/` patterns
- Status message shows inverted logic: "OFF" when sync is enabled (true)
