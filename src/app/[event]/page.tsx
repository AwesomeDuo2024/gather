import Link from "next/link";
import { createClient } from "@/app/utils/supabase/server";
import { Button } from "@/components/ui/button";

const EventPage = async ({ params }: { params: { event: string } }) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Event")
    .select(`event_link, Date (start_datetime, end_datetime)`)
    .eq("event_link", params.event);
  return (
    <>
      <div>
        <p>Event Page where user indicates availability timeslots</p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <Button variant="default" className="my-4">
        Edit Event
      </Button>
      <Link href="/" className="p-4 bg-blue-400">
        Return to Home Button
      </Link>
    </>
  );
};
export default EventPage;
