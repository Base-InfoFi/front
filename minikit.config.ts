const ROOT_URL = process.env.NEXT_PUBLIC_ROOT_URL || "https://shitfilter.vercel.app";

export const minikitConfig = {
  accountAssociation: {
    // Step 4에서 Base Build Account association tool을 통해 생성된 값으로 업데이트 필요
    "header": "",
    "payload": "",
    "signature": ""
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
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#111827", // gray-900
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "social",
    tags: ["leaderboard", "web3", "pre-tge", "arena", "social"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: "Building the future of Web3",
    ogTitle: "SHITFILTER - Pre-TGE Mindshare Arena",
    ogDescription: "Pre-TGE Arena에서 프로젝트에 대한 글을 평가하고 리더보드를 확인하세요.",
    ogImageUrl: `${ROOT_URL}/og-image.png`,
  },
} as const;

