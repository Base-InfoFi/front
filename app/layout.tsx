import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yapper Leaderboard",
  description: "Pre-TGE Arena Leaderboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-gray-900 text-white">
        {children}
      </body>
    </html>
  );
}











