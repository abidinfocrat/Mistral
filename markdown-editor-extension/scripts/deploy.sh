#!/bin/bash

# Markdown Editor Pro - Deployment Script
# This script automates the deployment process to VS Code Marketplace and GitHub

echo "🚀 Starting deployment process for Markdown Editor Pro..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the extension root directory."
    exit 1
fi

# Check if build exists
if [ ! -f "*.vsix" ]; then
    echo "❌ Error: No .vsix file found. Please run build.sh first."
    exit 1
fi

# Get the latest vsix file
VSIX_FILE=$(ls -t *.vsix | head -1)
echo "📦 Found extension package: $VSIX_FILE"

# Step 1: Publish to VS Code Marketplace
echo "🌍 Publishing to VS Code Marketplace..."
if command -v vsce &> /dev/null; then
    vsce publish -p $VSIX_FILE
    if [ $? -eq 0 ]; then
        echo "✅ Successfully published to VS Code Marketplace"
    else
        echo "❌ Failed to publish to VS Code Marketplace"
        echo "Make sure you have a publisher account and are logged in with 'vsce login <publisher>'"
        exit 1
    fi
else
    echo "❌ vsce not found. Please install it with: npm install -g @vscode/vsce"
    exit 1
fi

# Step 2: Create GitHub release
echo "🐙 Creating GitHub release..."
if command -v gh &> /dev/null; then
    # Get version from package.json
    VERSION=$(node -p "require('./package.json').version")
    
    # Create release
    gh release create v$VERSION $VSIX_FILE --title "Markdown Editor Pro v$VERSION" --notes "Release v$VERSION"
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully created GitHub release"
    else
        echo "❌ Failed to create GitHub release"
        echo "Make sure you have GitHub CLI installed and are authenticated"
        exit 1
    fi
else
    echo "⚠️  GitHub CLI (gh) not found. Skipping GitHub release."
    echo "Install it with: brew install gh (Mac) or winget install --id GitHub.cli (Windows)"
fi

# Step 3: Update changelog
echo "📝 Updating changelog..."
DATE=$(date +"%Y-%m-%d")
VERSION=$(node -p "require('./package.json').version")

# Add new version to changelog
cat CHANGELOG.md | awk -v date="$DATE" -v version="$VERSION" '
BEGIN { print "## [" version "] - " date }
/^## \[/ { exit }
{ print }
' > CHANGELOG.new

mv CHANGELOG.new CHANGELOG.md

echo "✅ Updated changelog with version $VERSION"

# Step 4: Commit and push changes
echo "🔄 Committing and pushing changes..."
git add .
git commit -m "Release v$VERSION"
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully committed and pushed changes"
else
    echo "❌ Failed to commit and push changes"
    exit 1
fi

echo ""
echo "🎉 Deployment completed successfully!"
echo ""
echo "Summary:"
echo "- ✅ Published to VS Code Marketplace"
echo "- ✅ Created GitHub release"
echo "- ✅ Updated changelog"
echo "- ✅ Committed and pushed changes"
echo ""
echo "Your extension should now be available in the VS Code Marketplace!"
echo "It may take a few minutes to appear in search results."
