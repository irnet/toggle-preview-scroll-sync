const vscode = require('vscode');

function activate(context) {
    // Handler function for both commands
    const toggleHandler = async () => {
        const config = vscode.workspace.getConfiguration(null);
        
        // Current values (default to true if not explicitly set)
        const currentHtml = config.get('html.preview.scrollPreviewWithEditor', true);
        const currentHtmlReverse = config.get('html.preview.scrollEditorWithPreview', true);
        const currentMd = config.get('markdown.preview.scrollEditorWithPreview', true);

        // Invert logic: if currently enabled (true), set to false, and vice versa
        const newValue = !currentHtml;

        try {
            await config.update('html.preview.scrollPreviewWithEditor', newValue, vscode.ConfigurationTarget.Workspace);
            await config.update('html.preview.scrollEditorWithPreview', newValue, vscode.ConfigurationTarget.Workspace);
            await config.update('markdown.preview.scrollEditorWithPreview', newValue, vscode.ConfigurationTarget.Workspace);

            // Update context to show/hide appropriate commands
            vscode.commands.executeCommand('setContext', 'toggleScrollSync.enabled', newValue);

            const status = newValue ? 'ON' : 'OFF';
            vscode.window.showInformationMessage(`Scroll Sync is now ${status}`);
        } catch (error) {
            vscode.window.showErrorMessage(`Error: ${error.message}`);
        }
    };

    // Register both commands with the same handler
    const enableCommand = vscode.commands.registerCommand('toggleScrollSync.enable', toggleHandler);
    const disableCommand = vscode.commands.registerCommand('toggleScrollSync.disable', toggleHandler);

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