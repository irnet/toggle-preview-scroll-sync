# Product Requirements Document (PRD)
# Toggle Preview Scroll Sync VS Code Extension

## 1. Overview

### 1.1 Product Name
Toggle Preview Scroll Sync

### 1.2 Version
1.0.0

### 1.3 Description
A minimal VS Code extension that provides commands to toggle scroll synchronization between editor and preview panels for HTML and Markdown files. The extension allows users to quickly enable or disable scroll sync functionality across different preview types.

## 2. Problem Statement

VS Code has built-in scroll synchronization between editor and preview panels for HTML and Markdown files. However, users may need to quickly toggle this functionality on or off depending on their workflow. The default VS Code settings require navigating through multiple menus to change these settings, which is inefficient for frequent toggling.

## 3. Solution

Provide a VS Code extension with two distinct commands that allow users to enable or disable scroll synchronization with a single action. The commands are available in multiple locations for easy access:

- Command Palette (Ctrl+Shift+P)
- Editor tab context menu (right-click on file tab)
- Editor title bar (for Markdown and HTML files)

## 4. Functional Requirements

### 4.1 Core Functionality

#### FR-1: Enable Scroll Sync
- **Description**: Command to enable scroll synchronization between editor and preview panels
- **Input**: User executes the "Toggle Preview Scroll Sync (to ON)" command
- **Output**: 
  - Sets `html.preview.scrollPreviewWithEditor` to `true`
  - Sets `html.preview.scrollEditorWithPreview` to `true`
  - Sets `markdown.preview.scrollEditorWithPreview` to `true`
  - Displays information message: "Scroll Sync is now ON"
- **Priority**: High

#### FR-2: Disable Scroll Sync
- **Description**: Command to disable scroll synchronization between editor and preview panels
- **Input**: User executes the "Toggle Preview Scroll Sync (to OFF)" command
- **Output**:
  - Sets `html.preview.scrollPreviewWithEditor` to `false`
  - Sets `html.preview.scrollEditorWithPreview` to `false`
  - Sets `markdown.preview.scrollEditorWithPreview` to `false`
  - Displays information message: "Scroll Sync is now OFF"
- **Priority**: High

### 4.2 Command Visibility

#### FR-3: Dynamic Command Display
- **Description**: Only one command should be visible at any given time based on current state
- **Behavior**:
  - When scroll sync is enabled (ON): Show "Toggle Preview Scroll Sync (to OFF)"
  - When scroll sync is disabled (OFF): Show "Toggle Preview Scroll Sync (to ON)"
- **Implementation**: Use VS Code context key `toggleScrollSync.enabled` to control visibility
- **Priority**: High

#### FR-4: Command Palette Integration
- **Description**: Commands should be available in VS Code Command Palette
- **Behavior**:
  - Both commands registered in Command Palette
  - Visibility controlled by `toggleScrollSync.enabled` context
  - Only appropriate command shown based on current state
- **Priority**: High

#### FR-5: Context Menu Integration
- **Description**: Commands should be available in editor tab context menu
- **Behavior**:
  - Right-click on file tab shows context menu
  - Only appropriate command shown based on current state
  - Only visible for Markdown and HTML files (`resourceLangId == markdown || resourceLangId == html`)
- **Priority**: High

#### FR-6: Editor Title Bar Integration
- **Description**: Commands should be available in editor title bar
- **Behavior**:
  - Button/icon appears in editor title bar for Markdown and HTML files
  - Only appropriate button shown based on current state
  - Uses sync icon `$(sync)` for visual clarity
- **Priority**: Medium

### 4.3 Configuration

#### FR-7: Workspace-Scoped Settings
- **Description**: Settings should be saved at workspace level
- **Behavior**:
  - Use `vscode.ConfigurationTarget.Workspace`
  - Allows different settings per project
  - Does not affect global VS Code settings
- **Priority**: High

