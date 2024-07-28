"use client";

import { DateData } from "@/lib/schema";
import { calculateTimeSlotBlocks } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

/*
Dates
[
  {
    end_datetime: '2024-07-30T23:00:00+00:00',
    start_datetime: '2024-07-30T21:00:00+00:00'
  },
  {
    end_datetime: '2024-08-02T23:00:00+00:00',
    start_datetime: '2024-08-02T21:00:00+00:00'
  },
  {
    end_datetime: '2024-08-03T23:00:00+00:00',
    start_datetime: '2024-08-03T21:00:00+00:00'
  }
]
*/

// Import dayjs
var dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const TimeSlotBigBlock = ({ dates }: { dates: DateData[] }) => {
  // TimeSlots
  const numVerticalSlots = calculateTimeSlotBlocks(
    dates[0].start_datetime,
    dates[0].end_datetime
  ); // 4
  const slots = Array.from(Array(numVerticalSlots + 1).keys());
  console.log("TimeSlotBigBlock slots", slots);

  console.log("TimeSlotBigBlock numberOfSlots", numVerticalSlots);
  console.log("TimeSlotBigBlock dates", dates);
  console.log("TimeSlotBigBlock startTime", dates[0].start_datetime);
  console.log("TimeSlotBigBlock endTime", dates[0].end_datetime);

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

  const handleMouseMove = (
    e: React.MouseEvent,
    time: string,
    multiplier: number
  ) => {
    console.log(
      `handleMouseMove - ${dayjs(time)
        .utc()
        .add(multiplier * 30, "minute")
        .format("YYYY/MM/DD HH:mm")}`
    );
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
    <div className="flex flex-col">
      <div className="flex h-[2rem]">
        {/* Date column label */}
        {dates.map((date, ind) => (
          <div key={ind} className="items-center grow">
            <h1 className="text-center">
              {dayjs(date.start_datetime).utc().format("MMM D")}
            </h1>
            <h1 className="text-center">
              {dayjs(date.start_datetime).utc().format("ddd")}
            </h1>
          </div>
        ))}
      </div>
      <div className="flex">
        {/* Time Slots */}
        {dates.map((date, ind) => {
          return (
            <div
              key={ind}
              className="text-primary-content grid place-content-center"
            >
              {slots.map((slot, s_ind) => {
                if (s_ind === 0) {
                  return (
                    <div
                      onMouseUp={(e) => {
                        mouseRef.current = false;
                        console.log(
                          `mouseUp - ${dayjs(date.start_datetime)
                            .utc()
                            .add(slot * 30, "minute")
                            .format("YYYY/MM/DD HH:mm")}`
                        );
                      }}
                      onMouseEnter={(e) => {
                        if (mouseRef.current == true)
                          console.log(
                            `handleMouseDrag - ${dayjs(date.start_datetime)
                              .utc()
                              .add(slot * 30, "minute")
                              .format("YYYY/MM/DD HH:mm")}`
                          );
                      }}
                      onMouseDown={(e) => {
                        mouseRef.current = true;
                        console.log("mouseDown");
                        console.log(ind, s_ind);
                      }}
                      key={s_ind}
                      className="w-[4rem] text-primary-content grid h-[2rem] place-content-center"
                    ></div>
                  );
                }
                return (
                  <div
                    onMouseUp={(e) => {
                      mouseRef.current = false;
                      console.log(
                        `mouseUp - ${dayjs(date.start_datetime)
                          .utc()
                          .add((slot - 1) * 30, "minute")
                          .format("YYYY/MM/DD HH:mm")}`
                      );
                    }}
                    onMouseEnter={(e) => {
                      if (mouseRef.current == true)
                        console.log(
                          `handleMouseDrag - ${dayjs(date.start_datetime)
                            .utc()
                            .add((slot - 1) * 30, "minute")
                            .format("YYYY/MM/DD HH:mm")}`
                        );
                    }}
                    onMouseDown={(e) => {
                      mouseRef.current = true;
                      console.log(
                        `mouseDown - ${dayjs(date.start_datetime)
                          .utc()
                          .add((slot - 1) * 30, "minute")
                          .format("YYYY/MM/DD HH:mm")}`
                      );
                    }}
                    key={s_ind}
                    className="w-[4rem] text-primary-content grid h-10 place-content-center bg-white border-b border-r border-dashed"
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotBigBlock;
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
