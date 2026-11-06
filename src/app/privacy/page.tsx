import type { Metadata } from "next";
import { LegalDoc } from "@/components/Legal";

export const metadata: Metadata = { title: "Privacy" };

// Sample policy text for a design concept. Replace with counsel-reviewed text before any real use.
export default function PrivacyPage() {
  return (
    <LegalDoc
      title="Privacy"
      updated="6 November 2026"
      intro="Short version: we collect as little as we can, we don't sell any of it, and most of what you do on Taffy happens on a public blockchain we don't control."
      sections={[
        {
          h: "What we collect",
          p: [
            "When you visit this site we receive standard request data such as your IP address, browser type and the pages you view. We keep it for up to 30 days to keep the site running and safe.",
            "If you join the waitlist, we store the email address you give us and nothing else.",
          ],
        },
        {
          h: "What we don't collect",
          p: [
            "We don't ask for your name, we don't run advertising trackers, and we don't build profiles of you across other sites.",
            "We never ask for your seed phrase or private keys. Anyone who does is not us.",
          ],
        },
        {
          h: "On-chain activity",
          p: [
            "Trades, orders and points are recorded on Sui, which is public by design. We can read that data like anyone else, but we can't edit or delete it, and neither can you.",
          ],
        },
        {
          h: "Cookies",
          p: ["This site doesn't set any cookies. Fonts are served from our own domain, so loading a page doesn't ping anyone else."],
        },
        {
          h: "Your choices",
          p: [
            "You can ask us to delete your waitlist email at any time by writing to the address below. We'll confirm within 30 days.",
          ],
        },
      ]}
    />
  );
}
