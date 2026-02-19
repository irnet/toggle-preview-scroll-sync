const vscode = require('vscode');

function activate(context) {
    const config = vscode.workspace.getConfiguration();
    
    // Register toggle command
    const toggleCommand = vscode.commands.registerCommand('toggleScrollSync.toggle', async () => {
        const currentHtml = config.get('html.preview.scrollPreviewWithEditor', true);
        const newValue = !currentHtml;

        try {
            await config.update('html.preview.scrollPreviewWithEditor', newValue, vscode.ConfigurationTarget.Workspace);
            await config.update('html.preview.scrollEditorWithPreview', newValue, vscode.ConfigurationTarget.Workspace);
            await config.update('markdown.preview.scrollEditorWithPreview', newValue, vscode.ConfigurationTarget.Workspace);

            const status = newValue ? 'ON' : 'OFF';
            vscode.window.showInformationMessage(`Scroll Sync is now ${status}`);
            
            // Update context to show correct command
            vscode.commands.executeCommand('setContext', 'toggleScrollSync.enabled', newValue);
        } catch (error) {
            vscode.window.showErrorMessage(`Error: ${error.message}`);
        }
    });

    // Register enable command
    const enableCommand = vscode.commands.registerCommand('toggleScrollSync.enable', async () => {
        try {
            await config.update('html.preview.scrollPreviewWithEditor', true, vscode.ConfigurationTarget.Workspace);
            await config.update('html.preview.scrollEditorWithPreview', true, vscode.ConfigurationTarget.Workspace);
            await config.update('markdown.preview.scrollEditorWithPreview', true, vscode.ConfigurationTarget.Workspace);
            
            vscode.window.showInformationMessage('Scroll Sync is now ON');
            vscode.commands.executeCommand('setContext', 'toggleScrollSync.enabled', true);
        } catch (error) {
            vscode.window.showErrorMessage(`Error: ${error.message}`);
        }
    });

    // Register disable command
    const disableCommand = vscode.commands.registerCommand('toggleScrollSync.disable', async () => {
        try {
            await config.update('html.preview.scrollPreviewWithEditor', false, vscode.ConfigurationTarget.Workspace);
            await config.update('html.preview.scrollEditorWithPreview', false, vscode.ConfigurationTarget.Workspace);
            await config.update('markdown.preview.scrollEditorWithPreview', false, vscode.ConfigurationTarget.Workspace);
            
            vscode.window.showInformationMessage('Scroll Sync is now OFF');
            vscode.commands.executeCommand('setContext', 'toggleScrollSync.enabled', false);
        } catch (error) {
            vscode.window.showErrorMessage(`Error: ${error.message}`);
        }
    });

    context.subscriptions.push(toggleCommand, enableCommand, disableCommand);
    
    // Initialize context on activation
    const isEnabled = config.get('html.preview.scrollPreviewWithEditor', true);
    vscode.commands.executeCommand('setContext', 'toggleScrollSync.enabled', isEnabled);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};