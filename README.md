# aiRonin Browse MCP Server

A Model Context Protocol (MCP) server for browser automation with **headed Chrome support** - perfect for AI agents that need to see what they're doing in real-time.

## 🎯 Why This MCP Server?

- **AI Agent Optimized**: Screenshot analysis and visual feedback for AI decision-making
- **Remote Browser Detection**: Automatically finds and uses remote browsers when available
- **Headed Mode**: Unlike headless automation, you can see the browser in action
- **Real-time Visibility**: Watch AI agents interact with web pages
- **Better Debugging**: Screenshots and console logs help debug issues
- **Smart Tab Management**: Handles multiple tabs and domains intelligently

## 📋 Prerequisites

- **Node.js**: 20.0.0 or higher
- **pnpm**: 10.0.0 or higher (recommended) or npm
- **Chrome/Chromium**: Will be downloaded automatically

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/iRoninIT/aironin-browse-mcp.git
cd aironin-browse-mcp

# Install dependencies
pnpm install

# Build the server
pnpm build
```

### Configuration

#### Production Configuration (Published Package)

For production use with the published npm package:

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

#### Development Configuration (Local Build)

For development with local changes:

```json
{
  "mcpServers": {
    "aironin-browse": {
      "command": "node",
      "args": ["aironin-browse-mcp/dist/server.js"],
      "env": {
        "NODE_ENV": "development",
        "REMOTE_BROWSER_ENABLED": "true",
        "SCREENSHOT_QUALITY": "75",
        "BROWSER_VIEWPORT_SIZE": "900x600",
        "BROWSER_NAVIGATION_TIMEOUT": "15000"
      }
    }
  }
}
```

#### Alternative Development Configuration (with pnpm)

If you prefer using pnpm for development:

```json
{
  "mcpServers": {
    "aironin-browse": {
      "command": "pnpm",
      "args": ["run", "start"],
      "cwd": "aironin-browse-mcp",
      "env": {
        "NODE_ENV": "development",
        "REMOTE_BROWSER_ENABLED": "true",
        "SCREENSHOT_QUALITY": "75",
        "BROWSER_VIEWPORT_SIZE": "900x600",
        "BROWSER_NAVIGATION_TIMEOUT": "15000"
      }
    }
  }
}
```

**Note**: Use the development configuration when working on local changes or testing new features. The production configuration uses the published package from npm.

#### Configuration Parameters

All parameters can be set via the `env` section in your MCP configuration:

| Parameter                    | Default        | Description                                  |
| ---------------------------- | -------------- | -------------------------------------------- |
| `REMOTE_BROWSER_ENABLED`     | `"true"`       | Enable/disable remote browser detection      |
| `REMOTE_BROWSER_HOST`        | `""`           | Custom remote browser host URL (optional)    |
| `SCREENSHOT_QUALITY`         | `"75"`         | Default screenshot quality (1-100)           |
| `BROWSER_VIEWPORT_SIZE`      | `"900x600"`    | Default browser viewport size                |
| `BROWSER_NAVIGATION_TIMEOUT` | `"15000"`      | Navigation timeout in milliseconds           |
| `NODE_ENV`                   | `"production"` | Node.js environment (development/production) |

**Example with all parameters**:

```json
{
  "mcpServers": {
    "aironin-browse": {
      "command": "node",
      "args": ["aironin-browse-mcp/dist/server.js"],
      "env": {
        "NODE_ENV": "development",
        "REMOTE_BROWSER_ENABLED": "true",
        "REMOTE_BROWSER_HOST": "http://localhost:9222",
        "SCREENSHOT_QUALITY": "90",
        "BROWSER_VIEWPORT_SIZE": "1200x800",
        "BROWSER_NAVIGATION_TIMEOUT": "20000"
      }
    }
  }
}
```

#### Configuration File Locations

**Cursor**:

- `.cursor/mcp.json`

**Continue**:

- `~/.continue/config.json`

**Other MCP Clients**:

- Check your MCP client documentation for the correct configuration file location

#### Troubleshooting Configuration

**Common Issues**:

1. **MCP Server not starting**:

   - Ensure Node.js 20.0.0+ is installed
   - Verify the path to `dist/server.js` exists (for development)
   - Check that `pnpm` is available in PATH (for production)

2. **Development vs Production**:

   - Development: Uses local build at `aironin-browse-mcp/dist/server.js`
   - Production: Downloads from npm registry

3. **Restart Required**:
   - After changing configuration, restart your MCP client (Cursor, Continue, etc.)
   - New tools may require a restart to become available

## 📖 Available Tools

### Browser Control Tools

#### `launch_browser`

Launch browser and navigate to URL.

**Parameters:**

- `url` (required): URL to navigate to
- `remote` (optional): Force remote browser connection (default: auto-detect)

**Example:**

```json
{
  "name": "launch_browser",
  "arguments": {
    "url": "https://example.com",
    "remote": false
  }
}
```

#### `click_element`

Click at specified coordinates.

**Parameters:**

- `coordinates` (required): Coordinates in format 'x,y'

**Example:**

```json
{
  "name": "click_element",
  "arguments": {
    "coordinates": "200,300"
  }
}
```

#### `type_text`

Type text into the browser.

**Parameters:**

- `text` (required): Text to type

**Example:**

```json
{
  "name": "type_text",
  "arguments": {
    "text": "Hello World"
  }
}
```

#### `scroll_page`

Scroll the page up or down.

**Parameters:**

- `direction` (optional): Scroll direction ("up" or "down", default: "down")

**Example:**

```json
{
  "name": "scroll_page",
  "arguments": {
    "direction": "down"
  }
}
```

#### `hover_element`

Hover at specified coordinates.

**Parameters:**

- `coordinates` (required): Coordinates in format 'x,y'

**Example:**

```json
{
  "name": "hover_element",
  "arguments": {
    "coordinates": "200,300"
  }
}
```

#### `resize_browser`

Resize browser window.

**Parameters:**

- `size` (required): Size in format 'width,height'

**Example:**

```json
{
  "name": "resize_browser",
  "arguments": {
    "size": "1200,800"
  }
}
```

### Screenshot Analysis Tools

#### `take_screenshot`

Take a screenshot for AI agent analysis.

**Parameters:**

- `quality` (optional): Screenshot quality (1-100, default: 75)
- `fullPage` (optional): Capture full page (default: false)

**Example:**

```json
{
  "name": "take_screenshot",
  "arguments": {
    "quality": 85,
    "fullPage": true
  }
}
```

**Use Case**: AI agents can use this to "see" what's displayed and make informed decisions about next actions. Full page capture is useful for long pages or when you need to see content below the viewport.

#### `save_screenshot`

Take and save a screenshot to disk.

**Parameters:**

- `quality` (optional): Screenshot quality (1-100, default: 75)
- `filename` (optional): Custom filename (without extension)
- `fullPage` (optional): Capture full page (default: false)

**Example:**

```json
{
  "name": "save_screenshot",
  "arguments": {
    "quality": 90,
    "filename": "login-page",
    "fullPage": true
  }
}
```

**Output**: Screenshot saved as `login-page-2024-01-15T10-30-45-123Z.webp`

#### Full Page Capture

Both screenshot tools now support full page capture via the `fullPage` parameter:

- **`fullPage: false`** (default): Captures only the visible viewport
- **`fullPage: true`**: Captures the entire page, including content below the fold

This is particularly useful for:

- Long web pages with content below the viewport
- Documentation pages that extend beyond the screen
- Social media feeds or news articles
- Any page where you need to see the complete content

#### `analyze_page`

Analyze the current page content for AI agent understanding.

**Parameters:**

- `includeScreenshot` (optional): Include screenshot data for visual analysis

**Example:**

```json
{
  "name": "analyze_page",
  "arguments": {
    "includeScreenshot": true
  }
}
```

**Use Case**: Provides page context, metadata, and structural information for AI agents to understand the current state.

#### `close_browser`

Close the browser.

**Parameters:** None

**Example:**

```json
{
  "name": "close_browser",
  "arguments": {}
}
```

## 🤖 AI Agent Integration

### Screenshot Analysis Workflow

AI agents can analyze browser displays using a comprehensive workflow:

1. **Visual Analysis**: Screenshots provide visual context of what's displayed
2. **Page Structure**: URL and console logs help understand page state
3. **Interaction Planning**: Plan clicks, typing, scrolling based on visual data
4. **Error Detection**: Console logs help identify issues
5. **State Tracking**: Current URL and mouse position for context

### Typical AI Agent Workflow

```typescript
// 1. Launch browser and navigate
await launch_browser({ url: "https://example.com" });

