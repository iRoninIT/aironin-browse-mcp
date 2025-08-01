#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { platform } from 'os';

// Detect if we're in a dev container or similar constrained environment
function isConstrainedEnvironment() {
  const indicators = [
    process.env.CODESPACES,
    process.env.DEVCONTAINER,
    process.env.VSCODE_REMOTE_CONTAINERS_SESSION,
    process.env.REMOTE_CONTAINERS,
    existsSync('/.dockerenv'),
    platform() === 'linux' && process.env.USER === 'vscode',
    platform() === 'linux' && process.env.HOME?.includes('vscode')
  ];
  
  return indicators.some(indicator => indicator);
}

// Check if puppeteer is available and functional
async function checkPuppeteerAvailability() {
  try {
    const puppeteer = await import('puppeteer');
    console.log('✅ Puppeteer is available and functional');
    return true;
  } catch (error) {
    console.log('⚠️  Puppeteer not available:', error.message);
    return false;
  }
}

// Check installation preferences
function getInstallationPreferences() {
  const isConstrained = isConstrainedEnvironment();
  
  // Check for explicit Chromium installation flag (opt-in)
  const installChromium = process.env.INSTALL_CHROMIUM === 'true' ||
                         process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD === 'false';
  
  // Default to skipping Chromium download for safety
  const skipChromium = !installChromium;
  
  return {
    isConstrained,
    installChromium,
    skipChromium
  };
}

// Install puppeteer with retry logic and explicit Chromium control
async function installPuppeteerWithRetry() {
  const { isConstrained, installChromium, skipChromium } = getInstallationPreferences();
  
  console.log('🔧 Installation Configuration:');
  console.log(`   Environment: ${isConstrained ? 'Constrained (dev container/codespace)' : 'Standard'}`);
  console.log(`   Install Chromium: ${installChromium ? 'Yes' : 'No (safer default)'}`);
  
  if (skipChromium) {
    console.log('💡 Chromium download disabled by default for better dev container compatibility');
    console.log('   To enable: set INSTALL_CHROMIUM=true');
  }
  
  const installCommands = [
    // Always try with optimized flags first
    'npm install puppeteer --ignore-scripts --no-optional',
    // Fallback with standard installation if Chromium is explicitly requested
    installChromium ? 'npm install puppeteer --no-optional' : null,
    // Final fallback
    'npm install puppeteer --ignore-scripts --no-optional'
  ].filter(Boolean);
  
  for (const [index, command] of installCommands.entries()) {
    try {
      console.log(`📦 Attempt ${index + 1}: ${command}`);
      
      // Set environment variables based on preferences
      const env = { ...process.env };
      
      if (skipChromium) {
        env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = 'true';
        // Set common system Chrome paths
        if (!env.PUPPETEER_EXECUTABLE_PATH) {
          if (platform() === 'linux') {
            env.PUPPETEER_EXECUTABLE_PATH = '/usr/bin/google-chrome';
          } else if (platform() === 'darwin') {
            env.PUPPETEER_EXECUTABLE_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
          }
        }
      }
      
      execSync(command, {
        stdio: 'inherit',
        timeout: 120000, // 2 minute timeout
        env
      });
      
      console.log('✅ Puppeteer installation completed');
      
      if (skipChromium) {
        console.log('🔧 Chromium download was skipped - using system/remote browsers');
        console.log('   For local Chromium: reinstall with INSTALL_CHROMIUM=true');
      }
      
      return true;
    } catch (error) {
      console.log(`❌ Attempt ${index + 1} failed:`, error.message);
      
      if (index === installCommands.length - 1) {
        console.log('⚠️  All installation attempts failed, but server will continue');
        console.log('🔧 The MCP server will work with remote browsers or system Chrome');
        return false;
      }
    }
  }
  
  return false;
}

// Main postinstall logic
async function main() {
  console.log('🚀 aiRonin Browse MCP postinstall starting...');
  
  // Check if puppeteer is already available
  const isAvailable = await checkPuppeteerAvailability();
  
  if (!isAvailable) {
    console.log('📦 Installing Puppeteer...');
    await installPuppeteerWithRetry();
  }
  
  // Final check
  const finalCheck = await checkPuppeteerAvailability();
  
  if (finalCheck) {
    console.log('✅ aiRonin Browse MCP installation completed successfully');
  } else {
    console.log('⚠️  aiRonin Browse MCP installation completed with warnings');
    console.log('🔧 Server will use remote browser detection for functionality');
    console.log('💡 To use local Chrome: chrome --remote-debugging-port=9222');
  }
  
  console.log('🎉 Ready to use! Run: npx aironin-browse-mcp');
}

// Handle process termination gracefully
process.on('SIGTERM', () => {
  console.log('⚠️  Installation interrupted by SIGTERM');
  console.log('🔧 Server will still work with remote browsers');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('⚠️  Installation interrupted by user');
  process.exit(0);
});

main().catch((error) => {
  console.error('❌ Postinstall failed:', error.message);
  console.log('🔧 Server will still work with remote browsers');
  process.exit(0); // Exit gracefully to not fail the entire installation
});
