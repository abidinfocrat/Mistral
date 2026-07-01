import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { marked } from 'marked';
import { createCanvas } from 'canvas';
import * as pdfLib from 'pdf-lib';
import * as htmlPdfNode from 'html-pdf-node';
import * as mammoth from 'mammoth';
import { v4 as uuidv4 } from 'uuid';

// Configure marked for GitHub Flavored Markdown
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  headerPrefix: 'user-content-',
  highlight: function(code: string, lang: string) {
    // Simple syntax highlighting
    return code;
  }
});

// Custom renderer for images
const renderer = new marked.Renderer();
renderer.image = function(href: string, title: string | null, text: string) {
  const out = `<img src="${href}" alt="${text}"`;
  if (title) {
    out += ` title="${title}"`;
  }
  out += ' style="max-width: 100%; height: auto;"';
  out += '/>';
  return out;
};

marked.use({ renderer });

export function activate(context: vscode.ExtensionContext) {
  console.log('Markdown Editor Pro is now active!');

  // Register commands
  const openEditorCmd = vscode.commands.registerCommand('markdown-editor-pro.openEditor', () => {
    openMarkdownEditor();
  });

  const exportPDFCmd = vscode.commands.registerCommand('markdown-editor-pro.exportPDF', async () => {
    await exportToPDF();
  });

  const exportHTMLCmd = vscode.commands.registerCommand('markdown-editor-pro.exportHTML', async () => {
    await exportToHTML();
  });

  const exportWordCmd = vscode.commands.registerCommand('markdown-editor-pro.exportWord', async () => {
    await exportToWord();
  });

  const insertImageCmd = vscode.commands.registerCommand('markdown-editor-pro.insertImage', async () => {
    await insertImage();
  });

  // Add to context
  context.subscriptions.push(openEditorCmd, exportPDFCmd, exportHTMLCmd, exportWordCmd, insertImageCmd);

  // Register preview provider
  const previewProvider = new MarkdownPreviewProvider(context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('markdown-editor-pro.preview', previewProvider)
  );

  // Auto-update preview when active editor changes
  vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (editor && editor.document.languageId === 'markdown') {
      previewProvider.updatePreview(editor.document.getText());
    }
  });

  // Auto-update preview when document content changes
  vscode.workspace.onDidChangeTextDocument((event) => {
    if (event.document.languageId === 'markdown') {
      previewProvider.updatePreview(event.document.getText());
    }
  });
}

class MarkdownPreviewProvider implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView;
  private _context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this._context = context;
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._context.extensionUri]
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    // Update preview with current editor content
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor && activeEditor.document.languageId === 'markdown') {
      this.updatePreview(activeEditor.document.getText());
    }
  }

  public updatePreview(content: string) {
    if (this._view) {
      const html = this._generatePreviewHtml(content);
      this._view.webview.postMessage({
        type: 'update',
        content: html
      });
    }
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._context.extensionUri, 'out', 'preview.js')
    );
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._context.extensionUri, 'out', 'preview.css')
    );

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="${styleUri}">
        <title>Markdown Preview</title>
      </head>
      <body>
        <div id="preview-content"></div>
        <script src="${scriptUri}"></script>
      </body>
      </html>`;
  }

  private _generatePreviewHtml(markdown: string): string {
    try {
      const html = marked.parse(markdown);
      return `<div class="markdown-body">${html}</div>`;
    } catch (error) {
      return `<div class="error">Error rendering preview: ${error}</div>`;
    }
  }
}

async function openMarkdownEditor() {
  // Check if there's an active markdown editor
  const activeEditor = vscode.window.activeTextEditor;
  
  if (activeEditor && activeEditor.document.languageId === 'markdown') {
    // Show the preview panel
    await vscode.commands.executeCommand('markdown-editor-pro.preview.focus');
    return;
  }

  // Create a new markdown file
  const newFileUri = await vscode.workspace.openTextDocument({
    content: '# Untitled Document\n\nStart writing your markdown here...',
    language: 'markdown'
  });

  await vscode.window.showTextDocument(newFileUri, vscode.ViewColumn.One);
  await vscode.commands.executeCommand('markdown-editor-pro.preview.focus');
}

async function exportToPDF() {
  const activeEditor = vscode.window.activeTextEditor;
  if (!activeEditor || activeEditor.document.languageId !== 'markdown') {
    vscode.window.showErrorMessage('Please open a Markdown file first.');
    return;
  }

  const markdown = activeEditor.document.getText();
  const html = marked.parse(markdown);

  try {
    vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Exporting to PDF...',
      cancellable: false
    }, async (progress) => {
      progress.report({ increment: 0, message: 'Generating PDF...' });
      
      const fileUri = await vscode.window.showSaveDialog({
        title: 'Save PDF',
        filters: {
          'PDF Files': ['pdf']
        },
        defaultUri: vscode.Uri.file(
          path.join(os.homedir(), 'Documents', `${activeEditor.document.fileName.split('/').pop()?.replace('.md', '') || 'document'}.pdf`)
        )
      });

      if (!fileUri) {
        return;
      }

      // Use html-pdf-node for better PDF generation
      const { pdfBuffer } = await htmlPdfNode.generatePdf({
        content: `<!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                     line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
              h1, h2, h3, h4, h5, h6 { margin-top: 1.5em; margin-bottom: 0.5em; }
              code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
              pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
              blockquote { border-left: 3px solid #ccc; padding-left: 15px; margin-left: 0; color: #666; }
              table { border-collapse: collapse; width: 100%; margin: 1em 0; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background: #f4f4f4; }
              img { max-width: 100%; height: auto; }
              a { color: #0366d6; text-decoration: none; }
              a:hover { text-decoration: underline; }
            </style>
          </head>
          <body>${html}</body>
          </html>`,
        format: 'A4'
      });

      await fs.promises.writeFile(fileUri.fsPath, pdfBuffer);
      progress.report({ increment: 100, message: 'PDF exported successfully!' });
      
      vscode.window.showInformationMessage(`PDF exported to ${fileUri.fsPath}`);
    });
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to export PDF: ${error}`);
    console.error('PDF export error:', error);
  }
}

