"use client";

import { calculateTimeSlotBlocks } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

// Import dayjs
var dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const TimeSlotBlock = ({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) => {
  // TimeSlots
  const numberOfSlots = calculateTimeSlotBlocks(startTime, endTime); // 4
  const slots = Array.from(Array(numberOfSlots).keys());

  // console.log("TimeSlotBlock numberOfSlots", numberOfSlots);
  // console.log("TimeSlotBlock slots", slots);
  // console.log("TimeSlotBlock numberOfSlots", numberOfSlots);
  // console.log("TimeSlotBlock startTime", startTime);
  // console.log("TimeSlotBlock endTime", endTime);

  const mouseRef = useRef<boolean>(false);
  // const [isMouseDown, setIsMouseDown] = useState(false);
  // Mouse Events
  const handleMouseDown = (
    e: React.MouseEvent,
    time: string,
    multiplier: number
  ) => {
    mouseRef.current = true;
    console.log(
      `handleMouseDown - ${dayjs(time)
        .utc()
        .add(multiplier * 30, "minute")
        .format("YYYY/MM/DD HH:mm")}`
    );
  };
  //   mouseRef.current = !mouseRef.current;
  //   console.log(mouseRef.current);
  // };
  const handleMouseUp = (
    e: React.MouseEvent,
    time: string,
    multiplier: number
  ) => {
    mouseRef.current = false;
    console.log(
      `handleMouseUp - ${dayjs(time)
        .utc()
        .add(multiplier * 30, "minute")
        .format("YYYY/MM/DD HH:mm")}`
    );
  };
  //   mouseRef.current = !mouseRef.current;
  //   console.log(mouseRef.current);
  // };
  const handleMouseMove = (
    e: React.MouseEvent,
    time: string,
    multiplier: number
  ) => {
    // if (mouseRef.current === true) {

    // console.log("mouseRef", mouseRef.current);
    console.log(
      `handleMouseMove - ${dayjs(time)
        .utc()
        .add(multiplier * 30, "minute")
        .format("YYYY/MM/DD HH:mm")}`
    );
    // }
  };

  const handleMouseDrag = (
    e: React.MouseEvent,
    time: string,
    multiplier: number
  ) => {
    if (!mouseRef.current) return;
    console.log(
      `handleMouseDrag - ${dayjs(time)
        .utc()
        .add(multiplier * 30, "minute")
        .format("YYYY/MM/DD HH:mm")}`
    );
  };

  return (
    <div className="flex-1">
      <div className="h-[5rem] flex flex-col items-center justify-end">
        <h1>{dayjs(startTime).utc().format("MMM D")}</h1>
        <h1>{dayjs(startTime).utc().format("ddd")}</h1>
      </div>
      <div className="flex flex-col border border-solid">
        {slots.map((item, ind) => (
          <div
            key={ind}
            // onClick={(e: React.MouseEvent) => handleClick(startTime, ind)}
            onMouseUp={(e: React.MouseEvent) =>
              handleMouseUp(e, startTime, ind)
            }
            onMouseDown={(e: React.MouseEvent) =>
              handleMouseDown(e, startTime, ind)
            }
            // onMouseEnter={(e) => handleMouseMove(e, startTime, ind)}
            onMouseMove={(e) => handleMouseDrag(e, startTime, ind)}
            className={
              ind % 2 == 0
                ? "text-primary-content grid h-10 place-content-center bg-white border-b border-dashed"
                : "text-primary-content grid h-10 place-content-center bg-white border-b border-solid"
            }
          ></div>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotBlock;
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
