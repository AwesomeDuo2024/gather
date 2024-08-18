"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/router";

const ScheduleCalendarEventButton = ({ eventName }: { eventName: string }) => {
  // === Event Parameters & Sample ===
  // https:github.com/InteractionDesignFoundation/add-event-to-calendar-docs/blob/main/services/google.md
  // calendar.google.com/calendar/u/0/r/eventedit?text=Event1&dates=20240723T074500Z/20240723T083000Z&details=%0A%0AThis+event+was+scheduled+with+schej:+https://schej.it/e/669203163c66f0b271e41e8d&ctz=Asia/Magadan&add

  const handleClick = () => {
    // ===== TO DO =====
    // To pass in dates from multiple time picker component. Optional to pass in timezone, guests etc.
    const params = {
      text: eventName,
      dates: "20240723T074500/20240723T083000",
      details: `Gather+Event+Link:+${window.location.href}`,
      timezone: "Singapore",
      guests: "example.com,bobby@gmail.com",
    };

    window.location.href = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${params.text}&dates=${params.dates}&details=${params.details}&ctz=${params.timezone}&add=${params.guests}`;
  };

  return (
    <Button variant="outline" onClick={handleClick} className="mt-2">
      <Image src="/gmail.svg" alt="Gmail logo" width={20} height={20} />
    </Button>
  );
};
export default ScheduleCalendarEventButton;
