import type { Metadata } from "next";
import { Setup } from "@/components/Setup";

export const metadata: Metadata = {
  title: "Live demo: setup",
  description: "Connect Xero, add the wallets you get paid to, and let Cleared read the last 90 days.",
};

export default function SetupPage() {
  return <Setup />;
}