#### FR-8: State Initialization
- **Description**: Extension should initialize command visibility on startup
- **Behavior**:
  - Read current `html.preview.scrollPreviewWithEditor` setting
  - Set `toggleScrollSync.enabled` context to current value
  - Default to `true` if setting not explicitly set
- **Priority**: High

## 5. Non-Functional Requirements

### NFR-1: Performance
- Extension activation should complete within 100ms
- Command execution should complete within 50ms
- No impact on VS Code startup time

### NFR-2: Compatibility
- VS Code version: ^1.80.0 or higher
- Works with both Markdown and HTML files
- Compatible with all operating systems (Windows, macOS, Linux)

### NFR-3: Reliability
- Extension should handle configuration update errors gracefully
- Display error messages if settings cannot be updated
- No extension crashes under normal usage

### NFR-4: Maintainability
- Code should follow CommonJS module system (require/module.exports)
- Clear code comments in English
- Minimal dependencies for easy maintenance

## 6. Technical Specifications

### 6.1 Extension Structure

```
toggle-preview-scroll-sync/
├── package.json           # Extension manifest
├── extension.js          # Main extension code
├── AGENTS.md            # Development guidelines
└── docs/
    └── llm/
        ├── PRD.md        # This document
        └── source-llm-chat.md
```

### 6.2 Package.json Configuration

```json
{
  "name": "toggle-preview-scroll-sync",
  "displayName": "Toggle Preview Scroll Sync",
  "version": "1.0.0",
  "engines": {
    "vscode": "^1.80.0"
  },
  "activationEvents": ["onStartupFinished"],
  "main": "./extension.js",
  "contributes": {
    "commands": [
      {
        "command": "toggleScrollSync.enable",
        "title": "Toggle Preview Scroll Sync (to ON)",
        "category": "Preview",
        "icon": "$(sync)"
      },
      {
        "command": "toggleScrollSync.disable",
        "title": "Toggle Preview Scroll Sync (to OFF)",
        "category": "Preview",
        "icon": "$(sync)"
      }
    ],
    "menus": {
      "commandPalette": [...],
      "editor/title": [...],
      "editor/title/context": [...]
    }
  }
}
```

### 6.3 Extension.js Implementation

- **Module System**: CommonJS (require/module.exports) - NOT ES modules
- **Activation Event**: `onStartupFinished` - extension loads after VS Code startup
- **Configuration Access**: `vscode.workspace.getConfiguration(null)` to avoid resource scoped warnings
- **Context Management**: `vscode.commands.executeCommand('setContext', 'toggleScrollSync.enabled', value)`
- **Separate Handlers**: Each command (enable/disable) has its own handler function
- **No Toggle Logic**: Commands do NOT invert current state; they set specific values (true/false)

### 6.4 Settings Modified

1. `html.preview.scrollPreviewWithEditor`
2. `html.preview.scrollEditorWithPreview`
3. `markdown.preview.scrollEditorWithPreview`

### 6.5 Architectural Decisions

#### AD-1: Separate Command Handlers
**Decision**: Use separate handler functions for enable and disable commands instead of a single toggle handler.

**Rationale**:
- Each command performs a specific action (enable or disable)
- No ambiguity about what the command will do
- Clearer code structure and easier maintenance
- User sees exactly what action will be performed

**Alternatives Considered**:
- Single toggle handler that inverts current state - REJECTED due to ambiguity

#### AD-2: Two Commands with Different IDs
**Decision**: Use two separate commands with different IDs (`toggleScrollSync.enable` and `toggleScrollSync.disable`).

**Rationale**:
- VS Code does not support dynamic command titles for a single command
- Allows different titles based on action ("to ON" vs "to OFF")
- Context-based visibility ensures only one command is shown at a time
- Clear user experience

**Alternatives Considered**:
- Single command with dynamic title - NOT SUPPORTED by VS Code API
- Single command with static title - REJECTED due to poor UX

#### AD-3: Workspace-Scoped Configuration
**Decision**: Save settings at workspace level using `vscode.ConfigurationTarget.Workspace`.

