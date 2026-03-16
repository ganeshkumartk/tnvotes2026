import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thervu2026.in"),
  title: {
    default: "தேர்வு 2026 — Vote the policy. Not the flag.",
    template: "%s | தேர்வு 2026",
  },
  description:
    "Civic awareness tool for Tamil Nadu's 2026 Assembly Elections. Compare real manifesto promises from 6 parties — anonymized so you judge the policy, not the party badge.",
  keywords: [
    "Tamil Nadu elections",
    "2026",
    "manifesto",
    "civic awareness",
    "voter education",
    "DMK",
    "AIADMK",
    "TVK",
    "BJP",
    "NTK",
    "INC",
    "policy comparison",
    "thervu",
  ],
  authors: [{ name: "TherVu 2026", url: "https://thervu2026.in" }],
  creator: "TherVu 2026",
  openGraph: {
    title: "தேர்வு 2026 — Vote the policy. Not the flag.",
    description:
      "Civic awareness tool. Compare TN 2026 manifesto promises — anonymized. Pick what resonates, find out who said it.",
    url: "/",
    siteName: "TherVu 2026",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "தேர்வு 2026 — Vote the policy. Not the flag.",
    description: "Civic awareness tool. Real TN 2026 manifesto promises, anonymized. 3 min to compare policies.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#F4F0E6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jetbrains.variable}`}>
      <body className="bg-bg text-text-primary antialiased selection:bg-text-primary selection:text-bg font-sans">
        <div className="fixed inset-0 pointer-events-none z-[-1] mix-blend-multiply opacity-[0.05]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        {children}
      </body>
    </html>
  );
}
