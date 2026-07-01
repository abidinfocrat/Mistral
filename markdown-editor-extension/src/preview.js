// Preview webview script
const vscode = acquireVsCodeApi();

window.addEventListener('message', (event) => {
  const message = event.data;
  
  switch (message.type) {
    case 'update':
      const previewContent = document.getElementById('preview-content');
      if (previewContent) {
        previewContent.innerHTML = message.content;
        
        // Add syntax highlighting to code blocks
        document.querySelectorAll('pre code').forEach((block) => {
          const language = block.className || 'text';
          block.classList.add('language-' + language);
        });
        
        // Make links open in external browser
        document.querySelectorAll('a').forEach((link) => {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        });
      }
      break;
  }
});

// Send ready message
vscode.postMessage({ type: 'ready' });
