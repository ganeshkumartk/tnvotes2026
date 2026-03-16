import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal & Policies",
  description:
    "Terms of Service, Privacy Policy, Legal Disclaimers, and Intellectual Property for TherVu 2026 — Tamil Nadu civic awareness tool.",
  openGraph: {
    title: "Legal & Policies — தேர்வு 2026",
    description: "Terms of Service, Privacy Policy, and Legal Disclaimers for TherVu 2026.",
    url: "/legal",
  },
  twitter: {
    card: "summary",
    title: "Legal & Policies — தேர்வு 2026",
  },
  alternates: {
    canonical: "/legal",
  },
};

export default function Legal() {
  return (
    <div className="min-h-screen bg-bg text-text-primary p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="font-mono text-xs uppercase tracking-widest hover:opacity-70 mb-12 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-light mb-12 uppercase tracking-tight">Legal & Policies</h1>
        
        <div className="space-y-16">
          
          {/* Section 1: Disclaimer & ECI Compliance */}
          <section>
            <h2 className="text-xl font-medium mb-4 uppercase tracking-wide border-b border-text-primary/20 pb-2">
              1. Disclaimer & ECI Compliance
            </h2>
            <div className="space-y-4 font-light text-text-primary/80/80 leading-relaxed">
              <p>
                <strong>TherVu 2026</strong> is an independent, non-partisan, self-funded citizen-led civic awareness initiative. 
                It is <strong>not</strong> affiliated with, funded by, or endorsed by any political party, candidate, government body, or the Election Commission of India (ECI).
              </p>
              <p>
                The primary goal of this platform is to educate voters on policy differences. The content presented is sourced entirely from publicly available political manifestos, official party websites, press releases, and public speeches. While every effort is made to ensure accuracy and neutrality, TherVu 2026 does not guarantee the absolute completeness of the information.
              </p>
              <p>
                <strong>Compliance with Election Laws:</strong> This platform operates in the spirit of the ECI’s Systematic Voters’ Education and Electoral Participation (SVEEP) goals. To comply with Section 126 of the Representation of the People Act, 1951, access to this platform may be paused or restricted during the mandatory 48-hour silence period preceding the conclusion of polling in Tamil Nadu.
              </p>
            </div>
          </section>

          {/* Section 2: Privacy Policy */}
          <section>
            <h2 className="text-xl font-medium mb-4 uppercase tracking-wide border-b border-text-primary/20/20 pb-2">
              2. Privacy Policy
            </h2>
            <div className="space-y-4 font-light text-text-primary/80 leading-relaxed">
              <p>
                We believe your political preferences are strictly your own business. 
              </p>
              <p>
                <strong>No Data Collection:</strong> TherVu 2026 does not require account creation, login, or personal identification. We do not ask for your name, email, phone number, or voter ID.
              </p>
              <p>
                <strong>Client-Side Processing:</strong> All policy comparisons, selections, and alignment calculations happen entirely locally on your device (browser). We do not send your choices to any server or database.
              </p>
              <p>
                <strong>No Tracking or Analytics:</strong> We do not use third-party trackers (like Facebook Pixel or aggressive analytics) to profile you or track your political leanings across the web.
              </p>
              <p>
                <strong>Purpose:</strong> TherVu 2026 is a civic awareness and voter education tool. It helps citizens compare party manifestos and understand policy differences before voting.
              </p>
            </div>
          </section>

          {/* Section 3: Terms of Service */}
          <section>
            <h2 className="text-xl font-medium mb-4 uppercase tracking-wide border-b border-text-primary/20 pb-2">
              3. Terms of Service
            </h2>
            <div className="space-y-4 font-light text-text-primary/80/80 leading-relaxed">
              <p>
                By accessing TherVu 2026, you agree to use the platform for its intended purpose: personal civic education.
              </p>
              <p>
                <strong>No Opinion Polls:</strong> The alignment results represent your personal policy preferences based on a limited subset of manifesto promises. They are for personal reflection and civic awareness only and do not constitute a statistically valid "Opinion Poll" or "Exit Poll." You agree not to misrepresent screenshots of your personal results as official election polling data.
              </p>
              <p>
                <strong>As-Is Basis:</strong> The platform is provided "as-is" without any warranties. The creators are not liable for any direct or indirect damages, or political disputes, arising from the use of this website.
              </p>
            </div>
          </section>

          {/* Section 4: Intellectual Property */}
          <section>
            <h2 className="text-xl font-medium mb-4 uppercase tracking-wide border-b border-text-primary/20 pb-2">
              4. Intellectual Property & Fair Use
            </h2>
            <div className="space-y-4 font-light text-text-primary/80 leading-relaxed">
              <p>
                The political party names, abbreviations, logos, and flags used on this website are the trademarks and intellectual property of their respective political organizations. 
              </p>
              <p>
                Their inclusion on TherVu 2026 falls strictly under the <strong>Doctrine of Fair Use</strong> for the purposes of commentary, news reporting, and civic education. TherVu 2026 claims no ownership over these assets.
              </p>
              <p>
                The UI design, codebase structure, and original copywriting of the application are copyright of the creators.
              </p>
            </div>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-text-primary/10 text-center font-mono text-[10px] uppercase tracking-widest text-text-primary/40">
          Last Updated: March 2026
        </div>
      </div>
    </div>
  );
}