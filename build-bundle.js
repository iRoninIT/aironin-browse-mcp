#!/usr/bin/env node

import { build } from 'esbuild';

async function buildBundle() {
  try {
    await build({
      entryPoints: ['src/server.ts'],
      bundle: true,
      platform: 'node',
      target: 'node20',
      format: 'esm',
      outfile: 'dist/server-bundle.js',
      external: [], // Don't externalize anything - bundle everything
      define: {
        'process.env.NODE_ENV': '"production"'
      },
      banner: {
        js: '#!/usr/bin/env node\n'
      }
    });
    
    console.log('✅ Bundle built successfully');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildBundle(); 
