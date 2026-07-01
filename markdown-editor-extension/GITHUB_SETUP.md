# GitHub Setup Guide for Markdown Editor Pro

## 🎯 Overview

This guide will walk you through setting up the complete GitHub infrastructure for Markdown Editor Pro, including CI/CD, automated releases, documentation, and community management.

## 🚀 Quick Start (5 Minutes)

### 1. Fork or Use Existing Repository

You already have the repository at `https://github.com/abidinfocrat/Mistral` with the `markdown-editor-extension` folder containing all the code.

### 2. Enable GitHub Features

Go to your repository settings and enable:

- **GitHub Pages**: For documentation hosting
- **Issues**: For bug reports and feature requests
- **Discussions**: For community engagement
- **Wiki**: For additional documentation
- **Projects**: For tracking development

### 3. Set Up Secrets

Go to **Settings > Secrets > Actions** and add:

| Secret Name | Description | Required |
|-------------|-------------|----------|
| `VSCE_PAT` | VS Code Marketplace Personal Access Token | Yes (for publishing) |
| `GITHUB_TOKEN` | GitHub Token (automatically provided) | Yes |

#### How to Get VSCE_PAT:

1. Go to [Azure DevOps](https://dev.azure.com/)
2. Sign in with your Microsoft account
3. Create a new organization (this will be your publisher name)
4. Go to **User Settings > Personal Access Tokens**
5. Create a new token with **Packaging** scope (Read & Write)
6. Copy the token and add it as `VSCE_PAT` in GitHub Secrets

## 🏗️ GitHub Infrastructure

### 📁 Repository Structure

```
Mistral/
├── markdown-editor-extension/
│   ├── .github/
│   │   ├── workflows/
│   │   │   ├── build.yml          # CI: Build and test on push
│   │   │   ├── release.yml        # CD: Publish releases
│   │   │   └── docs.yml           # Auto-deploy documentation
│   │   ├── ISSUE_TEMPLATE/
│   │   │   ├── bug_report.md      # Bug report template
│   │   │   └── feature_request.md # Feature request template
│   │   ├── PULL_REQUEST_TEMPLATE.md # PR template
│   │   ├── CODE_OF_CONDUCT.md      # Community guidelines
│   │   └── CONTRIBUTING.md         # Contribution guide
│   ├── src/                        # Source code
│   ├── scripts/                    # Automation scripts
│   ├── business/                   # Business materials
│   └── ...
└── README.md                       # Main repository README
```

### 🔄 GitHub Actions Workflows

#### 1. Build Workflow (`build.yml`)

**Trigger**: On push to `main` or `develop` branches, or on pull requests

**What it does**:
- Sets up Node.js environment
- Installs dependencies
- Lints the code
- Compiles TypeScript
- Runs tests
- Uploads build artifacts

**Status Badge**:
```markdown
![Build Status](https://github.com/abidinfocrat/Mistral/actions/workflows/build.yml/badge.svg)
```

#### 2. Release Workflow (`release.yml`)

**Trigger**: When a new tag is pushed (e.g., `v1.0.0`)

**What it does**:
- Sets up Node.js environment
- Installs vsce (VS Code Extension Manager)
- Builds the extension
- Packages the extension as `.vsix`
- Creates a GitHub Release with the `.vsix` file
- Publishes to VS Code Marketplace (if VSCE_PAT is set)

**How to trigger a release**:
```bash
# Create a new version tag
git tag v1.0.0

# Push the tag to GitHub
git push origin v1.0.0
```

#### 3. Documentation Workflow (`docs.yml`)

**Trigger**: On push to `main` branch when docs are updated

**What it does**:
- Sets up Node.js environment
- Builds documentation from source files
- Deploys to GitHub Pages

**Documentation URL**: `https://abidinfocrat.github.io/Mistral/markdown-editor-extension/`

## 🛠️ Setting Up GitHub Pages

### 1. Enable GitHub Pages

1. Go to **Settings > Pages**
2. Select **GitHub Actions** as the source
3. Wait for the workflow to complete

### 2. Configure Custom Domain (Optional)

1. Buy a domain (e.g., `markdowneditorpro.com`)
2. Go to **Settings > Pages**
3. Add your custom domain
4. Configure DNS records with your registrar

### 3. Documentation Structure

The documentation will be available at:
- Main docs: `https://abidinfocrat.github.io/Mistral/markdown-editor-extension/`
- Index: `https://abidinfocrat.github.io/Mistral/markdown-editor-extension/index.md`
- Setup guide: `https://abidinfocrat.github.io/Mistral/markdown-editor-extension/setup.md`
- Business docs: `https://abidinfocrat.github.io/Mistral/markdown-editor-extension/business/`

## 📋 Issue and Project Management

### Issue Templates

The repository includes custom issue templates:

1. **Bug Report** (`bug_report.md`)
   - Structured form for reporting bugs
   - Includes environment details, steps to reproduce, expected vs. actual behavior

2. **Feature Request** (`feature_request.md`)
   - Structured form for suggesting new features
   - Includes priority selection and willingness to contribute

### Pull Request Template

The repository includes a comprehensive PR template that:
- Links to related issues
- Describes changes made
- Includes testing information
- Has a checklist for contributors

### Labels

Create these labels for better issue organization:

| Label | Color | Description |
|-------|-------|-------------|
| `bug` | #d73a4a | Confirmed bugs |
| `enhancement` | #0075ca | Feature requests |
| `documentation` | #0075ca | Documentation improvements |
| `help wanted` | #008672 | Issues needing community help |
| `good first issue` | #7057ff | Good for new contributors |
| `beginner` | #7057ff | Simple issues for beginners |
| `duplicate` | #cfd3d7 | Duplicate issues |
| `invalid` | #cfd3d7 | Invalid issues |
| `wontfix` | #ffffff | Won't be fixed |
| `question` | #d93f0b | Questions |

### Milestones

Create milestones for major releases:

- **v1.0.0** - Initial release
- **v1.1.0** - First feature update
- **v2.0.0** - Major feature release

## 🤝 Community Management

### Code of Conduct

The repository includes a comprehensive Code of Conduct that:
- Sets expectations for community behavior
- Defines unacceptable behavior
- Outlines enforcement procedures
- Provides contact information for reporting issues

### Contributing Guide

The CONTRIBUTING.md file includes:
- How to contribute
- Issue reporting guidelines
- Feature request guidelines
- Development setup instructions
- Style guides (Git commits, JavaScript/TypeScript, documentation)
- Pull request guidelines
- Code of conduct reference

### Discussions

Enable GitHub Discussions for:
- **General** - General discussion about the extension
- **Q&A** - Questions and answers
- **Ideas** - Feature ideas and suggestions
- **Announcements** - Release announcements and updates

## 🚀 Deployment Workflow

### Local Development

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

### Testing

```bash
# Run all tests
npm test

# Or use the test script
./scripts/test.sh
```

### Building

```bash
# Build the extension
./scripts/build.sh

# Or manually
npm run compile
vsce package
```

### Publishing

#### Method 1: Using the Deploy Script

```bash
# This will:
# 1. Build the extension
# 2. Package it as .vsix
# 3. Publish to VS Code Marketplace
# 4. Create a GitHub Release
# 5. Update changelog
# 6. Commit and push changes
./scripts/deploy.sh
```

#### Method 2: Manual Publishing

```bash
# Build and package
npm run compile
vsce package

# Publish to Marketplace
vsce publish

# Create GitHub Release
gh release create v1.0.0 *.vsix --title "Markdown Editor Pro v1.0.0" --notes "Initial release"
```

#### Method 3: Using GitHub Actions (Recommended)

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Commit changes
4. Create and push a tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
5. The release workflow will automatically:
   - Build the extension
   - Package it
   - Create a GitHub Release
   - Publish to VS Code Marketplace

## 📊 Monitoring and Analytics

### GitHub Insights

Use GitHub's built-in insights to track:
- **Traffic**: Repository visits and clones
- **Contributors**: Who's contributing to the project
- **Commits**: Commit activity
- **Code frequency**: Development activity
- **Dependency graph**: Security vulnerabilities

### VS Code Marketplace Analytics

1. Go to [VS Code Marketplace](https://marketplace.visualstudio.com/)
2. Sign in with your publisher account
3. Navigate to your extension
4. Click on "Analytics" to view:
   - Installation numbers
   - Active users
   - Ratings and reviews
   - Market trends

### Custom Analytics (Optional)

For direct sales, consider integrating:
- **Google Analytics**: Track website traffic
- **Plausible**: Privacy-friendly analytics
- **Stripe/PayPal**: Sales analytics

## 🔧 Maintenance Tasks

### Regular Tasks

1. **Monitor Issues**: Check GitHub issues daily
2. **Review PRs**: Review pull requests from contributors
3. **Update Dependencies**: Check for outdated packages
   ```bash
   npm outdated
   npm update
   ```
4. **Security Audits**: Check for vulnerabilities
   ```bash
   npm audit
   npm audit fix
   ```

### Monthly Tasks

1. **Test with New VS Code Versions**: Ensure compatibility
2. **Update Documentation**: Keep docs up to date
3. **Review Analytics**: Analyze usage patterns
4. **Plan Next Release**: Roadmap planning

### Quarterly Tasks

1. **Major Dependency Updates**: Update major dependencies
2. **Performance Review**: Optimize code and performance
3. **Feature Planning**: Plan new features based on user feedback
4. **Marketing Review**: Review and update marketing strategy

## 📈 Marketing Integration

### Social Media

Set up GitHub Actions to automatically post to social media:

1. **Twitter**: Use a service like Zapier or IFTTT to auto-post releases
2. **LinkedIn**: Share major updates and milestones
3. **Reddit**: Post release announcements to relevant subreddits

### Badges

Add these badges to your README:

```markdown
[![Build Status](https://github.com/abidinfocrat/Mistral/actions/workflows/build.yml/badge.svg)](https://github.com/abidinfocrat/Mistral/actions/workflows/build.yml)
[![VS Code Marketplace](https://img.shields.io/vscode-marketplace/v/abidinfocrat.markdown-editor-pro.svg)](https://marketplace.visualstudio.com/items?itemName=abidinfocrat.markdown-editor-pro)
[![VS Code Marketplace Installs](https://img.shields.io/vscode-marketplace/i/abidinfocrat.markdown-editor-pro.svg)](https://marketplace.visualstudio.com/items?itemName=abidinfocrat.markdown-editor-pro)
[![VS Code Marketplace Rating](https://img.shields.io/vscode-marketplace/r/abidinfocrat.markdown-editor-pro.svg)](https://marketplace.visualstudio.com/items?itemName=abidinfocrat.markdown-editor-pro)
[![GitHub License](https://img.shields.io/github/license/abidinfocrat/Mistral.svg)](https://github.com/abidinfocrat/Mistral/blob/main/LICENSE)
[![GitHub Issues](https://img.shields.io/github/issues/abidinfocrat/Mistral.svg)](https://github.com/abidinfocrat/Mistral/issues)
[![GitHub Stars](https://img.shields.io/github/stars/abidinfocrat/Mistral.svg)](https://github.com/abidinfocrat/Mistral/stargazers)
```

### Release Notes

For each release, include:
- **What's New**: New features and improvements
- **Bug Fixes**: Issues that were fixed
- **Breaking Changes**: Any changes that might break existing functionality
- **Migration Guide**: Instructions for users to migrate if needed

## 🛡️ Security

### Secret Scanning

GitHub automatically scans for secrets. Ensure you:
- Never commit secrets to the repository
- Use environment variables for sensitive data
- Use GitHub Secrets for CI/CD

### Dependency Security

1. **Enable Dependabot**: Go to **Settings > Security > Code security and analysis**
2. Enable **Dependabot alerts** and **Dependabot security updates**
3. Regularly review and update dependencies

### Security Policy

Create a `SECURITY.md` file:

```markdown
# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Markdown Editor Pro, please report it responsibly:

1. **Do not** create a public GitHub issue
2. **Do** email security@markdowneditorpro.com with:
   - A clear description of the vulnerability
   - Steps to reproduce
   - Impact assessment
   - Suggested fix (if available)

## Security Updates

We will:
- Acknowledge your report within 24 hours
- Investigate and verify the vulnerability
- Develop a fix and test it
- Release the fix in the next version
- Credit you in the release notes (if you wish)

## Supported Versions

Only the latest version receives security updates. Please update to the latest version.

## Security Best Practices

- Always use the latest version
- Review the code before installation
- Report any suspicious behavior
```

## 📚 Training and Resources

### GitHub Learning Lab

Complete these free courses:
- [Introduction to GitHub](https://lab.github.com/githubtraining/introduction-to-github)
- [GitHub Actions](https://lab.github.com/githubtraining/github-actions)
- [Managing Merge Conflicts](https://lab.github.com/githubtraining/managing-merge-conflicts)

### Documentation

- [GitHub Docs](https://docs.github.com/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [VS Code Extension Guide](https://code.visualstudio.com/api)

### Community

- [GitHub Community Forum](https://github.community/)
- [GitHub Discussions](https://github.com/orgs/community/discussions)
- [GitHub Status](https://www.githubstatus.com/)

## 🎯 Next Steps

### Immediate (Today)

1. ✅ **Repository is set up** with all necessary files
2. [ ] **Enable GitHub Pages** in repository settings
3. [ ] **Set up VSCE_PAT secret** for Marketplace publishing
4. [ ] **Test the build workflow** by pushing a small change
5. [ ] **Verify GitHub Actions** are running correctly

### This Week

1. [ ] **Create first release** (v1.0.0)
2. [ ] **Publish to VS Code Marketplace**
3. [ ] **Set up documentation site** on GitHub Pages
4. [ ] **Create issue labels** and milestones
5. [ ] **Enable Discussions** for community engagement

### This Month

1. [ ] **Monitor first users** and gather feedback
2. [ ] **Fix any initial bugs** reported by users
3. [ ] **Plan v1.1.0** with new features
4. [ ] **Set up analytics** for tracking usage
5. [ ] **Launch marketing campaign**

## 🙏 Support

### Getting Help

- **GitHub Issues**: [https://github.com/abidinfocrat/Mistral/issues](https://github.com/abidinfocrat/Mistral/issues)
- **GitHub Discussions**: [https://github.com/abidinfocrat/Mistral/discussions](https://github.com/abidinfocrat/Mistral/discussions)
- **Documentation**: [https://abidinfocrat.github.io/Mistral/markdown-editor-extension/](https://abidinfocrat.github.io/Mistral/markdown-editor-extension/)

### Contributing

- **Contributing Guide**: [CONTRIBUTING.md](https://github.com/abidinfocrat/Mistral/blob/main/markdown-editor-extension/.github/CONTRIBUTING.md)
- **Code of Conduct**: [CODE_OF_CONDUCT.md](https://github.com/abidinfocrat/Mistral/blob/main/markdown-editor-extension/.github/CODE_OF_CONDUCT.md)

## 📝 Checklist

### Repository Setup
- [x] Repository created on GitHub
- [x] All source files committed
- [x] GitHub workflows configured
- [x] Issue templates created
- [x] Pull request template created
- [x] Code of Conduct added
- [x] Contributing guide added
- [x] Main README updated
- [ ] GitHub Pages enabled
- [ ] VSCE_PAT secret configured

### Development
- [x] Extension code complete
- [x] Build scripts created
- [x] Test scripts created
- [x] Deploy scripts created
- [ ] Local testing completed
- [ ] All features verified

### Documentation
- [x] README.md complete
- [x] SETUP_GUIDE.md complete
- [x] CHANGELOG.md created
- [x] Business documents created
- [ ] GitHub Pages deployed
- [ ] Documentation tested

### Publishing
- [ ] First release created (v1.0.0)
- [ ] VS Code Marketplace publisher account created
- [ ] Extension published to Marketplace
- [ ] GitHub Release created
- [ ] Marketing materials prepared

---

**Your GitHub repository is now fully configured for Markdown Editor Pro!** 🎉

The complete infrastructure is in place for:
- ✅ Automated builds and testing
- ✅ Continuous deployment
- ✅ Documentation hosting
- ✅ Community management
- ✅ Issue tracking
- ✅ Release management

**Next step**: Enable GitHub Pages and set up your VSCE_PAT secret to start publishing releases automatically!
