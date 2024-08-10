import Link from "next/link";
import { createClient } from "@/app/utils/supabase/server";

import {
  getCurrentEventName,
  getCurrentEventStartTime,
  getCurrentEventEndTime,
  getCurrentEventDates,
  calculateTimeSlotBlocks,
} from "@/lib/utils";
import { FetchedData } from "@/lib/schema";
import TimeSlot from "@/components/timePicker/TimeSlot";
import { DateData } from "@/lib/schema";
import TimeSlotDragSelector from "@/components/timePicker/TimeSlotDragSelector";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UpdateEventForm from "@/components/eventform/UpdateEventForm";
import ClipboardButton from "@/components/ClipboardButton";
import Respondents from "@/components/Respondents";

var dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const EventPage = async ({ params }: { params: { event: string } }) => {
  // in URL = http://localhost:3000/6f35722e-1cc1-4448-a5e5-bcb77b9f8c8f
  // params.event = 6f35722e-1cc1-4448-a5e5-bcb77b9f8c8f

  // Fetch data from Supabase
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Event")
    .select(
      `event_name, id, Date (start_datetime, end_datetime), User (user_id, name)`
    )
    .eq("event_link", params.event);

  if (error) {
    console.error("Error fetching data from Supabase", error);
  } else {
    console.log("EventPage data - ", JSON.stringify(data));
  }

  const dates = data![0].Date.sort(
    (a, b) => dayjs(a.start_datetime) - dayjs(b.start_datetime)
  ) as DateData[];

  const endTime = data![0].Date[0].end_datetime;
  const startTime = data![0].Date[0].start_datetime;

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

  // Extract respondents data to be used in Respondents component
  const respondentsData = data && data[0].User;
  console.log("EventPage - respondentsData", respondentsData);

  // const timeSlots = calculateTimeSlotBlocks(startTime, endTime);
  // console.log("EventPage timeSlots", timeSlots);

  // const [name, setName] = useState<string>("");

  // ============= Calculate time slots ============= //
  // Header
  const dateHeaderMMMD = dates.map((date) =>
    dayjs(date.start_datetime).utc().format("MMM D")
  );
  const dateHeaderDDD = dates.map((date) =>
    dayjs(date.start_datetime).utc().format("ddd")
  );

  // console.log("TimeSlotDragSelector dateHeaderMMMD", dateHeaderMMMD);

  // Body of Array
  // Column
  const columnCount = dateHeaderMMMD.length;

  // Row
  const rowCount = calculateTimeSlotBlocks(
    dates[0].start_datetime,
    dates[0].end_datetime
  );

  const readModeBody: boolean[][] = [];
  const writeModeBody: boolean[][] = [];
  const temp: boolean[] = [];
  for (let i = 0; i < columnCount; i++) {
    temp.push(false);
  }

  for (let i = 0; i < rowCount; i++) {
    readModeBody.push(temp);
    writeModeBody.push(temp);
  }

  return (
    <>
      <div className="flex bg-red-200 w-[100%] items-center gap-5 justify-center">
        {/* TimePicker */}
        <div className="flex w-[50rem]">
          {/* TimeSlot */}
          <TimeSlot startTime={startTime} endTime={endTime} />
          {/* Time */}
          <TimeSlotDragSelector
            eventId={currentEventId}
            respondentsData={respondentsData}
            readModeBody={readModeBody}
            writeModeBody={writeModeBody}
            dateHeaderDDD={dateHeaderDDD}
            dateHeaderMMMD={dateHeaderMMMD}
          />
          <Respondents
            eventId={params.event}
            respondentsData={respondentsData}
          />
        </div>

        {/* <div className="flex flex-col bg-yellow-200">
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
          <Respondents respondentsData={respondentsData} />
          <Link href="/" className="p-4 bg-blue-400">
            Return to Home Button
          </Link>
        </div> */}
      </div>
    </>
  );
};
export default EventPage;
