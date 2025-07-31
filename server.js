#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Run the server using tsx from npx if dist doesn't exist
const runServer = async () => {
  const distServerPath = join(__dirname, 'dist/server.js');
  const srcServerPath = join(__dirname, 'src/server.ts');
  
  // Check if dist/server.js exists
  const fs = await import('node:fs');
  
  if (fs.existsSync(distServerPath)) {
    // Use compiled version
    const server = spawn('node', [distServerPath], {
      stdio: 'inherit',
      cwd: __dirname
    });
    
    server.on('error', (err) => {
      console.error('Failed to start server:', err.message);
      process.exit(1);
    });
    
    server.on('close', (code) => {
      if (code !== 0) {
        console.error(`Server exited with code ${code}`);
        process.exit(code);
      }
    });
  } else {
    // Use tsx to run TypeScript directly
    const server = spawn('npx', ['--yes', 'tsx', srcServerPath], {
      stdio: 'inherit',
      cwd: __dirname
    });
    
    server.on('error', (err) => {
      console.error('Failed to start server:', err.message);
      console.error('Please install dependencies: npm install @modelcontextprotocol/sdk@^1.9.0 aironin-browse-core@^1.1.1 zod@^3.22.0');
      process.exit(1);
    });
    
    server.on('close', (code) => {
      if (code !== 0) {
        console.error(`Server exited with code ${code}`);
        process.exit(code);
      }
    });
  }
};

runServer(); 
