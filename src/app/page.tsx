import { createClient } from "@/app/utils/supabase/server";
import EventForm from "@/components/eventform/EventForm";
import FAQ from "@/components/FAQ";

export default async function HomePage() {
  const supabase = createClient();
  return (
    <>
      <div className="bg-gray-900 w-full h-[36rem]"></div>
      <EventForm />
      <FAQ />
    </>
  );
}
