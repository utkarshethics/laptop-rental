#!/usr/bin/env node
/**
 * Image Optimization Pipeline
 * Processes all assets in src/frontend/public/assets/
 * Outputs optimized WebP, AVIF, and responsive variants
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const { glob } = require('glob');

const ASSETS_DIR = 'src/frontend/public/assets';
const OUTPUT_DIR = 'src/frontend/public/assets/optimized';

// Responsive breakpoints (widths)
const BREAKPOINTS = [320, 480, 640, 768, 1024, 1280, 1600, 1920];

// Quality settings
const QUALITY = {
  webp: 82,
  avif: 65,
  jpeg: 85,
  png: 90
};

// Formats to generate
const FORMATS = ['webp', 'avif'];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function optimizeImage(inputPath, relativePath) {
  const results = [];
  
  for (const format of FORMATS) {
    const outputDir = path.join(OUTPUT_DIR, path.dirname(relativePath));
    await ensureDir(outputDir);
    
    // Generate responsive variants
    for (const width of BREAKPOINTS) {
      const outputName = `${path.basename(relativePath, path.extname(relativePath))}-${width}w.${format}`;
      const outputPath = path.join(outputDir, outputName);
      
      try {
        await sharp(inputPath)
          .resize(width, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .toFormat(format, { quality: QUALITY[format] })
          .toFile(outputPath);
        
        results.push({
          format,
          width,
          path: path.relative(OUTPUT_DIR, outputPath),
          size: (await fs.stat(outputPath)).size
        });
      } catch (err) {
        console.error(`Error processing ${inputPath} at ${width}w ${format}:`, err.message);
      }
    }
    
    // Generate original size (max 1920w)
    const outputName = `${path.basename(relativePath, path.extname(relativePath))}.${format}`;
    const outputPath = path.join(outputDir, outputName);
    
    try {
      await sharp(inputPath)
        .resize(1920, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .toFormat(format, { quality: QUALITY[format] })
        .toFile(outputPath);
      
      results.push({
        format,
        width: 'original',
        path: path.relative(OUTPUT_DIR, outputPath),
        size: (await fs.stat(outputPath)).size
      });
    } catch (err) {
      console.error(`Error processing ${inputPath} original ${format}:`, err.message);
    }
  }
  
  return results;
}

async function generateManifest(allResults) {
  const manifest = {};
  
  for (const result of allResults) {
    const key = result.path.replace(/\.[^.]+$/, ''); // Remove extension
    if (!manifest[key]) {
      manifest[key] = { webp: {}, avif: {} };
    }
    manifest[key][result.format][result.width] = {
      path: `/assets/optimized/${result.path}`,
      width: result.width === 'original' ? null : result.width,
      size: result.size
    };
  }
  
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log('Manifest generated at:', path.join(OUTPUT_DIR, 'manifest.json'));
}

async function generatePictureElementHelper(manifestPath) {
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf-8'));
  
  let helperCode = `// Auto-generated picture element helper
export function getPictureSources(assetKey) {
  const manifest = ${JSON.stringify(manifest, null, 2)};
  const asset = manifest[assetKey];
  if (!asset) return null;
  
  const webpSources = Object.entries(asset.webp).map(([width, data]) => 
    \`\${data.path} \${width === 'original' ? '1920w' : width + 'w'}\`
  ).join(', ');
  
  const avifSources = Object.entries(asset.avif).map(([width, data]) => 
    \`\${data.path} \${width === 'original' ? '1920w' : width + 'w'}\`
  ).join(', ');
  
  const fallback = asset.webp.original?.path || asset.avif.original?.path;
  
  return {
    avif: avifSources,
    webp: webpSources,
    fallback
  };
}
`;
  
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'picture-helper.js'),
    helperCode
  );
  
  console.log('Picture helper generated at:', path.join(OUTPUT_DIR, 'picture-helper.js'));
}

async function main() {
  console.log('🚀 Starting image optimization pipeline...');
  console.log(`Source: ${ASSETS_DIR}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Breakpoints: ${BREAKPOINTS.join(', ')}`);
  console.log(`Formats: ${FORMATS.join(', ')}`);
  
  // Clean output directory
  await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
  await ensureDir(OUTPUT_DIR);
  
  // Find all source images
  const files = await glob(`${ASSETS_DIR}/**/*.{png,jpg,jpeg,svg}`, { 
    ignore: [`${ASSETS_DIR}/optimized/**`] 
  });
  
  console.log(`\nFound ${files.length} source images`);
  
  const allResults = [];
  
  for (const file of files) {
    const relativePath = path.relative(ASSETS_DIR, file);
    console.log(`\nProcessing: ${relativePath}`);
    
    const results = await optimizeImage(file, relativePath);
    allResults.push(...results);
    
    console.log(`  Generated ${results.length} variants`);
  }
  
  // Generate manifest and helper
  await generateManifest(allResults);
  await generatePictureElementHelper(path.join(OUTPUT_DIR, 'manifest.json'));
  
  // Summary
  const totalSize = allResults.reduce((sum, r) => sum + r.size, 0);
  const avgSize = totalSize / allResults.length;
  
  console.log('\n✅ Optimization complete!');
  console.log(`Total files generated: ${allResults.length}`);
  console.log(`Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Average size: ${(avgSize / 1024).toFixed(2)} KB`);
  console.log(`Manifest: ${OUTPUT_DIR}/manifest.json`);
  console.log(`Helper: ${OUTPUT_DIR}/picture-helper.js`);
}

main().catch(console.error);