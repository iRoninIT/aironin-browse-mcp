#!/usr/bin/env node

import { spawn } from 'child_process';

console.log('Testing MCP server startup...');

const child = spawn('npx', ['--yes', 'aironin-browse-mcp'], {
  stdio: ['pipe', 'pipe', 'pipe']
});

// Send MCP initialize request
const initializeRequest = {
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: {
    protocolVersion: "2024-11-05",
    capabilities: {
      tools: {}
    },
    clientInfo: {
      name: "test-client",
      version: "1.0.0"
    }
  }
};

console.log('Sending initialize request...');
child.stdin.write(JSON.stringify(initializeRequest) + '\n');

let responseReceived = false;

child.stdout.on('data', (data) => {
  console.log('STDOUT:', data.toString());
  responseReceived = true;
});

child.stderr.on('data', (data) => {
  console.log('STDERR:', data.toString());
});

child.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
  if (!responseReceived) {
    console.log('No response received from server');
  }
});

// Timeout after 10 seconds
setTimeout(() => {
  console.log('Timeout reached, killing process');
  child.kill();
}, 10000); 