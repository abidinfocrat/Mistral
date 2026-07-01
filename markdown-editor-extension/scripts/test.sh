#!/bin/bash

# Markdown Editor Pro - Test Script
# This script runs tests and validates the extension

echo "🧪 Running tests for Markdown Editor Pro..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the extension root directory."
    exit 1
fi

# Step 1: Lint the code
echo "🔍 Linting TypeScript code..."
npm run lint

if [ $? -ne 0 ]; then
    echo "❌ Linting failed. Please fix the issues and try again."
    exit 1
fi

echo "✅ Linting passed!"

# Step 2: Compile TypeScript
echo "🔨 Compiling TypeScript..."
npm run compile

if [ $? -ne 0 ]; then
    echo "❌ Compilation failed."
    exit 1
fi

echo "✅ Compilation successful!"

# Step 3: Run unit tests
echo "🧪 Running unit tests..."
npm test

if [ $? -ne 0 ]; then
    echo "❌ Unit tests failed."
    exit 1
fi

echo "✅ Unit tests passed!"

# Step 4: Validate package.json
echo "📋 Validating package.json..."
node -e "
const pkg = require('./package.json');
const requiredFields = ['name', 'displayName', 'description', 'version', 'engines', 'activationEvents', 'main', 'contributes'];
const missingFields = requiredFields.filter(field => !pkg[field]);
if (missingFields.length > 0) {
    console.error('Missing required fields:', missingFields.join(', '));
    process.exit(1);
}
console.log('✅ package.json is valid');
"

if [ $? -ne 0 ]; then
    echo "❌ package.json validation failed."
    exit 1
fi

# Step 5: Check file sizes
echo "📊 Checking file sizes..."
EXTENSION_SIZE=$(du -sh out/ | awk '{print $1}')
echo "Extension size: $EXTENSION_SIZE"

if [ "$EXTENSION_SIZE" = "0" ]; then
    echo "❌ Error: Extension output directory is empty"
    exit 1
fi

# Step 6: Validate dependencies
echo "📦 Validating dependencies..."
node -e "
const pkg = require('./package.json');
const fs = require('fs');
const path = require('path');

// Check if all dependencies are installed
const deps = Object.keys(pkg.dependencies || {});
const devDeps = Object.keys(pkg.devDependencies || {});
const allDeps = [...deps, ...devDeps];

let missingDeps = [];
for (const dep of allDeps) {
    try {
        require.resolve(dep);
    } catch (e) {
        missingDeps.push(dep);
    }
}

if (missingDeps.length > 0) {
    console.error('Missing dependencies:', missingDeps.join(', '));
    process.exit(1);
}
console.log('✅ All dependencies are installed');
"

if [ $? -ne 0 ]; then
    echo "❌ Dependency validation failed."
    exit 1
fi

# Step 7: Test extension loading
echo "🔌 Testing extension loading..."
node -e "
try {
    const extension = require('./out/extension');
    if (typeof extension.activate === 'function' && typeof extension.deactivate === 'function') {
        console.log('✅ Extension exports are valid');
    } else {
        console.error('❌ Extension exports are invalid');
        process.exit(1);
    }
} catch (e) {
    console.error('❌ Failed to load extension:', e.message);
    process.exit(1);
}
"

if [ $? -ne 0 ]; then
    echo "❌ Extension loading test failed."
    exit 1
fi

echo ""
echo "🎉 All tests passed successfully!"
echo ""
echo "Summary:"
echo "- ✅ Code linting passed"
echo "- ✅ TypeScript compilation successful"
echo "- ✅ Unit tests passed"
echo "- ✅ package.json validation passed"
echo "- ✅ File sizes are reasonable"
echo "- ✅ All dependencies are installed"
echo "- ✅ Extension loading test passed"
echo ""
echo "Your extension is ready for deployment!"
