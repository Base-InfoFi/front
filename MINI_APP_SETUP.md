# Base Mini App 설정 가이드

이 가이드는 Base Mini App을 설정하고 배포하는 방법을 설명합니다.

## 완료된 단계

✅ 1. Vercel 배포 완료 (https://shitfilter.vercel.app/)
✅ 2. minikit.config.ts 파일 생성
✅ 3. .well-known/farcaster.json 라우트 생성
✅ 4. webhook API 엔드포인트 생성

## 다음 단계

### 1. 필요한 이미지 파일 준비

다음 이미지 파일들을 `public/` 폴더에 추가해야 합니다:

- `icon.png` - 앱 아이콘 (권장 크기: 512x512px)
- `splash.png` - 스플래시 이미지 (권장 크기: 1080x1920px, 세로형)
- `hero.png` - 히어로 이미지 (권장 크기: 1200x630px)
- `screenshot-portrait.png` - 스크린샷 (권장 크기: 1080x1920px, 세로형)
- `og-image.png` - Open Graph 이미지 (권장 크기: 1200x630px)

### 2. 환경 변수 설정

`.env.local` 파일에 다음을 추가하세요:

```env
NEXT_PUBLIC_ROOT_URL=https://shitfilter.vercel.app
```

### 3. Account Association 생성

1. Vercel 대시보드에서 Deployment Protection을 끄세요:
   - 프로젝트 설정 → Settings → Deployment Protection
   - "Vercel Authentication"을 끄고 저장

2. [Base Build Account association tool](https://base.dev/build/account-association)에 접속

3. App URL 필드에 `https://shitfilter.vercel.app` 입력하고 "Submit" 클릭

4. "Verify" 버튼을 클릭하고 지시사항을 따라 accountAssociation 필드를 생성

5. 생성된 accountAssociation 객체를 복사

### 4. minikit.config.ts 업데이트

생성된 accountAssociation 객체를 `minikit.config.ts` 파일에 붙여넣으세요:

```typescript
export const minikitConfig = {
  accountAssociation: {
    "header": "여기에_생성된_header_값",
    "payload": "여기에_생성된_payload_값",
    "signature": "여기에_생성된_signature_값"
  },
  // ... 나머지 설정
}
```

### 5. 변경사항 배포

모든 변경사항을 main 브랜치에 푸시하면 Vercel이 자동으로 배포합니다:

```bash
git add .
git commit -m "Add Base Mini App configuration"
git push origin main
```

### 6. 앱 미리보기

1. [base.dev/preview](https://base.dev/preview)에 접속
2. 앱 URL (`https://shitfilter.vercel.app`)을 입력
3. "Account association" 탭에서 인증 정보 확인
4. "Metadata" 탭에서 메타데이터 확인
5. "Launch" 버튼으로 앱 실행 테스트

### 7. Base 앱에 게시

Base 앱에 앱 URL을 포함한 포스트를 작성하여 앱을 게시하세요.

## 문제 해결

### manifest 파일이 404를 반환하는 경우

`.well-known/farcaster.json` 라우트가 제대로 작동하는지 확인하세요:
- URL: `https://shitfilter.vercel.app/.well-known/farcaster.json`
- Content-Type: `application/json`

### 이미지가 표시되지 않는 경우

- 이미지 파일이 `public/` 폴더에 있는지 확인
- 이미지 URL이 올바른지 확인 (ROOT_URL 환경 변수 확인)
- 이미지 파일 크기가 너무 크지 않은지 확인

