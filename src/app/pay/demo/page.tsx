import type { Metadata } from "next";
import Link from "next/link";
import { PayCard } from "@/components/PayCard";

export const metadata: Metadata = {
  title: "Pay INV-0426 · Northline Studio (demo)",
  description: "The page your client sees when they pay a Xero invoice in USDC or USDT.",
};

export default function PayDemoPage() {
  return (
    <main id="main" className="ledger-lines flex min-h-screen flex-col items-center gap-6 px-4 py-10 sm:py-16">
      <div className="w-full max-w-[520px]">
        <PayCard full />
      </div>
      <p className="max-w-[520px] text-center font-mono text-[12px] leading-relaxed text-ink-3">
        This is the page your client opens from the Pay with USDC link on a Xero invoice.{" "}
        <Link href="/" className="link-u text-pencil">
          Back to Cleared
        </Link>
      </p>
    </main>
  );
}
