#!/bin/bash

# aiRonin Browse MCP Installation Script
# This script installs the MCP server for use with Cursor, Continue, or other MCP clients

set -e

echo "🚀 Installing aiRonin Browse MCP Server..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20.0.0 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Node.js version 20.0.0 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Create installation directory
INSTALL_DIR="$HOME/.aironin-browse-mcp"
mkdir -p "$INSTALL_DIR"

echo "📦 Installing dependencies..."

# Check for package manager preference
if command -v npm &> /dev/null; then
    echo "📦 Installing with npm (default)..."
    
    # Install dependencies without Puppeteer first
    npm install --ignore-scripts --no-optional
    
    # Install Puppeteer separately with flags to avoid Chromium download issues
    echo "📦 Installing Puppeteer (this may take a while)..."
    npm install puppeteer --ignore-scripts --no-optional || {
        echo "⚠️  Puppeteer installation failed, but continuing..."
        echo "The MCP server will work with remote browsers or when Chrome is available"
    }
    
elif command -v pnpm &> /dev/null; then
    echo "📦 Installing with pnpm (alternative)..."
    
    # Install dependencies without Puppeteer first
    pnpm install --ignore-scripts --no-optional
    
    # Install Puppeteer separately
    echo "📦 Installing Puppeteer (this may take a while)..."
    pnpm add puppeteer --ignore-scripts --no-optional || {
        echo "⚠️  Puppeteer installation failed, but continuing..."
        echo "The MCP server will work with remote browsers or when Chrome is available"
    }
else
    echo "❌ Neither npm nor pnpm found. Please install Node.js (includes npm) or pnpm."
    exit 1
fi

echo "✅ Installation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Add the following to your MCP configuration (.cursor/mcp.json or ~/.continue/config.json):"
echo ""
echo "Using npm (default):"
echo '{'
echo '  "mcpServers": {'
echo '    "aironin-browse": {'
echo '      "command": "npx",'
echo '      "args": ["--yes", "aironin-browse-mcp"]'
echo '    }'
echo '  }'
echo '}'
echo ""
echo "Using pnpm (alternative):"
echo '{'
echo '  "mcpServers": {'
echo '    "aironin-browse": {'
echo '      "command": "pnpm",'
echo '      "args": ["dlx", "aironin-browse-mcp"]'
echo '    }'
echo '  }'
echo '}'
echo ""
echo "2. Restart your MCP client (Cursor, Continue, etc.)"
echo "3. The MCP server should now be available with browser automation tools"
echo ""
echo "🔧 For troubleshooting, run: aironin-browse-mcp --help" 
