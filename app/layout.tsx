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
  metadataBase: new URL("https://tnvotes2026.vercel.app"),
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
  authors: [{ name: "TherVu 2026", url: "https://tnvotes2026.vercel.app" }],
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
  themeColor: "#FAD949",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jetbrains.variable}`}>
      <body className="bg-bg text-text-primary antialiased selection:bg-text-primary selection:text-bg font-sans">
        {/* Chennai doodle-style dot grid background */}
        <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle, #111 1px, transparent 1px)', backgroundSize: '24px 24px' }} aria-hidden></div>
        {children}
      </body>
    </html>
  );
}
