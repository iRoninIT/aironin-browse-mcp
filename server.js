#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Run the server using tsx from npx
const runServer = async () => {
  console.log('🚀 Starting MCP server with tsx...');
  
  const tsx = spawn('npx', ['--yes', 'tsx', join(__dirname, 'src/server.ts')], {
    stdio: 'inherit',
    cwd: __dirname
  });
  
  tsx.on('error', (err) => {
    console.error('Failed to start server:', err.message);
    console.error('Please install dependencies: npm install @modelcontextprotocol/sdk@^1.9.0 aironin-browse-core@^1.0.0 zod@^3.22.0 --ignore-scripts');
    process.exit(1);
  });
  
  tsx.on('close', (code) => {
    if (code !== 0) {
      console.error(`Server exited with code ${code}`);
      process.exit(code);
    }
  });
};

runServer(); 