// 2. Take screenshot for analysis
await take_screenshot({ quality: 85 });

// 3. Analyze page structure
await analyze_page({ includeScreenshot: true });

// 4. Interact based on analysis
await click_element({ coordinates: "200,300" });
await type_text({ text: "Hello World" });

// 5. Save screenshot if needed
await save_screenshot({ filename: "result" });

// 6. Close browser when done
await close_browser({});
```

### Screenshot Data Format

All browser actions return a `BrowserActionResult` with screenshot data:

```typescript
interface BrowserActionResult {
  screenshot?: string; // Base64 data URL for AI analysis
  logs?: string; // Console logs for debugging
  currentUrl?: string; // Current page URL
  currentMousePosition?: string; // Last mouse position
}
```

## 🔧 Configuration

### Environment Variables

```bash
# Browser viewport size
export BROWSER_VIEWPORT_SIZE=1200x800

# Screenshot quality (1-100)
export SCREENSHOT_QUALITY=85

# Enable remote browser connection
export REMOTE_BROWSER_ENABLED=true

# Remote browser host URL
export REMOTE_BROWSER_HOST=http://localhost:9222
```

### Remote Browser Setup

To connect to an existing Chrome instance:

1. Start Chrome with remote debugging:

   ```bash
   chrome --remote-debugging-port=9222
   ```

2. The MCP server will automatically detect and connect to remote browsers

## 🧪 Testing

### Manual Testing

```bash
# Build the server
pnpm build

