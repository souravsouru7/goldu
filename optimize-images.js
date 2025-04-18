const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const inputDir = './public';
const outputDir = './public/optimized';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to convert image to WebP
async function convertToWebP(inputPath, outputPath) {
    try {
        await sharp(inputPath)
            .webp({ quality: 80 })
            .toFile(outputPath);
        console.log(`Converted ${inputPath} to WebP`);
        return true;
    } catch (error) {
        console.error(`Error converting ${inputPath}:`, error);
        return false;
    }
}

// Function to optimize WebP
async function optimizeWebP(inputPath) {
    try {
        await sharp(inputPath)
            .webp({ quality: 80 })
            .toFile(inputPath);
        console.log(`Optimized ${inputPath}`);
    } catch (error) {
        console.error(`Error optimizing ${inputPath}:`, error);
    }
}

// Function to compress video
function compressVideo(inputPath) {
    return new Promise((resolve, reject) => {
        const outputPath = inputPath.replace(/\.[^.]+$/, '_compressed.mp4');
        exec(`ffmpeg -i "${inputPath}" -vcodec libx264 -crf 28 -preset medium -acodec aac -b:a 128k "${outputPath}"`, (error) => {
            if (error) {
                console.error(`Error compressing video ${inputPath}:`, error);
                reject(error);
            } else {
                console.log(`Compressed video: ${inputPath}`);
                resolve(true);
            }
        });
    });
}

// Function to process directory
async function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                const webpPath = fullPath.replace(/\.[^.]+$/, '.webp');
                const success = await convertToWebP(fullPath, webpPath);
                if (success) {
                    try {
                        fs.unlinkSync(fullPath);
                        console.log(`Deleted original file: ${fullPath}`);
                    } catch (error) {
                        console.warn(`Could not delete original file ${fullPath}:`, error);
                    }
                }
            } else if (ext === '.webp') {
                await optimizeWebP(fullPath);
            } else if (ext === '.mp4') {
                await compressVideo(fullPath);
            }
        }
    }
}

// Start processing from public directory
processDirectory('public')
    .then(() => console.log('Optimization complete'))
    .catch(console.error); 