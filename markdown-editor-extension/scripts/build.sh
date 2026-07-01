#!/bin/bash

# Markdown Editor Pro - Build Script
# This script compiles the TypeScript code and prepares the extension for distribution

echo "🚀 Starting build process for Markdown Editor Pro..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the extension root directory."
    exit 1
fi

# Step 1: Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf out/
rm -rf *.vsix

# Step 2: Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install dependencies"
    exit 1
fi

# Step 3: Compile TypeScript
echo "🔨 Compiling TypeScript..."
npm run compile

if [ $? -ne 0 ]; then
    echo "❌ Error: TypeScript compilation failed"
    exit 1
fi

# Step 4: Copy web assets
echo "📁 Copying web assets..."
mkdir -p out/
cp src/preview.js out/
cp src/preview.css out/

# Step 5: Check if vsce is installed
echo "🔍 Checking for vsce (VS Code Extension Manager)..."
if ! command -v vsce &> /dev/null; then
    echo "📥 vsce not found. Installing..."
    npm install -g @vscode/vsce
fi

# Step 6: Package the extension
echo "📦 Packaging extension..."
vsce package

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Extension package created: $(ls *.vsix 2>/dev/null | head -1)"
    echo ""
    echo "Next steps:"
    echo "1. Test the extension: code --install-extension markdown-editor-pro-*.vsix"
    echo "2. Publish to Marketplace: vsce publish"
    echo "3. Or distribute the .vsix file directly"
else
    echo "❌ Error: Failed to package extension"
    exit 1
fi
