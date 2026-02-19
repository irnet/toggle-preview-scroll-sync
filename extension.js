const vscode = require('vscode');

function activate(context) {
    // Handler to enable scroll sync
    const enableHandler = async () => {
        const config = vscode.workspace.getConfiguration(null);
        
        try {
            await config.update('html.preview.scrollPreviewWithEditor', true, vscode.ConfigurationTarget.Workspace);
            await config.update('html.preview.scrollEditorWithPreview', true, vscode.ConfigurationTarget.Workspace);
            await config.update('markdown.preview.scrollEditorWithPreview', true, vscode.ConfigurationTarget.Workspace);

            // Update context to show/hide appropriate commands
            vscode.commands.executeCommand('setContext', 'toggleScrollSync.enabled', true);

            vscode.window.showInformationMessage('Scroll Sync is now ON');
        } catch (error) {
            vscode.window.showErrorMessage(`Error: ${error.message}`);
        }
    };

    // Handler to disable scroll sync
    const disableHandler = async () => {
        const config = vscode.workspace.getConfiguration(null);
        
        try {
            await config.update('html.preview.scrollPreviewWithEditor', false, vscode.ConfigurationTarget.Workspace);
            await config.update('html.preview.scrollEditorWithPreview', false, vscode.ConfigurationTarget.Workspace);
            await config.update('markdown.preview.scrollEditorWithPreview', false, vscode.ConfigurationTarget.Workspace);

            // Update context to show/hide appropriate commands
            vscode.commands.executeCommand('setContext', 'toggleScrollSync.enabled', false);

            vscode.window.showInformationMessage('Scroll Sync is now OFF');
        } catch (error) {
            vscode.window.showErrorMessage(`Error: ${error.message}`);
        }
    };

    // Register both commands with separate handlers
    const enableCommand = vscode.commands.registerCommand('toggleScrollSync.enable', enableHandler);
    const disableCommand = vscode.commands.registerCommand('toggleScrollSync.disable', disableHandler);

    context.subscriptions.push(enableCommand, disableCommand);

    // Initialize context on activation
    const config = vscode.workspace.getConfiguration(null);
    const currentHtml = config.get('html.preview.scrollPreviewWithEditor', true);
    vscode.commands.executeCommand('setContext', 'toggleScrollSync.enabled', currentHtml);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};