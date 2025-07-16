import * as vscode from 'vscode';

import * as fs from 'fs';
import * as path from 'path';

export class SidebarViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'vscode-sidebar.openview';

  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) { }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
  ): void | Thenable<void> {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };
    webviewView.webview.html = this.getHtmlContent(webviewView.webview);
  }

  private getHtmlContent(webview: vscode.Webview): string {
    const baseUri = vscode.Uri.joinPath(this._extensionUri, 'dist');
    const htmlPath = vscode.Uri.joinPath(baseUri, 'index.html');
    const tpl = fs.readFileSync(htmlPath.fsPath, 'utf8');
    const baseUrl = webview.asWebviewUri(baseUri);
    const content = tpl.replace(/\/\{BASE_URL\}/g, baseUrl.toString());
    // console.log("html content", content);
    return content;
  }
}

function getNonce() {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
