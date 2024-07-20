import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const DayPicker = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  return (
    <main>
      <Calendar
        mode="multiple"
        selected={selectedDates}
        onSelect={(dates) => {
          setSelectedDates(dates || []);
          console.log(dates);
        }}
        className="rounded-md border caret-transparent flex justify-center"
        // Disable past dates => pass Matcher prop https://daypicker.dev/next/api/type-aliases/Matcher
        disabled={{ before: new Date() }}
        // Set earliest month to current month so users cannot navigate to past months https://daypicker.dev/using-daypicker/navigation#disabling-navigation
        fromMonth={new Date()}
        // Set default value of showOutsideDays to false
      />
    </main>
  );
};
export default DayPicker;
