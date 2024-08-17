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
}: {
  startTime: string; // 2024-07-28T00:00:00+00:00
  endTime: string;
}) => {
  const numberOfSlots = calculateTimeSlotBlocks(startTime, endTime); // 4
  const diffTime = dayjs(endTime).diff(dayjs(startTime), "hour");
  const timeSlots = [];

  // Parse the start time
  // 2024-07-28T00:00:00+00:00 -> 00:00:00
  for (let i = 0; i < diffTime; ++i) {
    timeSlots.push(dayjs(startTime).utc().add(i, "hour").format("h a"));
  }
  
  return (
    <>
    {/* Change gap size here to align with table row */}
      <div className="flex flex-col mt-1 gap-8">
        {timeSlots.map((item, ind) => (
          <div
            key={ind}
            onClick={() => {}}
            className="text-primary-content text-xs grow place-content-top"
          >
            {item}
          </div>
        ))}
      </div>
    </>
  );
};

export default TimeSlot;
