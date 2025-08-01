import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"

// Try to import browser dependencies, but don't fail if they're not available
let BrowserSession: any = null
let discoverChromeHostUrl: any = null

try {
	const browserModule = await import("aironin-browse-core")
	BrowserSession = browserModule.BrowserSession
	discoverChromeHostUrl = browserModule.discoverChromeHostUrl
} catch (error) {
	// Browser dependencies not available, but we can still provide the MCP server
	console.error("Browser dependencies not available. Install with: npm install aironin-browse-core@^1.1.2")
}

// Create the server
const server = new McpServer({
	name: "aironin-browse-mcp",
	version: "1.0.0",
})

// Browser session instance
let browserSession: any = null

// Configuration helper function
function getConfigValue(key: string, defaultValue: string): string {
	return process.env[key] || defaultValue
}

// Helper function to ensure browser is launched with remote detection
async function ensureBrowserLaunched(forceRemote: boolean = false): Promise<any> {
	if (!BrowserSession) {
		throw new Error("Browser dependencies not available. Please install: npm install aironin-browse-core@^1.1.2")
	}
	
	if (!browserSession) {
		browserSession = new BrowserSession()
		
		// Set default configuration values if not provided
		if (!process.env.SCREENSHOT_QUALITY) {
			process.env.SCREENSHOT_QUALITY = getConfigValue("SCREENSHOT_QUALITY", "75")
		}
		if (!process.env.BROWSER_VIEWPORT_SIZE) {
			process.env.BROWSER_VIEWPORT_SIZE = getConfigValue("BROWSER_VIEWPORT_SIZE", "900x600")
		}
		if (!process.env.BROWSER_NAVIGATION_TIMEOUT) {
			process.env.BROWSER_NAVIGATION_TIMEOUT = getConfigValue("BROWSER_NAVIGATION_TIMEOUT", "15000")
		}
		
		// Try remote browser detection first (unless explicitly disabled)
		const remoteBrowserEnabled = getConfigValue("REMOTE_BROWSER_ENABLED", "true")
		if (forceRemote || remoteBrowserEnabled !== "false") {
			const remoteHostUrl = await discoverChromeHostUrl(9222)
			
			if (remoteHostUrl) {
				process.env.REMOTE_BROWSER_ENABLED = "true"
				process.env.REMOTE_BROWSER_HOST = remoteHostUrl
			} else {
				process.env.REMOTE_BROWSER_ENABLED = "false"
			}
		} else {
			process.env.REMOTE_BROWSER_ENABLED = "false"
		}
		
		await browserSession.launchBrowser()
	}
	return browserSession
}

// Register tools

server.registerTool(
	"launch_browser",
	{
		title: "Launch Browser",
		description: "Launch browser and navigate to URL",
		inputSchema: {
			url: z.string().describe("URL to navigate to"),
			remote: z.boolean().optional().describe("Force remote browser connection (default: auto-detect)")
		}
	},
	async ({ url, remote }) => {
		const forceRemote = remote || false
		const browser = await ensureBrowserLaunched(forceRemote)
		const result = await browser.navigateToUrl(url)
		
		return {
			content: [
				{
					type: "text",
					text: `🚀 Browser launched and navigated to ${url}\n\n` +
						`Current URL: ${result.currentUrl}\n` +
						`Browser Mode: ${process.env.REMOTE_BROWSER_ENABLED === "true" ? "Remote" : "Local"}\n` +
						`Screenshot captured: ${result.screenshot ? "Yes" : "No"}\n` +
						`Page loaded successfully.`
				}
			]
		}
	}
)

server.registerTool(
	"click_element",
	{
		title: "Click Element",
		description: "Click at specified coordinates",
		inputSchema: {
			coordinates: z.string().describe("Coordinates in format 'x,y'")
		}
	},
	async ({ coordinates }) => {
		const browser = await ensureBrowserLaunched()
		await browser.click(coordinates)
		
		return {
			content: [
				{
					type: "text",
					text: `🖱️ Clicked at coordinates ${coordinates}`
				}
			]
		}
	}
)

server.registerTool(
	"type_text",
	{
		title: "Type Text",
		description: "Type text into the browser",
		inputSchema: {
			text: z.string().describe("Text to type")
		}
	},
	async ({ text }) => {
		const browser = await ensureBrowserLaunched()
		await browser.type(text)
		
		return {
			content: [
				{
					type: "text",
					text: `⌨️ Typed text: "${text}"`
				}
			]
		}
	}
)

