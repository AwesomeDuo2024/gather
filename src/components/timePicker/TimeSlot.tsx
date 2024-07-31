"use client";

import { ModeContext } from "@/app/theme-provider";
import { calculateTimeSlotBlocks } from "@/lib/utils";
import { useContext, useEffect } from "react";

// Import dayjs
var dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const TimeSlot = ({
  startTime,
  endTime,
  interval,
}: {
  startTime: string; // 2024-07-28T00:00:00+00:00
  endTime: string;
  interval: number; //30
}) => {
  const numberOfSlots = calculateTimeSlotBlocks(startTime, endTime); // 4
  const diffTime = dayjs(endTime).diff(dayjs(startTime), "hour");
  const timeSlots = [];
  const { mode, setMode } = useContext(ModeContext);

  // const { mode, setMode } = useMode();
  // console.log("TimeSlot - mode", mode);
  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log("timeout done");
  //     setMode("write");
  //   }, 3000);
  // }, []);

  // console.log("TimeSlot numberOfSlots", numberOfSlots);
  // console.log("TimeSlot startTime", startTime);
  // console.log("TimeSlot interval", interval);
  // console.log("TimeSlot diffTime", diffTime);
  // Start time = 2024-07-28T00:00:00+00:00

  // Parse the start time
  // 2024-07-28T00:00:00+00:00 -> 00:00:00
  for (let i = 0; i < diffTime; ++i) {
    timeSlots.push(dayjs(startTime).utc().add(i, "hour").format("h A"));
  }

  console.log("TimeSlot parsedSlots", timeSlots);

  // Output = ["12am", "1am", "2am"]

  return (
    <div className="flex flex-col flex-none mr-2">
      <h1 className="text-red-500 text-lg">{mode}</h1>
      <div className="h-[3rem]"></div>

      {timeSlots.map((item, ind) => (
        <div
          key={ind}
          onClick={() => {
            // console.log(
            //   `clicked blocked ${item.name.slice(0, item.name.length - 2)}`
            // );
          }}
          className="text-primary-content grow place-content-top"
        >
          <h1 className="text-sm">{item}</h1>
        </div>
      ))}
    </div>
  );
};

export default TimeSlot;
/*
{

}

*/

/*
[
  {
  user: "Bobby",
  timeslots: {
    {
      "9am": true,
      "9:30am":false,
      "10am": false,
    },
  }
]

"Bobby": {
  {
    "9am": true,
    "9:30am":false,
    "10am": false,
  },
"WR": {
    "9am": true,
    "9:30am":false,
    "10am": false,
  },
}

]


*/
