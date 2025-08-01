#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check if core dependencies are available
async function checkCoreDependencies() {
  const requiredDeps = [
    { name: '@modelcontextprotocol/sdk', path: '@modelcontextprotocol/sdk/server/mcp.js' },
    { name: 'zod', path: 'zod' }
  ];
  
  const missing = [];
  
  for (const dep of requiredDeps) {
    try {
      await import(dep.path);
    } catch (error) {
      missing.push(dep.name);
    }
  }
  
  return missing;
}

// Check if aironin-browse-core is available
async function checkBrowseCore() {
  try {
    await import('aironin-browse-core');
    return true;
  } catch (error) {
    return false;
  }
}

// Run the minimal server as fallback
function runMinimalServer() {
  console.error('🔧 Starting in minimal mode due to missing dependencies');
  const minimalServerPath = join(__dirname, 'server-minimal.js');
  
  const server = spawn('node', [minimalServerPath], {
    stdio: 'inherit',
    cwd: __dirname
  });
  
  server.on('error', (err) => {
    console.error('❌ Failed to start minimal server:', err.message);
    process.exit(1);
  });
  
  server.on('close', (code) => {
    if (code !== 0) {
      console.error(`❌ Minimal server exited with code ${code}`);
      process.exit(code);
    }
  });
}

// Run the full server
function runFullServer(serverPath, isCompiled = false) {
  const command = isCompiled ? 'node' : 'npx';
  const args = isCompiled ? [serverPath] : ['--yes', 'tsx', serverPath];
  
  const server = spawn(command, args, {
    stdio: 'inherit',
    cwd: __dirname
  });
  
  server.on('error', (err) => {
    console.error('❌ Failed to start server:', err.message);
    if (!isCompiled) {
      console.error('🔧 Falling back to minimal server...');
      runMinimalServer();
    } else {
      process.exit(1);
    }
  });
  
  server.on('close', (code) => {
    if (code !== 0) {
      console.error(`❌ Server exited with code ${code}`);
      if (!isCompiled) {
        console.error('🔧 Falling back to minimal server...');
        runMinimalServer();
      } else {
        process.exit(code);
      }
    }
  });
}

// Main server startup logic
const runServer = async () => {
  const distServerPath = join(__dirname, 'dist/server.js');
  const srcServerPath = join(__dirname, 'src/server.ts');
  
  // Check if dist/server.js exists
  const fs = await import('node:fs');
  
  // Check core dependencies first
  const missingDeps = await checkCoreDependencies();
  const hasBrowseCore = await checkBrowseCore();
  
  if (missingDeps.length > 0) {
    console.error('❌ Missing core dependencies:', missingDeps.join(', '));
    console.error('📦 Install with: npm install');
    runMinimalServer();
    return;
  }
  
  if (!hasBrowseCore) {
    console.error('⚠️  aironin-browse-core not available - browser automation will be limited');
    console.error('📦 Install with: npm install aironin-browse-core@^1.1.2');
  }
  
  if (fs.existsSync(distServerPath)) {
    console.error('🚀 Starting aiRonin Browse MCP Server (compiled)...');
    runFullServer(distServerPath, true);
  } else {
    console.error('🚀 Starting aiRonin Browse MCP Server (development)...');
    runFullServer(srcServerPath, false);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.error('⚠️  Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.error('⚠️  Received SIGINT, shutting down gracefully...');
  process.exit(0);
});

runServer().catch((error) => {
  console.error('❌ Server startup failed:', error.message);
  console.error('🔧 Falling back to minimal server...');
  runMinimalServer();
});
