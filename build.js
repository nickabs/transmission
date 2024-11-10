import esbuild from 'esbuild'
import browserSync from 'browser-sync'
import { cpSync } from 'fs'

// Build configuration
const buildOptions = {
  entryPoints: ['assets/js/main.js', 'assets/css/main.css'],
  bundle: true,
  minify: false,
  sourcemap: true,
  format: 'esm',
  outdir: 'assets/built',
  platform: 'browser', 
  mainFields: ['browser', 'module', 'main'], 
  conditions: ['browser', 'default', 'module'],
  loader: {
    '.woff2': 'file'
  },
  assetNames: 'fonts/[name]'
}

cpSync('assets/fonts', 'assets/built/fonts/', { recursive: true })

// Watch and serve
async function dev() {
  const context = await esbuild.context(buildOptions)
  console.log("watching files");
  await context.watch()
}
async function build() {
  try {
    await esbuild.build(buildOptions);
    console.log('Build completed');
    return true;
  } catch (error) {
    console.error('Build failed:', error);
    process.stdout.write('\x07'); // Trigger a beep
  }
}

// Run based on command
process.argv.includes('--watch') ? await build() && dev() : build()
