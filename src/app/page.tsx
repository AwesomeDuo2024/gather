import CreateEventForm from "@/components/eventform/CreateEventForm";
import FAQ from "@/components/FAQ";
import HeroTitle from "@/components/HeroTitle";

export default async function HomePage() {
  return (
    <div className="bg-zinc-950 w-screen">
      <main className="w-full min-h-lvh container flex flex-col lg:flex-row items-center justify-around px-12 md:pb-12">
        <div className="mt-0 lg:-mt-6">
          <HeroTitle />
        </div>
        <div className="mt-4 mb-20 lg:mb-0">
          <CreateEventForm />
        </div>
      </main>
      <div id="faq" className="w-full bg-white py-2">
        <FAQ />
      </div>
    </div>
  );
}
