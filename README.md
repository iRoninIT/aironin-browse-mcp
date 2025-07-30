# aiRonin Browse MCP Server

A Model Context Protocol (MCP) server for browser automation with **headed Chrome support** - perfect for AI agents that communicate via MCP.

## 🎯 Why This MCP Server?

- **MCP Compliant**: Works with any MCP client
- **Headed Mode**: See the browser in action for debugging
- **Real-time Visibility**: Watch AI agents interact with web pages
- **Standardized Interface**: Uses MCP protocol for tool communication
- **Smart Tab Management**: Handles multiple tabs and domains intelligently

## 📋 Prerequisites

- **Node.js**: 20.0.0 or higher
- **pnpm**: 10.0.0 or higher (recommended) or npm
- **Chrome/Chromium**: Will be downloaded automatically
- **MCP Client**: Any MCP-compatible AI agent

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

### Basic Usage

1. **Build the server**:

   ```bash
   pnpm build
   ```

2. **Configure in your MCP client**:

   ```json
   {
     "mcpServers": {
       "aironin-browse": {
         "command": "node",
         "args": ["/path/to/aironin-browse-mcp/dist/server.js"]
       }
     }
   }
   ```

3. **Use the tools** in your MCP client:
   ```json
   {
     "name": "test_browser",
     "arguments": {
       "url": "https://example.com"
     }
   }
   ```

## 📖 Available Tools

### `test_browser`

Test browser connection and functionality.

**Parameters**:

- `url` (optional): URL to test navigation with (default: "https://example.com")

**Example**:

```json
{
  "name": "test_browser",
  "arguments": {
    "url": "https://google.com"
  }
}
```

### `launch_browser`

Launch browser and navigate to URL.

**Parameters**:

- `url` (required): URL to navigate to

**Example**:

```json
{
  "name": "launch_browser",
  "arguments": {
    "url": "https://example.com"
  }
}
```

### `click_element`

Click at specified coordinates.

**Parameters**:

- `coordinates` (required): Coordinates in format "x,y"

**Example**:

```json
{
  "name": "click_element",
  "arguments": {
    "coordinates": "200,300"
  }
}
```

### `type_text`

Type text into the browser.

**Parameters**:

- `text` (required): Text to type

**Example**:

```json
{
  "name": "type_text",
  "arguments": {
    "text": "Hello World"
  }
}
```

### `scroll_page`

Scroll the page up or down.

**Parameters**:

- `direction` (required): "up" or "down"

**Example**:

```json
{
  "name": "scroll_page",
  "arguments": {
    "direction": "down"
  }
}
```

### `hover_element`

Hover at specified coordinates.

**Parameters**:

- `coordinates` (required): Coordinates in format "x,y"

**Example**:

```json
{
  "name": "hover_element",
  "arguments": {
    "coordinates": "200,300"
  }
}
```

### `resize_browser`

Resize browser window.

**Parameters**:

- `size` (required): Size in format "width,height"

**Example**:

```json
{
  "name": "resize_browser",
  "arguments": {
    "size": "1200,800"
  }
}
```

### `close_browser`

Close the browser.

**Parameters**: None

**Example**:

```json
{
  "name": "close_browser",
  "arguments": {}
}
```

## 🔧 Configuration

### Environment Variables

You can configure the server using environment variables:

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

2. Set environment variables:

   ```bash
   export REMOTE_BROWSER_ENABLED=true
   export REMOTE_BROWSER_HOST=http://localhost:9222
   ```

3. Configure in your MCP client with the environment variables set.

## 🧪 Testing the Server

### Manual Testing

You can test the server manually:

```bash
# Build the server
pnpm build

# Test with a simple MCP client
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {}}' | node dist/server.js
```

### Integration Testing

Test with your MCP client:

1. Configure the server in your MCP client
2. Use the `test_browser` tool to verify functionality
3. Try basic operations like `launch_browser` and `click_element`

## 🔍 Troubleshooting

### Common Issues

1. **Server not starting**:

   - Check Node.js version (requires 20.0.0+)
   - Verify all dependencies are installed
   - Check file permissions

2. **Chrome not launching**:

   - Ensure sufficient disk space for Chromium download
   - Check internet connection for Chromium download
   - Verify Chrome/Chromium is not already running in debug mode

3. **MCP client connection fails**:

   - Verify the server path in MCP client configuration
   - Check that the server builds successfully
   - Ensure the server has execute permissions

4. **Remote connection fails**:
   - Verify Chrome is running with `--remote-debugging-port=9222`
   - Check firewall settings
   - Ensure correct host URL

### Debug Mode

Enable debug logging:

```bash
DEBUG=aironin-browse* node dist/server.js
```

### Getting Help

Check the server logs for detailed error messages:

```bash
node dist/server.js 2>&1 | tee server.log
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
│   ├── server.ts              # Main MCP server entry point
│   └── browser/
│       ├── BrowserSession.ts      # Core browser automation
│       └── browserDiscovery.ts    # Browser discovery utilities
├── dist/                     # Built files
├── package.json
└── tsconfig.json
```

### Adding New Tools

1. Add tool handler to `src/server.ts`:

   ```typescript
   case "my_tool": {
     const { param } = args as { param: string }
     // Tool implementation
     return {
       content: [{ type: "text", text: "Result" }],
       isError: false
     }
   }
   ```

2. Add tool definition to `tools/list` handler:

   ```typescript
   {
     name: "my_tool",
     description: "My new tool",
     inputSchema: {
       type: "object",
       properties: {
         param: {
           type: "string",
           description: "Parameter description"
         }
       },
       required: ["param"]
     }
   }
   ```

3. Rebuild:
   ```bash
   pnpm build
   ```

## 📦 API Reference

### Server Configuration

The MCP server is configured with:

```typescript
const server = new Server(
  {
    name: "aironin-browse-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);
```

### Tool Response Format

All tools return responses in this format:

```typescript
{
  content: [
    {
      type: "text",
      text: "Tool result message"
    }
  ],
  isError: boolean
}
```

### Error Handling

Tools handle errors gracefully:

```typescript
try {
  // Tool implementation
  return {
    content: [{ type: "text", text: "Success" }],
    isError: false,
  };
} catch (error) {
  return {
    content: [
      {
        type: "text",
        text: `Error: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
    ],
    isError: true,
  };
}
```

## 🤝 MCP Client Integration

### Popular MCP Clients

This server works with any MCP-compatible client:

- **Continue**: AI coding assistant
- **Cursor**: AI-powered code editor
- **Claude Desktop**: Anthropic's desktop app
- **Custom MCP clients**

### Configuration Examples

**Continue**:

```json
{
  "mcpServers": {
    "aironin-browse": {
      "command": "node",
      "args": ["/path/to/aironin-browse-mcp/dist/server.js"]
    }
  }
}
```

**Cursor**:

```json
{
  "mcpServers": {
    "aironin-browse": {
      "command": "node",
      "args": ["/path/to/aironin-browse-mcp/dist/server.js"]
    }
  }
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

**aiRonin Browse MCP Server** is developed by **AI Ronin**.

**aiRonin.us** is a software development company specializing in AI-powered tools and automation solutions.

## 🆘 Support

For issues and questions:

- Open an issue on the repository
- Check the troubleshooting section
- Review the MCP client configuration

---

**Ready to integrate browser automation into your MCP workflow!** 🎯
