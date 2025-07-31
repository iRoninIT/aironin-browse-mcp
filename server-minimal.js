#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Create the server
const server = new McpServer({
  name: "aironin-browse-mcp",
  version: "1.0.0",
});

// Register a simple test tool
server.registerTool(
  "test_browser",
  {
    title: "Test Browser",
    description: "Test browser connection and functionality",
    inputSchema: {}
  },
  async () => {
    return {
      content: [
        {
          type: "text",
          text: `✅ MCP Server is working!\n\n` +
            `The server is running and responding to requests.\n` +
            `Browser automation tools will be available once dependencies are properly installed.\n\n` +
            `To install browser dependencies:\n` +
            `npm install @modelcontextprotocol/sdk@^1.9.0 aironin-browse-core@^1.0.0 zod@^3.22.0 --ignore-scripts --no-optional`
        }
      ]
    };
  }
);

server.registerTool(
  "launch_browser",
  {
    title: "Launch Browser",
    description: "Launch browser and navigate to URL",
    inputSchema: {
      url: { type: "string", description: "URL to navigate to" }
    }
  },
  async ({ url }) => {
    return {
      content: [
        {
          type: "text",
          text: `🚀 Browser launch requested for: ${url}\n\n` +
            `Note: Browser automation requires additional dependencies.\n` +
            `Please install: npm install aironin-browse-core@^1.0.0 --ignore-scripts --no-optional`
        }
      ]
    };
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  console.error("🚀 aiRonin Browse MCP Server started (minimal mode)");
  console.error("📋 Available tools:");
  console.error("  - test_browser: Test browser connection and functionality");
  console.error("  - launch_browser: Launch browser and navigate to URL");
  console.error("⚠️  Browser automation requires additional dependencies");
  console.error("   Install: npm install aironin-browse-core@^1.0.0 --ignore-scripts --no-optional");
}

 