**Rationale**:
- Allows different settings per project
- Does not affect global VS Code settings
- Users can have different scroll sync behavior for different workspaces
- More flexible for multi-project workflows

**Alternatives Considered**:
- Global settings - REJECTED due to lack of project-specific control
- Resource-scoped settings - REJECTED due to VS Code warnings

#### AD-4: Context-Based Command Visibility
**Decision**: Use VS Code context key `toggleScrollSync.enabled` to control command visibility.

**Rationale**:
- Only one command visible at any given time
- Reduces user confusion
- Provides clear indication of current state through command text
- Leverages VS Code's built-in context system

**Alternatives Considered**:
- Show both commands simultaneously - REJECTED due to confusion
- No visibility control - REJECTED due to poor UX

#### AD-5: CommonJS Module System
**Decision**: Use CommonJS (require/module.exports) instead of ES modules.

**Rationale**:
- VS Code extension API requires CommonJS for compatibility
- Ensures proper extension loading
- Follows VS Code extension development best practices
- Maintains compatibility with older VS Code versions

**Alternatives Considered**:
- ES modules (import/export) - NOT SUPPORTED by VS Code extension loader

#### AD-6: Minimal Dependencies
**Decision**: Use no external dependencies beyond VS Code API.

**Rationale**:
- Reduces extension size
- Simplifies installation and packaging
- Reduces potential security vulnerabilities
- Easier maintenance and updates

**Alternatives Considered**:
- External utility libraries - NOT NEEDED for this functionality

### 6.6 Architectural Decisions NOT Chosen

#### AD-NOT-1: Single Toggle Command
**Decision**: NOT IMPLEMENTED

**Reason**: Single toggle command that inverts current state creates ambiguity. Users cannot tell what the command will do without knowing current state.

**Impact**: Would require users to remember current state or check settings before executing command.

#### AD-NOT-2: Status Bar Integration
**Decision**: NOT IMPLEMENTED

**Reason**: User preference to avoid status bar due to visual clutter. Status bar is already overloaded with information.

**Impact**: No persistent visual indicator of scroll sync state. Users must rely on command text or information messages.

#### AD-NOT-3: Keyboard Shortcuts
**Decision**: NOT IMPLEMENTED

**Reason**: Not specified in initial requirements. Keyboard shortcuts can be added by users through VS Code settings if needed.

**Impact**: Users must use Command Palette or context menu for quick access. No default keyboard shortcut.

#### AD-NOT-4: Per-File-Type Settings
**Decision**: NOT IMPLEMENTED

**Reason**: User explicitly requested that toggle should work the same for both Markdown and HTML files.

**Impact**: Single toggle affects both file types. Cannot enable sync for one type while disabling for another.

#### AD-NOT-5: Preview Panel Menu Integration
**Decision**: NOT IMPLEMENTED

**Reason**: VS Code API does not support adding commands to built-in preview panel "More Actions" menu.

**Impact**: Commands not accessible from preview panel interface. Users must use Command Palette or editor context menu.

#### AD-NOT-6: Checkbox in Context Menu
**Decision**: NOT IMPLEMENTED

**Reason**: VS Code API does not support checkboxes in `editor/title/context` menu.

**Impact**: No visual checkbox indicator in context menu. Users rely on command text for state indication.

## 7. User Stories

### US-1: Quick Toggle During Development
**As a developer**, I want to quickly toggle scroll sync on and off while editing Markdown files, so that I can control when the preview follows my cursor.

**Acceptance Criteria**:
- Command available in Command Palette
- Command available in context menu
- State changes immediately upon command execution
- Information message confirms the new state

### US-2: Different Settings per Project
**As a developer**, I want scroll sync settings to be workspace-specific, so that I can have different behaviors for different projects.

**Acceptance Criteria**:
- Settings saved at workspace level
- Each workspace maintains its own scroll sync state
- Global VS Code settings not affected

