"use client";

import { calculateTimeSlotBlocks } from "@/lib/utils";

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
  const numberOfSlots = calculateTimeSlotBlocks(startTime, endTime); // 4
  console.log("TimeSlotBlock numberOfSlots", numberOfSlots);

  const slots = Array.from(Array(numberOfSlots).keys());

  console.log("TimeSlotBlock slots", slots);
  console.log("TimeSlotBlock numberOfSlots", numberOfSlots);
  console.log("TimeSlotBlock startTime", startTime);
  console.log("TimeSlotBlock endTime", endTime);

  return (
    <div className="flex-1">
      <div className="h-[5rem] flex flex-col items-center justify-end">
        <h1>{dayjs(startTime).format("MMM D")}</h1>
        <h1>{dayjs(startTime).format("ddd")}</h1>
      </div>
      <div className="flex flex-col  border border-solid">
        {slots.map((item, ind) => (
          <div
            key={ind}
            onClick={() => {
              console.log(
                `${dayjs(startTime)
                  .add(ind * 30, "minute")
                  .utc()
                  .format("HH:mm")}`
              );
            }}
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
