# Installation Guide: aiRonin Browse MCP

## Quick Installation

### Option 1: pnpm dlx (Recommended)

```bash
# Add to your MCP configuration
echo '{
  "mcpServers": {
    "aironin-browse": {
      "command": "pnpm",
      "args": ["dlx", "aironin-browse-mcp"]
    }
  }
}' > .cursor/mcp.json
```

### Option 2: npx (Alternative)

```bash
# Add to your MCP configuration
echo '{
  "mcpServers": {
    "aironin-browse": {
      "command": "npx",
      "args": ["aironin-browse-mcp"]
    }
  }
}' > .cursor/mcp.json
```

## Prerequisites

- **Node.js**: 20.0.0 or higher
- **pnpm**: 10.0.0 or higher (recommended) or npm
- **Chrome/Chromium**: Will be downloaded automatically
- **Cursor/Continue**: MCP-compatible AI agent

## Configuration

### Cursor Configuration

Create or update `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "aironin-browse": {
      "command": "pnpm",
      "args": ["dlx", "aironin-browse-mcp"]
    }
  }
}
```

### Continue Configuration

Create or update `~/.continue/config.json`:

```json
{
  "mcpServers": {
    "aironin-browse": {
      "command": "pnpm",
      "args": ["dlx", "aironin-browse-mcp"]
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

1. **pnpm not found**:

   ```bash
   # Install pnpm
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
   # Test direct execution
   pnpm dlx aironin-browse-mcp
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
   - Verify pnpm is installed and in PATH

2. **"MCP server failed to start"**:

   - Check Node.js version (requires 20.0.0+)
   - Verify all dependencies are installed

3. **"Browser automation failed"**:
   - Check Chrome/Chromium installation
   - Verify sufficient system resources

## Support

- **Issues**: [GitHub Issues](https://github.com/iRoninIT/aironin-browse-mcp/issues)
- **Documentation**: [README.md](README.md)
- **Discussions**: [GitHub Discussions](https://github.com/iRoninIT/aironin-browse-mcp/discussions)

## Updates

To update to the latest version:

```bash
# For pnpm dlx installation (automatic)
# Just restart your MCP client - it will use the latest version

# For npm installation
npm update -g aironin-browse-mcp
```

Then restart your MCP client (Cursor, Continue, etc.).
