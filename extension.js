const vscode = require('vscode');

/**
 * Update the context key based on the active editor's language
 */
function updateContextForActiveEditor() {
    const activeEditor = vscode.window.activeTextEditor;
    
    if (!activeEditor) {
        console.log('[ToggleScrollSync] No active editor, hiding commands');
        vscode.commands.executeCommand('setContext', 'toggleScrollSync.enabled', false);
        return;
    }

    const langId = activeEditor.document.languageId;
    const config = vscode.workspace.getConfiguration(null);
    
    let isEnabled = false;
    let isSupportedLanguage = false;
    let settingName = '';
    let settingValue = null;
    
    if (langId === 'html') {
        // Check both possible HTML scroll sync settings
        const scrollPreviewWithEditor = config.get('html.preview.scrollPreviewWithEditor', true);
        const scrollEditorWithPreview = config.get('html.preview.scrollEditorWithPreview', true);
        isSupportedLanguage = true;
        
        settingName = 'html.preview.scrollPreviewWithEditor';
        settingValue = config.inspect(settingName);
        isEnabled = scrollEditorWithPreview | scrollPreviewWithEditor;
        
        console.log(`[ToggleScrollSync] HTML file detected`);
        console.log(`[ToggleScrollSync]   Setting: ${settingName}`);
        console.log(`[ToggleScrollSync]   Workspace value: ${settingValue?.workspaceValue}`);
        console.log(`[ToggleScrollSync]   Global value: ${settingValue?.globalValue}`);
        console.log(`[ToggleScrollSync]   Effective value: ${isEnabled}`);
        console.log(`[ToggleScrollSync]   scrollPreviewWithEditor: ${scrollPreviewWithEditor}`);
        console.log(`[ToggleScrollSync]   scrollEditorWithPreview: ${scrollEditorWithPreview}`);
    } else if (langId === 'markdown') {
        // Check both possible Markdown scroll sync settings
        const scrollEditorWithPreview = config.get('markdown.preview.scrollEditorWithPreview', true);
        const scrollPreviewWithEditor = config.get('markdown.preview.scrollPreviewWithEditor', true);
        isSupportedLanguage = true;
        
        settingName = 'markdown.preview.scrollEditorWithPreview';
        settingValue = config.inspect(settingName);
        isEnabled = scrollEditorWithPreview | scrollPreviewWithEditor;
        
        console.log(`[ToggleScrollSync] Markdown file detected`);
        console.log(`[ToggleScrollSync]   Setting: ${settingName}`);
        console.log(`[ToggleScrollSync]   Workspace value: ${settingValue?.workspaceValue}`);
        console.log(`[ToggleScrollSync]   Global value: ${settingValue?.globalValue}`);
        console.log(`[ToggleScrollSync]   Effective value: ${isEnabled}`);
        console.log(`[ToggleScrollSync]   scrollEditorWithPreview: ${scrollEditorWithPreview}`);
        console.log(`[ToggleScrollSync]   scrollPreviewWithEditor: ${scrollPreviewWithEditor}`);
    }
    
    if (isSupportedLanguage) {
        console.log(`[ToggleScrollSync] Setting context toggleScrollSync.enabled to: ${isEnabled}`);
        vscode.commands.executeCommand('setContext', 'toggleScrollSync.enabled', isEnabled);
    } else {
        console.log(`[ToggleScrollSync] Unsupported language: ${langId}, hiding commands`);
    }
}

