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

  /*
[ Jul 30 |Aug 2 |Aug 3
  [false, false, false], 
  [false, false, false],
  [false, false, false],
  [false, false, false]
]

*/

  // Parse the start time
  // 2024-07-28T00:00:00+00:00 -> 00:00:00
  for (let i = 0; i < diffTime; ++i) {
    timeSlots.push(dayjs(startTime).utc().add(i, "hour").format("h A"));
  }

  console.log("TimeSlot parsedSlots", timeSlots);

  // Output = ["12am", "1am", "2am"]
  {
    /* <button className="px-6 py-2 bg-black text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
  Figma
</button> */
  }
  return (
    <>
      <div className="flex flex-col flex-none mr-2">
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
    </>
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
