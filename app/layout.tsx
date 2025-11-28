import "./globals.css";
import { Providers } from "./provider";
import type { Metadata } from "next";
import { minikitConfig } from "../minikit.config";
import LayoutWrapper from "@/components/LayoutWrapper";

export async function generateMetadata(): Promise<Metadata> {
  const miniapp = minikitConfig.miniapp;
  
  return {
    title: miniapp.name,
    description: miniapp.description,
    other: {
      "fc:miniapp": JSON.stringify({
        version: miniapp.version,
        imageUrl: miniapp.heroImageUrl,
        button: {
          title: miniapp.buttonTitle,
          action: {
            type: "launch_frame",
            url: miniapp.homeUrl,
            name: miniapp.name,
            splashImageUrl: miniapp.splashImageUrl,
            splashBackgroundColor: miniapp.splashBackgroundColor,
          },
        },
      }),
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen">
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