function activate(context) {
    console.log('[ToggleScrollSync] Extension activating...');
    
    // Handler to enable scroll sync
    const enableHandler = async () => {
        console.log('[ToggleScrollSync] === ENABLE COMMAND CALLED ===');
        const config = vscode.workspace.getConfiguration(null);
        
        try {
            console.log('[ToggleScrollSync] Setting html.preview.scrollPreviewWithEditor to true');
            await config.update('html.preview.scrollPreviewWithEditor', true, vscode.ConfigurationTarget.Workspace);
            console.log('[ToggleScrollSync] Setting html.preview.scrollEditorWithPreview to true');
            await config.update('html.preview.scrollEditorWithPreview', true, vscode.ConfigurationTarget.Workspace);
            console.log('[ToggleScrollSync] Setting markdown.preview.scrollEditorWithPreview to true');
            await config.update('markdown.preview.scrollEditorWithPreview', true, vscode.ConfigurationTarget.Workspace);
            console.log('[ToggleScrollSync] Setting markdown.preview.scrollPreviewWithEditor to true');
            await config.update('markdown.preview.scrollPreviewWithEditor', true, vscode.ConfigurationTarget.Workspace);

            // // Force refresh Markdown preview to apply changes
            // console.log('[ToggleScrollSync] Refreshing Markdown preview...');
            // try {
            //     await vscode.commands.executeCommand('markdown.preview.refresh');
            // } catch (refreshError) {
            //     console.log('[ToggleScrollSync] Preview refresh command not available or failed:', refreshError);
            //     // This is OK - the preview might not be open or the command might not exist
            // }

            // Update context to show/hide appropriate commands
            // Delay context update to avoid Command Palette auto-executing the next command
            console.log('[ToggleScrollSync] Setting context toggleScrollSync.enabled to true (delayed)');
            setTimeout(() => {
                vscode.commands.executeCommand('setContext', 'toggleScrollSync.enabled', true);
                console.log('[ToggleScrollSync] Context updated to true');
            }, 100);
            console.log('[ToggleScrollSync] Scroll sync enabled');

            vscode.window.showInformationMessage('Scroll Sync is now ON');
        } catch (error) {
            console.error('[ToggleScrollSync] Error enabling:', error);
            vscode.window.showErrorMessage(`Error: ${error.message}`);
        }
    };

    // Handler to disable scroll sync
    const disableHandler = async () => {
        console.log('[ToggleScrollSync] === DISABLE COMMAND CALLED ===');
        const config = vscode.workspace.getConfiguration(null);
        
        try {
            console.log('[ToggleScrollSync] Setting html.preview.scrollPreviewWithEditor to false');
            await config.update('html.preview.scrollPreviewWithEditor', false, vscode.ConfigurationTarget.Workspace);
            console.log('[ToggleScrollSync] Setting html.preview.scrollEditorWithPreview to false');
            await config.update('html.preview.scrollEditorWithPreview', false, vscode.ConfigurationTarget.Workspace);
            console.log('[ToggleScrollSync] Setting markdown.preview.scrollEditorWithPreview to false');
            await config.update('markdown.preview.scrollEditorWithPreview', false, vscode.ConfigurationTarget.Workspace);
            console.log('[ToggleScrollSync] Setting markdown.preview.scrollPreviewWithEditor to false');
            await config.update('markdown.preview.scrollPreviewWithEditor', false, vscode.ConfigurationTarget.Workspace);

            // // Force refresh Markdown preview to apply changes
            // console.log('[ToggleScrollSync] Refreshing Markdown preview...');
            // try {
            //     await vscode.commands.executeCommand('markdown.preview.refresh');
            // } catch (refreshError) {
            //     console.log('[ToggleScrollSync] Preview refresh command not available or failed:', refreshError);
            //     // This is OK - the preview might not be open or the command might not exist
            // }

            // Update context to show/hide appropriate commands
            // Delay context update to avoid Command Palette auto-executing the next command
            console.log('[ToggleScrollSync] Setting context toggleScrollSync.enabled to false (delayed)');
            setTimeout(() => {
                vscode.commands.executeCommand('setContext', 'toggleScrollSync.enabled', false);
                console.log('[ToggleScrollSync] Context updated to false');
            }, 100);
            console.log('[ToggleScrollSync] Scroll sync disabled');

            vscode.window.showInformationMessage('Scroll Sync is now OFF');
        } catch (error) {
            console.error('[ToggleScrollSync] Error disabling:', error);
            vscode.window.showErrorMessage(`Error: ${error.message}`);
        }
    };

    // Register both commands with separate handlers
    const enableCommand = vscode.commands.registerCommand('toggleScrollSync.enable', enableHandler);
    const disableCommand = vscode.commands.registerCommand('toggleScrollSync.disable', disableHandler);

    context.subscriptions.push(enableCommand, disableCommand);

    // Listen for active editor changes to update context
    const editorChangeListener = vscode.window.onDidChangeActiveTextEditor(() => {
        console.log('[ToggleScrollSync] === ACTIVE EDITOR CHANGED ===');
        updateContextForActiveEditor();
    });

    context.subscriptions.push(editorChangeListener);

    // Initialize context on activation based on current active editor
    console.log('[ToggleScrollSync] === INITIALIZING CONTEXT ===');
    updateContextForActiveEditor();
}

function deactivate() {
    console.log('[ToggleScrollSync] Extension deactivating...');
}

module.exports = {
    activate,
    deactivate
};