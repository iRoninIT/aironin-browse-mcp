#!/usr/bin/env node

import { execSync } from 'child_process';

try {
  console.log('🔨 Building self-contained executable...');
  
  // Use ncc to bundle everything into a single file
  execSync('npx ncc build src/server.ts -o dist-bundle', { 
    stdio: 'inherit' 
  });
  
  // Copy the bundled file to dist
  execSync('cp dist-bundle/index.js dist/server-standalone.js', { 
    stdio: 'inherit' 
  });
  
  // Make it executable
  execSync('chmod +x dist/server-standalone.js', { 
    stdio: 'inherit' 
  });
  
  console.log('✅ Self-contained executable built successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} 
