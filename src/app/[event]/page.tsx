import Link from "next/link";
import { createClient } from "@/app/utils/supabase/server";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateEventForm from "@/components/eventform/UpdateEventForm";
import {
  getCurrentEventName,
  getCurrentEventStartTime,
  getCurrentEventEndTime,
  getCurrentEventDates,
} from "@/lib/utils";
import { FetchedData } from "@/lib/schema";
import ClipboardButton from "@/components/ClipboardButton";

const EventPage = async ({ params }: { params: { event: string } }) => {
  // Fetch data from Supabase
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Event")
    .select(`event_name, id, Date (start_datetime, end_datetime)`)
    .eq("event_link", params.event);

  // Extract event id from fetched data
  const currentEventId = data && data[0]?.id;
  
  // Extract event name from fetched data
  const currentEventName = getCurrentEventName(data as FetchedData[]);
  // console.log(currentEventName);

  // Extract event start and end time
  const currentEventStartTime = getCurrentEventStartTime(data as FetchedData[]);
  const currentEventEndTime = getCurrentEventEndTime(data as FetchedData[]);
  // console.log("START", currentEventStartTime, "END", currentEventEndTime);

  // Extract event dates (string) and convert each to Date objects
  const currentEventDates = getCurrentEventDates(data as FetchedData[]);
  // console.log(currentEventDates);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="my-4">
            Edit Event
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[30rem] max-h-[90%] justify-center">
          <DialogHeader>
            <DialogTitle className="mb-2">Update event details</DialogTitle>
            <DialogDescription className="text-gray-600">
              Any invitee can update this event
            </DialogDescription>
          </DialogHeader>
          <UpdateEventForm
            eventName={currentEventName}
            eventStartTime={currentEventStartTime}
            eventEndTime={currentEventEndTime}
            eventDates={currentEventDates}
            eventId={currentEventId}
          />
        </DialogContent>
      </Dialog>
      <ClipboardButton />
      <Link href="/" className="p-4 bg-blue-400">
        Return to Home Button
      </Link>
    </>
  );
};
export default EventPage;
