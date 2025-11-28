const fs = require('fs');
const path = require('path');

// sharp가 설치되어 있는지 확인
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('sharp 라이브러리가 설치되지 않았습니다.');
  console.log('설치 명령어: npm install --save-dev sharp');
  process.exit(1);
}

const publicDir = path.join(__dirname, '..', 'public');

const images = [
  { name: 'icon', width: 512, height: 512 },
  { name: 'splash', width: 1080, height: 1920 },
  { name: 'hero', width: 1200, height: 630 },
  { name: 'screenshot-portrait', width: 1080, height: 1920 },
  { name: 'og-image', width: 1200, height: 630 },
];

async function convertSvgToPng() {
  for (const img of images) {
    const svgPath = path.join(publicDir, `${img.name}.svg`);
    const pngPath = path.join(publicDir, `${img.name}.png`);

    if (!fs.existsSync(svgPath)) {
      console.log(`⚠️  ${img.name}.svg 파일을 찾을 수 없습니다.`);
      continue;
    }

    try {
      const svgBuffer = fs.readFileSync(svgPath);
      await sharp(svgBuffer)
        .resize(img.width, img.height)
        .png()
        .toFile(pngPath);
      
      console.log(`✅ ${img.name}.png 생성 완료 (${img.width}x${img.height})`);
    } catch (error) {
      console.error(`❌ ${img.name}.png 생성 실패:`, error.message);
    }
  }
  
  console.log('\n모든 이미지 변환이 완료되었습니다!');
}

convertSvgToPng().catch(console.error);


