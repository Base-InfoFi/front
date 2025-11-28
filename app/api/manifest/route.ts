import { NextResponse } from "next/server";
import { minikitConfig } from "../../../minikit.config";

import { NextResponse } from "next/server";
import { minikitConfig } from "../../../minikit.config";

export async function GET() {
  const manifest: any = {
    miniapp: {
      version: minikitConfig.miniapp.version,
      name: minikitConfig.miniapp.name,
      subtitle: minikitConfig.miniapp.subtitle,
      description: minikitConfig.miniapp.description,
      screenshotUrls: minikitConfig.miniapp.screenshotUrls,
      iconUrl: minikitConfig.miniapp.iconUrl,
      splashImageUrl: minikitConfig.miniapp.splashImageUrl,
      splashBackgroundColor: minikitConfig.miniapp.splashBackgroundColor,
      homeUrl: minikitConfig.miniapp.homeUrl,
      webhookUrl: minikitConfig.miniapp.webhookUrl,
      primaryCategory: minikitConfig.miniapp.primaryCategory,
      tags: minikitConfig.miniapp.tags,
      heroImageUrl: minikitConfig.miniapp.heroImageUrl,
      tagline: minikitConfig.miniapp.tagline,
      ogTitle: minikitConfig.miniapp.ogTitle,
      ogDescription: minikitConfig.miniapp.ogDescription,
      ogImageUrl: minikitConfig.miniapp.ogImageUrl,
    },
  };

  // accountAssociation이 설정되어 있으면 추가 (빈 문자열이 아닐 때만)
  const hasAccountAssociation = 
    minikitConfig.accountAssociation.header &&
    minikitConfig.accountAssociation.payload &&
    minikitConfig.accountAssociation.signature;
  
  if (hasAccountAssociation) {
    manifest.accountAssociation = minikitConfig.accountAssociation;
  }

  // baseBuilder 필드가 설정되어 있으면 추가
  if (minikitConfig.baseBuilder.ownerAddress) {
    manifest.baseBuilder = {
      ownerAddress: minikitConfig.baseBuilder.ownerAddress,
    };
  }

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

