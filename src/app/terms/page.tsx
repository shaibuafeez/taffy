import type { Metadata } from "next";
import { LegalDoc } from "@/components/Legal";

export const metadata: Metadata = { title: "Terms" };

// Sample terms for a design concept. Replace with counsel-reviewed text before any real use.
export default function TermsPage() {
  return (
    <LegalDoc
      title="Terms of use"
      updated="6 November 2026"
      intro="These terms cover this website. The Taffy protocol is open-source software running on a public blockchain; using it is your choice and your responsibility."
      sections={[
        {
          h: "Using this site",
          p: [
            "You may browse, share and link to this site freely. Please don't try to break it, overload it or use it to mislead anyone.",
          ],
        },
        {
          h: "No advice",
          p: [
            "Nothing here is financial, legal or tax advice. Figures shown on this site are illustrative. Trading carries risk, including the loss of everything you put in.",
          ],
        },
        {
          h: "The protocol",
          p: [
            "Taffy's smart contracts are open source and run on Sui. Apps built on top of them are run by independent teams with their own terms; read theirs before you use them.",
            "We don't hold your funds and can't reverse transactions.",
          ],
        },
        {
          h: "Points and PULL",
          p: [
            "Points measure participation during a season. They are not tokens, have no cash value and can't be transferred or sold.",
          ],
        },
        {
          h: "Changes",
          p: ["We may update these terms. When we do, we'll change the date at the top and keep the old version available."],
        },
      ]}
    />
  );
}