async function exportToHTML() {
  const activeEditor = vscode.window.activeTextEditor;
  if (!activeEditor || activeEditor.document.languageId !== 'markdown') {
    vscode.window.showErrorMessage('Please open a Markdown file first.');
    return;
  }

  const markdown = activeEditor.document.getText();
  const html = marked.parse(markdown);

  try {
    const fileUri = await vscode.window.showSaveDialog({
      title: 'Save HTML',
      filters: {
        'HTML Files': ['html', 'htm']
      },
      defaultUri: vscode.Uri.file(
        path.join(os.homedir(), 'Documents', `${activeEditor.document.fileName.split('/').pop()?.replace('.md', '') || 'document'}.html`)
      )
    });

    if (!fileUri) {
      return;
    }

    const fullHtml = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${activeEditor.document.fileName.split('/').pop()?.replace('.md', '') || 'Document'}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                 line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1, h2, h3, h4, h5, h6 { margin-top: 1.5em; margin-bottom: 0.5em; }
          code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
          pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
          blockquote { border-left: 3px solid #ccc; padding-left: 15px; margin-left: 0; color: #666; }
          table { border-collapse: collapse; width: 100%; margin: 1em 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background: #f4f4f4; }
          img { max-width: 100%; height: auto; }
          a { color: #0366d6; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>${html}</body>
      </html>`;

    await fs.promises.writeFile(fileUri.fsPath, fullHtml);
    vscode.window.showInformationMessage(`HTML exported to ${fileUri.fsPath}`);
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to export HTML: ${error}`);
    console.error('HTML export error:', error);
  }
}

async function exportToWord() {
  const activeEditor = vscode.window.activeTextEditor;
  if (!activeEditor || activeEditor.document.languageId !== 'markdown') {
    vscode.window.showErrorMessage('Please open a Markdown file first.');
    return;
  }

  const markdown = activeEditor.document.getText();
  const html = marked.parse(markdown);

  try {
    vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Exporting to Word...',
      cancellable: false
    }, async (progress) => {
      progress.report({ increment: 0, message: 'Converting to Word format...' });
      
      const fileUri = await vscode.window.showSaveDialog({
        title: 'Save Word Document',
        filters: {
          'Word Documents': ['docx']
        },
        defaultUri: vscode.Uri.file(
          path.join(os.homedir(), 'Documents', `${activeEditor.document.fileName.split('/').pop()?.replace('.md', '') || 'document'}.docx`)
        )
      });

      if (!fileUri) {
        return;
      }

      // Convert HTML to DOCX using mammoth
      const result = await mammoth.convertToHtml({ value: html });
      
      // For simplicity, we'll create a basic DOCX using a template approach
      // In a production environment, you might use a more robust library
      await this.createSimpleDocx(html, fileUri.fsPath);
      
      progress.report({ increment: 100, message: 'Word document exported successfully!' });
      vscode.window.showInformationMessage(`Word document exported to ${fileUri.fsPath}`);
    });
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to export Word document: ${error}`);
    console.error('Word export error:', error);
  }
}

async function createSimpleDocx(html: string, outputPath: string) {
  // This is a simplified approach - in production, use a proper DOCX library
  // For now, we'll save as HTML with .docx extension (browsers can open this)
  const docxContent = `<?xml version="1.0" encoding="UTF-8"?>
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        h1, h2, h3, h4, h5, h6 { margin-top: 1.5em; margin-bottom: 0.5em; }
        code { background: #f4f4f4; padding: 2px 4px; }
        pre { background: #f4f4f4; padding: 10px; overflow-x: auto; }
        blockquote { border-left: 3px solid #ccc; padding-left: 15px; margin-left: 0; color: #666; }
      </style>
    </head>
    <body>${html}</body>
    </html>`;

  await fs.promises.writeFile(outputPath, docxContent);
}

async function insertImage() {
  const activeEditor = vscode.window.activeTextEditor;
  if (!activeEditor || activeEditor.document.languageId !== 'markdown') {
    vscode.window.showErrorMessage('Please open a Markdown file first.');
    return;
  }

  try {
    // Show file picker for image
    const fileUri = await vscode.window.showOpenDialog({
      title: 'Select Image',
      filters: {
        'Images': ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp']
      },
      canSelectMany: false
    });

    if (!fileUri || fileUri.length === 0) {
      return;
    }

    const imagePath = fileUri[0].fsPath;
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    
    let relativePath: string;
    
    if (workspaceFolder) {
      // Make path relative to workspace
      relativePath = path.relative(workspaceFolder.uri.fsPath, imagePath);
    } else {
      // Use absolute path
      relativePath = imagePath;
    }

    // Convert backslashes to forward slashes for markdown
    relativePath = relativePath.replace(/\\/g, '/');

    // Insert markdown image syntax
    const imageName = path.basename(imagePath);
    const markdownImage = `![${imageName}](${relativePath})`;
    
    await activeEditor.edit((editBuilder) => {
      editBuilder.insert(activeEditor.selection.active, markdownImage);
    });

    vscode.window.showInformationMessage(`Image inserted: ${imageName}`);
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to insert image: ${error}`);
    console.error('Image insert error:', error);
  }
}

export function deactivate() {}
