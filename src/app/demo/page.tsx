import type { Metadata } from "next";
import { ReviewInbox } from "@/components/ReviewInbox";

export const metadata: Metadata = {
  title: "Live demo: review inbox",
  description: "Clear three real-world stablecoin payment problems in a sample Xero organisation.",
};

export default function DemoPage() {
  return <ReviewInbox />;
}
