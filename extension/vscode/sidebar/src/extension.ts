import * as vscode from 'vscode';
import { SidebarViewProvider } from './provider';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Chatbot sidebar is now active!');

  const provider = new SidebarViewProvider(context.extensionUri);
  const view = vscode.window.registerWebviewViewProvider(
    SidebarViewProvider.viewType,
    provider,
  );
  context.subscriptions.push(view);
}

// This method is called when your extension is deactivated
export function deactivate() {}