server.registerTool(
	"scroll_page",
	{
		title: "Scroll Page",
		description: "Scroll the page up or down",
		inputSchema: {
			direction: z.enum(["up", "down"]).optional().describe("Scroll direction")
		}
	},
	async ({ direction }) => {
		const scrollDirection = direction || "down"
		const browser = await ensureBrowserLaunched()
		
		if (scrollDirection === "up") {
			await browser.scrollUp()
		} else {
			await browser.scrollDown()
		}
		
		return {
			content: [
				{
					type: "text",
					text: `📜 Scrolled page ${scrollDirection}`
				}
			]
		}
	}
)

server.registerTool(
	"hover_element",
	{
		title: "Hover Element",
		description: "Hover at specified coordinates",
		inputSchema: {
			coordinates: z.string().describe("Coordinates in format 'x,y'")
		}
	},
	async ({ coordinates }) => {
		const browser = await ensureBrowserLaunched()
		await browser.hover(coordinates)
		
		return {
			content: [
				{
					type: "text",
					text: `🖱️ Hovered at coordinates ${coordinates}`
				}
			]
		}
	}
)

server.registerTool(
	"resize_browser",
	{
		title: "Resize Browser",
		description: "Resize browser window",
		inputSchema: {
			size: z.string().describe("Size in format 'width,height'")
		}
	},
	async ({ size }) => {
		const browser = await ensureBrowserLaunched()
		await browser.resize(size)
		
		return {
			content: [
				{
					type: "text",
					text: `📐 Resized browser to ${size}`
				}
			]
		}
	}
)

server.registerTool(
	"take_screenshot",
	{
		title: "Take Screenshot",
		description: "Take a screenshot for AI agent analysis of the current page",
		inputSchema: {
			quality: z.number().optional().describe("Screenshot quality (1-100)"),
			fullPage: z.boolean().optional().describe("Capture full page (default: false)")
		}
	},
	async ({ quality, fullPage = false }) => {
		const browser = await ensureBrowserLaunched()
		
		// Set screenshot quality if provided
		if (quality) {
			process.env.SCREENSHOT_QUALITY = quality.toString()
		}
		
		// Take screenshot using the browser session's doActionWithOptions method
		const result = await browser.doActionWithOptions(async (page: any) => {
			// Just wait a moment to ensure page is stable, screenshot is taken automatically
			await new Promise(resolve => setTimeout(resolve, 100))
		}, { fullPage })
		
		const defaultQuality = parseInt(getConfigValue("SCREENSHOT_QUALITY", "75"))
		const actualQuality = quality || defaultQuality
		
		return {
			content: [
				{
					type: "text",
					text: `📸 Screenshot captured for analysis!\n\n` +
						`Current URL: ${result.currentUrl}\n` +
						`Image size: ${Math.round((result.screenshot?.length || 0) / 1024)}KB\n` +
						`Quality: ${actualQuality}%\n` +
						`Full page capture: ${fullPage ? "Yes" : "No"}\n` +
						`Screenshot data available for AI analysis`
				}
			]
		}
	}
)

server.registerTool(
	"capture_page",
	{
		title: "Capture Full Page",
		description: "Capture a full page screenshot (entire page, not just viewport) for AI agent analysis",
		inputSchema: {
			quality: z.number().optional().describe("Screenshot quality (1-100)"),
			fullPage: z.boolean().optional().describe("Capture full page (default: true)")
		}
	},
	async ({ quality, fullPage = true }) => {
		const browser = await ensureBrowserLaunched()
		
		// Set screenshot quality if provided
		if (quality) {
			process.env.SCREENSHOT_QUALITY = quality.toString()
		}
		
		// Take full page screenshot using the browser session's doActionWithOptions method
		const result = await browser.doActionWithOptions(async (page: any) => {
			// Just wait a moment to ensure page is stable, screenshot is taken automatically
			await new Promise(resolve => setTimeout(resolve, 100))
		}, { fullPage })
		
		const defaultQuality = parseInt(getConfigValue("SCREENSHOT_QUALITY", "75"))
		const actualQuality = quality || defaultQuality
		
		return {
			content: [
				{
					type: "text",
					text: `📸 Full page screenshot captured for analysis!\n\n` +
						`Current URL: ${result.currentUrl}\n` +
						`Image size: ${Math.round((result.screenshot?.length || 0) / 1024)}KB\n` +
						`Quality: ${actualQuality}%\n` +
						`Full page capture: ${fullPage ? "Yes" : "No"}\n` +
						`Screenshot data available for AI analysis`
				}
			]
		}
	}
)