### US-3: Clear State Indication
**As a user**, I want to see what action will be performed before executing it, so that I don't accidentally toggle the wrong way.

**Acceptance Criteria**:
- Command text indicates what will happen ("to ON" or "to OFF")
- Only appropriate command shown based on current state
- No ambiguity about command behavior

## 8. Limitations and Known Issues

### 8.1 Limitations

1. **Preview Panel "More Actions" Menu**: Cannot add commands to the "More Actions" (three dots) menu in built-in preview panels. This is a VS Code API limitation.
   - **Impact**: Commands not accessible from preview panel interface
   - **Root Cause**: Built-in preview panels use internal rendering mechanism that doesn't support extension menu contributions
   - **Affected**: Both Markdown and HTML preview panels
   - **Workaround**: Use Command Palette or editor context menu

2. **Checkbox in Context Menu**: Cannot display checkboxes in `editor/title/context` menu. VS Code only supports checkboxes in specific menu types (Command Palette, view/title, view/item/context).
   - **Impact**: No visual checkbox indicator in context menu
   - **Root Cause**: VS Code API limitation - checkboxes not supported in editor/title/context
   - **Workaround**: Command text indicates current state ("to ON" or "to OFF")

3. **Dynamic Command Titles**: Cannot dynamically change a single command's title. Must use separate commands with different IDs and visibility conditions.
   - **Impact**: Requires maintaining two separate commands with different IDs
   - **Root Cause**: VS Code API does not support dynamic title updates for commands
   - **Workaround**: Use context-based visibility to show appropriate command

4. **Editor Title Bar Button Visibility**: Button in editor title bar may not appear in all VS Code themes or configurations.
   - **Impact**: Users may not see the button in editor title bar
   - **Root Cause**: Theme-specific rendering or VS Code configuration
   - **Workaround**: Use Command Palette or context menu as primary access methods

5. **No Persistent Visual Indicator**: No status bar item or other persistent indicator showing current scroll sync state.
   - **Impact**: Users must execute command or check settings to know current state
   - **Root Cause**: Design decision to avoid status bar clutter
   - **Workaround**: Rely on command text in menus or information messages

6. **Single Toggle for All File Types**: Cannot independently control scroll sync for Markdown and HTML files.
   - **Impact**: Toggle affects both file types simultaneously
   - **Root Cause**: User requirement for unified behavior
   - **Workaround**: None - this is intentional design

### 8.2 Known Issues

1. **Initial State Detection**: Extension reads `html.preview.scrollPreviewWithEditor` setting to determine initial state. If this setting was never explicitly set, defaults to `true`.
   - **Impact**: May not match user's actual scroll sync behavior if they changed other settings manually
   - **Root Cause**: Only one setting is checked for initial state
   - **Workaround**: Execute command once to synchronize all settings

2. **Context Update Timing**: Context `toggleScrollSync.enabled` is updated asynchronously after configuration changes. There may be a brief moment where command visibility doesn't match actual state.
   - **Impact**: Minor delay in command visibility update
   - **Root Cause**: Async nature of VS Code configuration updates
   - **Workaround**: Usually not noticeable in practice

### 8.3 Workarounds

- **Primary Access**: Use Command Palette (Ctrl+Shift+P) for reliable access to commands
- **Quick Access**: Use editor tab context menu (right-click) for quick access
- **Visual Access**: Use editor title bar button when working with Markdown/HTML files
- **State Verification**: Execute command and observe information message to confirm state change
- **Settings Check**: Manually check VS Code settings if uncertain about current state

## 9. Future Enhancements

### FE-1: Keyboard Shortcuts
**Description**: Add default keyboard shortcut for toggling scroll sync and allow users to customize shortcuts.

**Benefits**:
- Faster access than Command Palette
- More efficient workflow for power users
- Consistent with other VS Code extensions

**Implementation Considerations**:
- Add `keybindings` section to package.json
- Provide default shortcut (e.g., Ctrl+Shift+S)
- Allow user customization through VS Code settings
- Conflict detection with existing shortcuts

