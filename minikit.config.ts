const ROOT_URL = process.env.NEXT_PUBLIC_ROOT_URL || "https://shitfilter.vercel.app";

export const minikitConfig = {
  accountAssociation: {
    "header": "eyJmaWQiOjE0MzA5MjMsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhhRTc5ZDFhMTBhZWVBZmRlNjY0YTU0NjJGZTVEQzZEOUViNjRCMkM1In0",
    "payload": "eyJkb21haW4iOiJzaGl0ZmlsdGVyLnZlcmNlbC5hcHAifQ",
    "signature": "hpofU2Ci+rE45N99ZjN5Nsk5DImKXyLb9BA2IUk3705OOO2N3WBZSArrYsRD3K5ARDiDxzxSbQiwtWrnkBC01Bw="
  },
  baseBuilder: {
    "ownerAddress": "0xAbA994EF395486771F84cE99e59a24ab8EE3CE30"
  },
  miniapp: {
    version: "1",
    name: "SHITFILTER",
    subtitle: "Pre-TGE Mindshare Arena",
    description: "Building the future of Web3. Pre-TGE Arena에서 프로젝트에 대한 글을 평가하고 리더보드를 확인하세요.",
    screenshotUrls: [`${ROOT_URL}/screenshot-portrait.png`],
    iconUrl: `${ROOT_URL}/icon.png`,
    imageUrl: `${ROOT_URL}/icon.png`, // 필수 필드 추가
    buttonTitle: "Open SHITFILTER", // 필수 필드 추가
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#111827", // gray-900
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "social",
    tags: ["leaderboard", "web3", "pretge", "arena", "social"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: "Building the future of Web3",
    ogTitle: "SHITFILTER", // 30자 이하로 수정
    ogDescription: "Pre-TGE Arena에서 프로젝트에 대한 글을 평가하고 리더보드를 확인하세요.",
    ogImageUrl: `${ROOT_URL}/og-image.png`,
  },
} as const;

