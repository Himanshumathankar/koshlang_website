import type { Metadata } from "next";
import { getPublicConfig } from "@koshlang/config";
import "./globals.css";
import "../index.css";

export const metadata: Metadata = {
  metadataBase: new URL(getPublicConfig().siteUrl),
  title: {
    default: "KoshLang",
    template: "%s | KoshLang"
  },
  description: "KoshLang developer platform foundation."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
