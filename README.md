# aiRonin Browse MCP Server

A Model Context Protocol (MCP) server for browser automation with headed Chrome support.

## 🚀 Quick Start

### For Local Development:

```bash
# Install dependencies
npm install

# Start the server
npm start
```

### For Production/End Users:

```bash
# Use npx (works everywhere)
npx --yes aironin-browse-mcp@1.2.2
```

### For Dev Containers:

```bash
# Install the package globally
npm install -g aironin-browse-mcp@1.2.7

# Or use npx (recommended)
npx --yes aironin-browse-mcp@1.2.7
```

**Note**: The puppeteer-chromium-resolver installation issue has been fixed in version 1.2.7+.

## 📋 MCP Configuration

Add this to your MCP configuration:

```json
{
  "mcpServers": {
    "aironin-browse": {
      "command": "npx",
      "args": ["--yes", "aironin-browse-mcp@latest"],
      "env": {
        "NODE_ENV": "production",
        "REMOTE_BROWSER_ENABLED": "true",
        "SCREENSHOT_QUALITY": "75",
        "BROWSER_VIEWPORT_SIZE": "900x600",
        "BROWSER_NAVIGATION_TIMEOUT": "15000"
      }
    }
  }
}
```

## 🔧 Available Tools

- `launch_browser`: Launch browser and navigate to URL
- `click_element`: Click at specified coordinates
- `type_text`: Type text into the browser
- `scroll_page`: Scroll the page up or down
- `hover_element`: Hover at specified coordinates
- `resize_browser`: Resize browser window
- `take_screenshot`: Take a screenshot for AI agent analysis
- `capture_page`: Capture a full page screenshot
- `save_screenshot`: Take and save a screenshot to disk
- `analyze_page`: Analyze the current page content
- `close_browser`: Close the browser

## 🌐 Remote Browser Support

The server automatically detects and uses:

- Local Chrome instances
- Remote Chrome instances (including Docker host)
- Headed Chrome for visibility

## 🔧 Troubleshooting

### "No tools available" or "No server info found"

1. Restart your MCP client (Cursor/Continue)
2. Check that Node.js version is 20.0.0 or higher
3. Verify the server is running: `npx --yes aironin-browse-mcp@1.2.2`

### Dev Container Issues

1. Use the latest version: `npx --yes aironin-browse-mcp@1.2.7`
2. The server will automatically use your host Chrome

### Permission Issues

- Use `npx --yes` to avoid prompts
- For global install: `sudo npm install -g aironin-browse-mcp@1.2.7`

## 📦 Installation

### Prerequisites

- Node.js 20.0.0 or higher
- Chrome/Chromium (will be detected automatically)

### Development Setup

```bash
git clone <repository>
cd aironin-browse-mcp
npm install
npm run build
npm start
```

## 🏗️ Building

```bash
npm run build
```

## 🧪 Testing

```bash
npm test
```

## 📄 License

MIT