**Priority**: Medium
**Estimated Effort**: Low

### FE-2: Status Bar Indicator
**Description**: Add status bar item showing current scroll sync state with click-to-toggle functionality.

**Benefits**:
- Persistent visual indicator of current state
- Quick access from anywhere in VS Code
- No need to open menus or Command Palette

**Implementation Considerations**:
- Use `vscode.window.createStatusBarItem()`
- Update text/icon based on `toggleScrollSync.enabled` context
- Add click handler to toggle state
- Position in status bar (right side recommended)

**Priority**: Low (user preference to avoid status bar clutter)
**Estimated Effort**: Low

### FE-3: Per-File-Type Settings
**Description**: Allow independent settings for Markdown and HTML files so users can enable sync for one type but not the other.

**Benefits**:
- More granular control over scroll sync behavior
- Different workflows for different file types
- Flexibility for users who work with both Markdown and HTML

**Implementation Considerations**:
- Add separate commands for Markdown and HTML
- Separate context keys for each file type
- More complex menu configuration
- Potential user confusion

**Priority**: Low (user explicitly requested unified behavior)
**Estimated Effort**: Medium

### FE-4: Visual Feedback in Preview
**Description**: Show sync state indicator in preview panel and allow toggling directly from preview panel (if VS Code API allows).

**Benefits**:
- Direct access from preview panel
- Clear visual indication of sync state
- More intuitive user experience

**Implementation Considerations**:
- Currently NOT SUPPORTED by VS Code API for built-in preview panels
- May require custom webview implementation
- Significant technical complexity
- May not work with third-party preview extensions

**Priority**: Low (VS Code API limitation)
**Estimated Effort**: High (if API support added)

### FE-5: Telemetry and Analytics
**Description**: Add anonymous usage telemetry to understand how users interact with the extension.

**Benefits**:
- Data-driven decision making for future enhancements
- Understanding of most-used features
- Bug detection and crash reporting

**Implementation Considerations**:
- Use VS Code's built-in telemetry API
- Respect user privacy settings
- No personal data collection
- GDPR compliance

**Priority**: Low
**Estimated Effort**: Medium

### FE-6: Configuration UI
**Description**: Add settings UI to allow users to configure extension behavior without editing JSON settings.

**Benefits**:
- More user-friendly configuration
- No need to edit VS Code settings JSON
- Better discoverability of options

**Implementation Considerations**:
- Add `configuration` section to package.json
- Define properties with types, defaults, descriptions
- Support for future enhancements (shortcuts, status bar, etc.)

**Priority**: Low (currently minimal configuration needed)
**Estimated Effort**: Low

## 10. Success Metrics

- **Adoption**: Extension installed by at least 100 users in first month
- **Usage**: Average of 10+ command executions per active user per week
- **Satisfaction**: 4.0+ star rating on VS Code Marketplace
- **Reliability**: Less than 1% error rate in telemetry

## 11. Release Checklist

- [ ] All functional requirements implemented
- [ ] All non-functional requirements met
- [ ] Code follows development guidelines in AGENTS.md
- [ ] Documentation updated (AGENTS.md, PRD.md)
- [ ] Testing completed on Windows, macOS, and Linux
- [ ] Extension packaged as .vsix file
- [ ] Extension published to VS Code Marketplace

## 12. Appendix

### 12.1 Terminology

- **Scroll Sync**: Synchronization of scroll position between editor and preview panels
- **Context Key**: VS Code mechanism for controlling UI element visibility
- **Workspace**: VS Code project folder with its own settings
- **Command Palette**: VS Code's command search interface (Ctrl+Shift+P)

### 12.2 References

- VS Code Extension API Documentation
- VS Code Contribution Points Documentation
- VS Code Configuration API Documentation

---

**Document Version**: 1.0  
**Last Updated**: 2026-02-19  
**Author**: Kilo Code  
**Status**: Final