server.registerTool(
	"save_screenshot",
	{
		title: "Save Screenshot",
		description: "Take and save a screenshot of the current page to disk",
		inputSchema: {
			quality: z.number().optional().describe("Screenshot quality (1-100)"),
			filename: z.string().optional().describe("Custom filename (without extension)"),
			fullPage: z.boolean().optional().describe("Capture full page (default: false)")
		}
	},
	async ({ quality, filename, fullPage = false }) => {
		const browser = await ensureBrowserLaunched()
		
		// Set screenshot quality if provided
		if (quality) {
			process.env.SCREENSHOT_QUALITY = quality.toString()
		}
		
		// Take screenshot using the browser session's doActionWithOptions method
		const result = await browser.doActionWithOptions(async (page: any) => {
			// Just wait a moment to ensure page is stable, screenshot is taken automatically
			await new Promise(resolve => setTimeout(resolve, 100))
		}, { fullPage })
		
		// Save screenshot to file if available
		let filePath = ""
		if (result.screenshot) {
			const fs = await import("node:fs/promises")
			const path = await import("node:path")
			const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
			const customName = filename ? filename.replace(/[^a-zA-Z0-9-_]/g, '_') : 'screenshot'
			const finalFilename = `${customName}-${timestamp}.webp`
			filePath = path.join(process.cwd(), finalFilename)
			
			// Extract base64 data and save to file
			const base64Data = result.screenshot.replace(/^data:image\/[^;]+;base64,/, '')
			await fs.writeFile(filePath, Buffer.from(base64Data, 'base64'))
		}
		
		const defaultQuality = parseInt(getConfigValue("SCREENSHOT_QUALITY", "75"))
		const actualQuality = quality || defaultQuality
		
		return {
			content: [
				{
					type: "text",
					text: `📸 Screenshot saved successfully!\n\n` +
						`Image size: ${Math.round((result.screenshot?.length || 0) / 1024)}KB\n` +
						`Quality: ${actualQuality}%\n` +
						`Full page capture: ${fullPage ? "Yes" : "No"}\n` +
						`Current URL: ${result.currentUrl}\n` +
						`${filePath ? `Saved to: ${filePath}` : 'Failed to save screenshot'}`
				}
			]
		}
	}
)

server.registerTool(
	"analyze_page",
	{
		title: "Analyze Page",
		description: "Analyze the current page content for AI agent understanding",
		inputSchema: {
			includeScreenshot: z.boolean().optional().describe("Include screenshot data for visual analysis")
		}
	},
	async ({ includeScreenshot }) => {
		const browser = await ensureBrowserLaunched()
		
		// Take screenshot and get page info
		const result = await browser.doAction(async (page: any) => {
			// Just wait a moment to ensure page is stable, screenshot is taken automatically
			await new Promise(resolve => setTimeout(resolve, 100))
		})
		
		// Build analysis text
		let analysis = `🔍 Page Analysis\n\n`
		analysis += `📄 URL: ${result.currentUrl}\n`
		analysis += `📊 Screenshot: ${result.screenshot ? "Available" : "Not available"}\n`
		analysis += `📝 Console Logs: ${result.logs ? "Available" : "None"}\n\n`
		
		analysis += `💡 AI Agent Notes:\n`
		analysis += `- Screenshot data available for visual analysis\n`
		analysis += `- Use this data to understand the page structure\n`
		analysis += `- Plan next actions based on available elements\n`
		
		if (includeScreenshot) {
			analysis += `- Visual analysis enabled\n`
		}
		
		return {
			content: [
				{
					type: "text",
					text: analysis
				}
			]
		}
	}
)

server.registerTool(
	"close_browser",
	{
		title: "Close Browser",
		description: "Close the browser",
		inputSchema: {}
	},
	async () => {
		if (browserSession) {
			await browserSession.closeBrowser()
			browserSession = null
		}
		
		return {
			content: [
				{
					type: "text",
					text: `🔒 Browser closed successfully`
				}
			]
		}
	}
)

// Start the server
async function main() {
	const transport = new StdioServerTransport()
	await server.connect(transport)
}

main().catch(console.error) 
