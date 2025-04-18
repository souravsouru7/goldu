const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'public', 'new');
const targetDir = path.join(__dirname, 'public', 'new');

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Get all JPG files
const files = fs.readdirSync(sourceDir).filter(file => 
  file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')
);

console.log(`Found ${files.length} JPG files to convert`);

// Convert each file
files.forEach(async (file) => {
  const inputPath = path.join(sourceDir, file);
  const outputPath = path.join(targetDir, file.replace(/\.(jpg|jpeg)$/i, '.webp'));
  
  try {
    await sharp(inputPath)
      .resize(1920, 1080, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ 
        quality: 70,
        effort: 6
      })
      .toFile(outputPath);
    console.log(`Converted ${file} to WebP`);
  } catch (error) {
    console.error(`Error converting ${file}:`, error);
  }
}); 