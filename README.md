# Markdown Editor Pro

[![VS Code Marketplace](https://img.shields.io/vscode-marketplace/v/abidinfocrat.markdown-editor-pro.svg)](https://marketplace.visualstudio.com/items?itemName=abidinfocrat.markdown-editor-pro)
[![VS Code Marketplace Installs](https://img.shields.io/vscode-marketplace/i/abidinfocrat.markdown-editor-pro.svg)](https://marketplace.visualstudio.com/items?itemName=abidinfocrat.markdown-editor-pro)
[![VS Code Marketplace Rating](https://img.shields.io/vscode-marketplace/r/abidinfocrat.markdown-editor-pro.svg)](https://marketplace.visualstudio.com/items?itemName=abidinfocrat.markdown-editor-pro)
[![GitHub License](https://img.shields.io/github/license/abidinfocrat/Mistral.svg)](https://github.com/abidinfocrat/Mistral/blob/main/LICENSE)
[![GitHub Issues](https://img.shields.io/github/issues/abidinfocrat/Mistral.svg)](https://github.com/abidinfocrat/Mistral/issues)
[![GitHub Stars](https://img.shields.io/github/stars/abidinfocrat/Mistral.svg)](https://github.com/abidinfocrat/Mistral/stargazers)

> **A beautiful distraction-free Markdown editor with live preview, export to PDF/HTML/Word, image drag-and-drop, and GitHub-flavored Markdown support.**

## 🚀 Quick Start

### Install from VS Code Marketplace

[![Install from VS Code Marketplace](https://img.shields.io/badge/Install-from%20VS%20Code%20Marketplace-blue?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=abidinfocrat.markdown-editor-pro)

1. Open VS Code
2. Go to Extensions view (Ctrl+Shift+X or Cmd+Shift+X)
3. Search for "Markdown Editor Pro"
4. Click Install

### Or Install from .vsix

1. Download the latest `.vsix` file from [Releases](https://github.com/abidinfocrat/Mistral/releases)
2. In VS Code, open the command palette (Ctrl+Shift+P or Cmd+Shift+P)
3. Search for "Extensions: Install from VSIX..."
4. Select the downloaded `.vsix` file

## ✨ Features

| Feature | Description |
|---------|-------------|
| 👁️ **Live Preview** | Real-time Markdown rendering as you type |
| 📄 **PDF Export** | Convert Markdown to professional PDF documents |
| 🌐 **HTML Export** | Generate clean, responsive HTML files |
| 📝 **Word Export** | Create Word documents (.docx) for easy sharing |
| 🖼️ **Image Support** | Drag-and-drop or insert images from file system |
| 💻 **VS Code Integration** | Deep integration with VS Code ecosystem |
| 🎨 **GitHub Flavored** | Full support for GFM (tables, task lists, etc.) |
| 🎨 **Syntax Highlighting** | Beautiful syntax highlighting for code blocks |

## 💰 Pricing

| License | Price | Features |
|---------|-------|----------|
| **Individual** | $9 (one-time) | All core features, lifetime updates |
| **Business** | $49 (one-time) | Team features, 10 devices, priority support |
| **Enterprise** | $199/year | Unlimited users, dedicated support, API access |

**Save $140 over 10 years vs. Typora's $14.99/year subscription!**

## 📦 Project Structure

```
markdown-editor-extension/
├── src/                          # Source TypeScript files
│   ├── extension.ts              # Main extension code
│   ├── preview.js                # Preview webview script
│   └── preview.css               # Preview styling
├── .github/
│   ├── workflows/                # GitHub Actions workflows
│   │   ├── build.yml             # Build and test workflow
│   │   ├── release.yml           # Release workflow
│   │   └── docs.yml              # Documentation workflow
│   ├── ISSUE_TEMPLATE/           # Issue templates
│   ├── CONTRIBUTING.md           # Contribution guidelines
│   └── CODE_OF_CONDUCT.md        # Code of conduct
├── scripts/                      # Build and deployment scripts
│   ├── build.sh                  # Build script
│   ├── deploy.sh                 # Deployment script
│   └── test.sh                   # Test script
├── business/                     # Business and sales materials
│   ├── BUSINESS_MODEL.md         # Business model documentation
│   ├── SALES_PITCH.md            # Sales pitch and marketing materials
│   └── WEBSITE_CONTENT.md        # Website content templates
├── package.json                  # Extension manifest
├── tsconfig.json                 # TypeScript configuration
├── README.md                     # Extension documentation
├── CHANGELOG.md                  # Release history
├── LICENSE                       # MIT License
└── SETUP_GUIDE.md                # Complete setup guide
```

## 🛠️ Development

### Prerequisites

- [Node.js](https://nodejs.org/) 16.x or higher
- [VS Code](https://code.visualstudio.com/) 1.75.0 or higher
- [Git](https://git-scm.com/)

### Setup

```bash
# Clone the repository
git clone https://github.com/abidinfocrat/Mistral.git
cd Mistral/markdown-editor-extension

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Run in development mode (press F5 in VS Code)
code .
```

### Build and Package

```bash
# Build the extension
./scripts/build.sh

# Or manually
npm run compile
vsce package
```

### Deploy

```bash
# Deploy to VS Code Marketplace and GitHub
./scripts/deploy.sh
```

## 📚 Documentation

- [Full Documentation](https://abidinfocrat.github.io/Mistral/markdown-editor-extension/)
- [Setup Guide](https://abidinfocrat.github.io/Mistral/markdown-editor-extension/setup.md)
- [Changelog](https://abidinfocrat.github.io/Mistral/markdown-editor-extension/changelog.md)
- [Business Model](https://abidinfocrat.github.io/Mistral/markdown-editor-extension/business/BUSINESS_MODEL.md)
- [Sales Pitch](https://abidinfocrat.github.io/Mistral/markdown-editor-extension/business/SALES_PITCH.md)

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](https://github.com/abidinfocrat/Mistral/blob/main/markdown-editor-extension/.github/CONTRIBUTING.md) for details on how to contribute to this project.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/abidinfocrat/Mistral/blob/main/LICENSE) file for details.

## 🙏 Support

- **GitHub Issues**: [https://github.com/abidinfocrat/Mistral/issues](https://github.com/abidinfocrat/Mistral/issues)
- **Email**: support@markdowneditorpro.com
- **Twitter**: [@MarkdownEditorPro](https://twitter.com/MarkdownEditorPro)
- **VS Code Marketplace**: [https://marketplace.visualstudio.com/items?itemName=abidinfocrat.markdown-editor-pro](https://marketplace.visualstudio.com/items?itemName=abidinfocrat.markdown-editor-pro)

## 🎯 Why Markdown Editor Pro?

### The Typora Alternative You've Been Waiting For

When Typora moved to a subscription model ($14.99/year), many users were left looking for alternatives. Markdown Editor Pro fills that gap with:

✅ **One-time purchase** - Pay once, own forever
✅ **VS Code integration** - Works where you already code
✅ **Professional features** - PDF, HTML, Word export
✅ **Zero-cost development** - Built with open-source tools
✅ **High margins** - Digital product with minimal overhead

### Perfect for:

- **Developers** who need documentation tools integrated with VS Code
- **Technical Writers** who require professional export options
- **Students** who want affordable, one-time purchase tools
- **Bloggers** who need simple Markdown editing with preview
- **Small Businesses** who prefer cost-effective solutions

## 🚀 Roadmap

### 📅 Q3 2024
- [x] Core extension development
- [x] Live preview functionality
- [x] PDF/HTML/Word export
- [x] Image support
- [ ] VS Code Marketplace publication
- [ ] GitHub Pages documentation

### 📅 Q4 2024
- [ ] Custom themes and templates
- [ ] Split view editing
- [ ] Settings and preferences panel
- [ ] Keyboard shortcuts
- [ ] Advanced export options

### 📅 2025
- [ ] Cloud sync functionality
- [ ] Collaboration features
- [ ] AI-powered features
- [ ] Mobile companion app
- [ ] Standalone desktop application

---

**Markdown Editor Pro - The One-Time Purchase Markdown Editor for VS Code**

[![VS Code Marketplace](https://img.shields.io/badge/VS%20Code%20Marketplace-Markdown%20Editor%20Pro-blue?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=abidinfocrat.markdown-editor-pro)

*Built with ❤️ for the developer community*
