# Markdown Editor Pro - VS Code Extension

A beautiful distraction-free Markdown editor with live preview, export to PDF/HTML/Word, image drag-and-drop, and GitHub-flavored Markdown support.

## Features

- **Live Preview**: Real-time preview of your Markdown content
- **Export to PDF**: Convert your Markdown to professional PDF documents
- **Export to HTML**: Generate clean HTML files from your Markdown
- **Export to Word**: Create Word documents (.docx) from your Markdown
- **Image Support**: Drag-and-drop images or insert them from your file system
- **GitHub Flavored Markdown**: Full support for GFM including tables, task lists, and more
- **Syntax Highlighting**: Beautiful syntax highlighting for code blocks
- **Distraction-Free**: Clean, focused writing environment

## Usage

### Opening the Editor

1. Open any Markdown file (.md) in VS Code
2. Use the command palette (Ctrl+Shift+P or Cmd+Shift+P)
3. Search for "Markdown Editor Pro: Open Editor"

### Live Preview

- The preview panel automatically updates as you type
- Supports all GitHub Flavored Markdown features
- Syntax highlighting for code blocks

### Exporting Documents

#### Export to PDF
1. Open a Markdown file
2. Use the command palette and search for "Markdown Editor Pro: Export to PDF"
3. Choose a location to save your PDF file

#### Export to HTML
1. Open a Markdown file
2. Use the command palette and search for "Markdown Editor Pro: Export to HTML"
3. Choose a location to save your HTML file

#### Export to Word
1. Open a Markdown file
2. Use the command palette and search for "Markdown Editor Pro: Export to Word"
3. Choose a location to save your Word document

### Inserting Images

1. Open a Markdown file
2. Place your cursor where you want to insert the image
3. Use the command palette and search for "Markdown Editor Pro: Insert Image"
4. Select an image file from your system
5. The image will be inserted with proper Markdown syntax

## Supported Markdown Features

- Headers (#, ##, ###, etc.)
- Emphasis (*italic*, **bold**, ~~strikethrough~~)
- Lists (ordered and unordered)
- Links and Images
- Code blocks with syntax highlighting
- Tables
- Blockquotes
- Horizontal rules
- HTML (inline and blocks)
- Task lists
- Footnotes
- Definition lists

## Requirements

- VS Code 1.75.0 or higher
- Node.js 16.x or higher

## Installation

1. Install the extension from the VS Code Marketplace
2. Reload VS Code
3. Open a Markdown file and start using the features

## Development

### Prerequisites

- Node.js
- npm
- VS Code

### Setup

```bash
npm install
npm run compile
```

### Running the Extension

1. Press F5 to open a new VS Code window with the extension loaded
2. Open a Markdown file and test the features

### Packaging

```bash
vsce package
```

This will create a .vsix file that can be published to the VS Code Marketplace.

## License

MIT License - Feel free to use, modify, and distribute.

## Support

For issues, feature requests, or questions, please open an issue on GitHub.

## Changelog

### 1.0.0
- Initial release
- Live preview functionality
- PDF, HTML, and Word export
- Image insertion support
- GitHub Flavored Markdown support
