const fs = require('fs');
const path = require('path');

// SVG를 PNG로 변환하기 위한 안내 스크립트
// 실제 변환은 sharp나 다른 이미지 라이브러리가 필요합니다

const images = [
  { name: 'icon', width: 512, height: 512 },
  { name: 'splash', width: 1080, height: 1920 },
  { name: 'hero', width: 1200, height: 630 },
  { name: 'screenshot-portrait', width: 1080, height: 1920 },
  { name: 'og-image', width: 1200, height: 630 },
];

console.log('이미지 파일 생성 가이드:');
console.log('');
console.log('SVG 파일들이 public/ 폴더에 생성되었습니다.');
console.log('이제 이 SVG 파일들을 PNG로 변환해야 합니다.');
console.log('');
console.log('옵션 1: 온라인 도구 사용');
console.log('  - https://svgtopng.com/ 또는 https://convertio.co/kr/svg-png/ 사용');
console.log('  - 각 SVG 파일을 업로드하고 PNG로 변환');
console.log('');
console.log('옵션 2: ImageMagick 사용 (터미널)');
console.log('  brew install imagemagick');
images.forEach(img => {
  console.log(`  convert -background none -size ${img.width}x${img.height} public/${img.name}.svg public/${img.name}.png`);
});
console.log('');
console.log('옵션 3: Node.js 스크립트 (sharp 라이브러리 필요)');
console.log('  npm install sharp');
console.log('  node scripts/convert-svg-to-png.js');

