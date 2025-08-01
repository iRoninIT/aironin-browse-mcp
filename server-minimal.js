#!/usr/bin/env node

// Ultra-minimal MCP server that works without any dependencies
// This is used as a fallback when core dependencies are missing

console.error("🔧 aiRonin Browse MCP Server (Emergency Minimal Mode)");
console.error("⚠️  Core dependencies are missing - unable to start MCP server");
console.error("");
console.error("📦 To fix this issue:");
console.error("   npm install @modelcontextprotocol/sdk@^1.9.0 zod@^3.22.0");
console.error("   npm install aironin-browse-core@^1.1.2");
console.error("");
console.error("🚀 Then restart with: node server.js");
console.error("");
console.error("📋 This package provides browser automation tools for MCP clients");
console.error("   like Cursor, Continue, and other AI assistants.");

// Simple JSON-RPC handler for basic responses
process.stdin.on('data', (data) => {
  try {
    const request = JSON.parse(data.toString());
    
    if (request.method === 'initialize') {
      const response = {
        jsonrpc: "2.0",
        id: request.id,
        result: {
          protocolVersion: "2024-11-05",
          capabilities: {
            tools: {
              listChanged: false
            }
          },
          serverInfo: {
            name: "aironin-browse-mcp",
            version: "1.2.11"
          }
        }
      };
      console.log(JSON.stringify(response));
    } else if (request.method === 'tools/list') {
      const response = {
        jsonrpc: "2.0",
        id: request.id,
        result: {
          tools: [
            {
              name: "install_dependencies",
              title: "Install Dependencies",
              description: "Instructions to install missing dependencies",
              inputSchema: {
                type: "object",
                properties: {},
                additionalProperties: false
              }
            }
          ]
        }
      };
      console.log(JSON.stringify(response));
    } else if (request.method === 'tools/call' && request.params?.name === 'install_dependencies') {
      const response = {
        jsonrpc: "2.0",
        id: request.id,
        result: {
          content: [
            {
              type: "text",
              text: "🔧 aiRonin Browse MCP Server - Missing Dependencies\n\n" +
                    "The server is running in emergency minimal mode because core dependencies are missing.\n\n" +
                    "📦 To install missing dependencies:\n" +
                    "```bash\n" +
                    "npm install @modelcontextprotocol/sdk@^1.9.0 zod@^3.22.0\n" +
                    "npm install aironin-browse-core@^1.1.2\n" +
                    "```\n\n" +
                    "🚀 After installation, restart with:\n" +
                    "```bash\n" +
                    "node server.js\n" +
                    "```\n\n" +
                    "📋 Once dependencies are installed, you'll have access to:\n" +
                    "- Browser automation tools\n" +
                    "- Screenshot capture\n" +
                    "- Page interaction (click, type, scroll)\n" +
                    "- Remote browser support for dev containers\n\n" +
                    "✅ This emergency mode ensures the server doesn't crash completely when dependencies are missing."
            }
          ]
        }
      };
      console.log(JSON.stringify(response));
    } else {
      // Generic error response
      const response = {
        jsonrpc: "2.0",
        id: request.id || null,
        error: {
          code: -32601,
          message: "Method not found - dependencies missing",
          data: "Install dependencies with: npm install @modelcontextprotocol/sdk@^1.9.0 zod@^3.22.0 aironin-browse-core@^1.1.2"
        }
      };
      console.log(JSON.stringify(response));
    }
  } catch (error) {
    // Invalid JSON or other error
    const response = {
      jsonrpc: "2.0",
      id: null,
      error: {
        code: -32700,
        message: "Parse error",
        data: "Invalid JSON-RPC request"
      }
    };
    console.log(JSON.stringify(response));
  }
});

// Keep the process alive
process.stdin.resume();
