# Installation Guide: aiRonin Browse MCP

## Quick Installation

The MCP server is available as an npm package and will be automatically downloaded when you use it.

### Option 1: npx (Default)

Add this to your MCP configuration:

```json
{
  "mcpServers": {
    "aironin-browse": {
      "command": "npx",
      "args": ["--yes", "aironin-browse-mcp"],
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

### Option 2: pnpm dlx (Alternative)

Add this to your MCP configuration:

```json
{
  "mcpServers": {
    "aironin-browse": {
      "command": "pnpm",
      "args": ["dlx", "aironin-browse-mcp"],
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

## Prerequisites

- **Node.js**: 20.0.0 or higher
- **Package Manager**:
  - **npm**: 9.0.0 or higher (default)
  - **pnpm**: 10.0.0 or higher (alternative)
- **Chrome/Chromium**: Will be downloaded automatically
- **Cursor/Continue**: MCP-compatible AI agent

## Configuration

### Cursor Configuration

Create or update `.cursor/mcp.json`:

**Using npm (default):**

```json
{
  "mcpServers": {
    "aironin-browse": {
      "command": "npx",
      "args": ["--yes", "aironin-browse-mcp"],
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

**Using pnpm (alternative):**

```json
{
  "mcpServers": {
    "aironin-browse": {
      "command": "pnpm",
      "args": ["dlx", "aironin-browse-mcp"],
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

### Continue Configuration

Create or update `~/.continue/config.json`:

**Using npm (default):**

```json
{
  "mcpServers": {
    "aironin-browse": {
      "command": "npx",
      "args": ["--yes", "aironin-browse-mcp"],
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

**Using pnpm (alternative):**

```json
{
  "mcpServers": {
    "aironin-browse": {
      "command": "pnpm",
      "args": ["dlx", "aironin-browse-mcp"],
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

## Available Tools

Once installed, you'll have access to these browser automation tools:

### Browser Control

- `launch_browser` - Launch browser and navigate to URL
- `click_element` - Click at specified coordinates
- `type_text` - Type text into the browser
- `scroll_page` - Scroll the page up or down
- `hover_element` - Hover at specified coordinates
- `resize_browser` - Resize browser window
- `close_browser` - Close the browser

### Screenshot Analysis

- `take_screenshot` - Take screenshot for AI analysis
- `save_screenshot` - Save screenshot to disk
- `analyze_page` - Analyze page content for AI understanding

## Usage Examples

### Basic Browser Automation

```typescript
// Launch browser and navigate
await launch_browser({ url: "https://example.com" });

// Click on an element
await click_element({ coordinates: "200,300" });

// Type text
await type_text({ text: "Hello World" });

// Take screenshot for analysis
await take_screenshot({ quality: 85 });

// Close browser
await close_browser({});
```

### Screenshot Analysis

```typescript
// Take screenshot for AI analysis
await take_screenshot({ quality: 90 });

// Analyze page content
await analyze_page({ includeScreenshot: true });

// Save screenshot to disk
await save_screenshot({ filename: "result", quality: 85 });
```

## Troubleshooting

### Installation Issues

1. **Package manager not found**:

   ```bash
   # npm comes bundled with Node.js (default)
   # npm should be available with Node.js installation

   # Or install pnpm (alternative)
   npm install -g pnpm
   ```

2. **Permission denied**:

   ```bash
   # Check permissions
   ls -la ~/.cursor/mcp.json
   chmod 644 ~/.cursor/mcp.json
   ```

3. **MCP server not starting**:
   ```bash
   # Test direct execution (choose one)
   npx --yes aironin-browse-mcp  # Using npm (default)
   pnpm dlx aironin-browse-mcp   # Using pnpm (alternative)
   ```

### Browser Issues

1. **Chrome not launching**:

   - Ensure sufficient disk space
   - Check internet connection
   - Verify Chrome is not already running

2. **Remote browser connection fails**:
   - Start Chrome with: `chrome --remote-debugging-port=9222`
   - Check firewall settings

### Common Errors

1. **"Command not found"**:

   - Restart Cursor after configuration changes
   - Verify your package manager is installed and in PATH
   - For npm: `which npm` (should be available with Node.js)
   - For pnpm: `which pnpm`

2. **"MCP server failed to start"**:

   - Check Node.js version (requires 20.0.0+)
   - Verify all dependencies are installed

3. **"No tools available" or "No prompts"**:

   - Restart your MCP client (Cursor, Continue, etc.) after adding configuration
   - Check that the MCP server is starting correctly in the logs
   - Verify the configuration syntax is correct (no extra commas, proper JSON)
   - Try the development configuration if production doesn't work
   - Check that Node.js 20.0.0+ is installed and available

4. **"Browser automation failed"**:
   - Check Chrome/Chromium installation
   - Verify sufficient system resources

## Verification

To verify your installation is working:

1. **Test the MCP server directly**:

   ```bash
   # Using npm (default)
   npx --yes aironin-browse-mcp

   # Using pnpm (alternative)
   pnpm dlx aironin-browse-mcp
   ```

2. **Check your MCP client logs** for any error messages

3. **Restart your MCP client** (Cursor, Continue, etc.) after adding the configuration

4. **Look for browser automation tools** in your AI agent's available tools

## Support

- **Issues**: [GitHub Issues](https://github.com/iRoninIT/aironin-browse-mcp/issues)
- **Documentation**: [README.md](README.md)
- **Discussions**: [GitHub Discussions](https://github.com/iRoninIT/aironin-browse-mcp/discussions)

## Updates

To update to the latest version:

```bash
# For pnpm dlx installation (automatic)
# Just restart your MCP client - it will use the latest version

# For npx installation (automatic)
# Just restart your MCP client - it will use the latest version

# For global npm installation
npm update -g aironin-browse-mcp
```

Then restart your MCP client (Cursor, Continue, etc.).
