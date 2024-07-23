import CreateEventForm from "@/components/eventform/CreateEventForm";
import FAQ from "@/components/FAQ";

export default async function HomePage() {
  return (
    <>
      <div className="bg-gray-900 w-full h-[36rem]"></div>
      <CreateEventForm />
      <FAQ />
    </>
  );
}
