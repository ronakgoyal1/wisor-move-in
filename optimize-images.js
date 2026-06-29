import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = './public';
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.match(/\.(png|jpe?g)$/i) && file !== 'sleepwell_logo.png' && file !== 'favicon.svg') {
    const filePath = path.join(dir, file);
    const parsed = path.parse(filePath);
    const webpPath = path.join(dir, `${parsed.name}.webp`);
    
    sharp(filePath)
      .webp({ quality: 80 })
      .toFile(webpPath)
      .then(() => {
        console.log(`Converted: ${file} -> ${parsed.name}.webp`);
        fs.unlinkSync(filePath); // Remove old file
      })
      .catch(err => console.error(`Error converting ${file}:`, err));
  }
}
