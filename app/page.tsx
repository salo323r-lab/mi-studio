import ScrollSequence from "@/components/ScrollSequence";
import PriceScreen from "@/components/PriceScreen";
import ContactScreen from "@/components/ContactScreen";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <ScrollSequence />
      <PriceScreen />
      <ContactScreen />
    </main>
  );
}
