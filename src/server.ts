import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { BrowserSession, type BrowserActionResult } from "aironin-browse-core"

// Create the server
const server = new Server(
	{
		name: "aironin-browse-mcp",
		version: "1.0.0",
	},
	{
		capabilities: {
			tools: {},
		},
	},
)

// Browser session instance
let browserSession: BrowserSession | null = null

// Helper function to ensure browser is launched
async function ensureBrowserLaunched(remoteEnabled: boolean = false): Promise<BrowserSession> {
	if (!browserSession) {
		browserSession = new BrowserSession()
		
		// Set environment variables for remote browser if enabled
		if (remoteEnabled) {
			process.env.REMOTE_BROWSER_ENABLED = "true"
		}
		
		await browserSession.launchBrowser()
	}
	return browserSession
}

// Start the server
async function main() {
	const transport = new StdioServerTransport()
	await server.connect(transport)
	
	console.error("🚀 aiRonin Browse MCP Server started")
	console.error("📋 Available tools:")
	console.error("  - test_browser: Test browser connection and functionality")
	console.error("  - launch_browser: Launch browser and navigate to URL")
	console.error("  - click_element: Click at specified coordinates")
	console.error("  - type_text: Type text into the browser")
	console.error("  - scroll_page: Scroll the page up or down")
	console.error("  - hover_element: Hover at specified coordinates")
	console.error("  - resize_browser: Resize browser window")
	console.error("  - close_browser: Close the browser")
	console.error("🔧 Remote browser support: Set remote=true in tool arguments")
}

main().catch(console.error) 