# Test with MCP client
node dist/server.js
```

### Browser Testing

For browser testing functionality, use the CLI:

```bash
# Test browser connection
aironin-browse test

# Test with custom URL
aironin-browse test --url https://google.com
```

### Integration Testing

```bash
# Run tests
pnpm test

# Watch mode
pnpm test:watch
```

## 🔍 Troubleshooting

### Common Issues

1. **Chrome not launching**:

   - Ensure sufficient disk space for Chromium download
   - Check internet connection for Chromium download
   - Verify Chrome/Chromium is not already running in debug mode

2. **Remote connection fails**:

   - Verify Chrome is running with `--remote-debugging-port=9222`
   - Check firewall settings
   - Ensure correct host URL

3. **Permission errors**:
   - Check file permissions for storage directory
   - Ensure write access to current directory

### Debug Mode

Enable debug logging:

```bash
DEBUG=aironin-browse* node dist/server.js
```

## 🛠️ Development

### Building from Source

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Run in development mode
pnpm dev

# Run tests
pnpm test

# Lint code
pnpm lint
```

### Project Structure

```
aironin-browse-mcp/
├── src/
│   └── server.ts              # Main MCP server implementation
├── dist/                      # Built files
├── package.json
└── tsconfig.json
```

### Adding New Tools

1. Add tool definition to `src/server.ts`:

   ```typescript
   server.registerTool(
     "my_tool",
     {
       title: "My Tool",
       description: "Description of my tool",
       inputSchema: {
         param1: z.string().describe("Parameter description"),
       },
     },
     async ({ param1 }) => ({
       content: [
         {
           type: "text",
           text: `Tool result: ${param1}`,
         },
       ],
     })
   );
   ```

2. Rebuild:
   ```bash
   pnpm build
   ```

## 📦 API Reference

### BrowserSession Class

The core browser automation class from `aironin-browse-core`:

```typescript
import { BrowserSession } from "aironin-browse-core";

const browser = new BrowserSession();

// Launch browser
await browser.launchBrowser();

// Navigate to URL
const result = await browser.navigateToUrl("https://example.com");

// Click at coordinates
await browser.click("200,300");

// Type text
await browser.type("Hello World");

// Scroll
await browser.scrollDown();
await browser.scrollUp();

// Close browser
await browser.closeBrowser();
```

### Return Values

All actions return a `BrowserActionResult`:

```typescript
interface BrowserActionResult {
  screenshot?: string; // Base64 encoded screenshot
  logs?: string; // Console logs
  currentUrl?: string; // Current page URL
  currentMousePosition?: string; // Last mouse position
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🏢 About

**aiRonin Browse MCP Server** is developed by **CK @ iRonin.IT**.

**iRonin.IT** is a software development company specializing in AI-powered tools and automation solutions.

## 🆘 Support

For issues and questions:

- Open an issue on the repository
- Check the troubleshooting section
- Review the configuration options

---

**Ready to automate browsers with full visibility for AI agents!** 🎯🤖
