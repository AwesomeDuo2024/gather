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
  // const people = [
  //   {
  //     name: "9am",
  //     email: "leslie.alexander@example.com",
  //     role: "Co-Founder / CEO",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //     lastSeen: "3h ago",
  //     lastSeenDateTime: "2023-01-23T13:23Z",
  //   },
  //   {
  //     name: "10am",
  //     email: "leslie.alexander@example.com",
  //     role: "Co-Founder / CEO",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //     lastSeen: "3h ago",
  //     lastSeenDateTime: "2023-01-23T13:23Z",
  //   },
  //   {
  //     name: "11am",
  //     email: "leslie.alexander@example.com",
  //     role: "Co-Founder / CEO",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //     lastSeen: "3h ago",
  //     lastSeenDateTime: "2023-01-23T13:23Z",
  //   },
  //   {
  //     name: "12am",
  //     email: "leslie.alexander@example.com",
  //     role: "Co-Founder / CEO",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //     lastSeen: "3h ago",
  //     lastSeenDateTime: "2023-01-23T13:23Z",
  //   },
  //   {
  //     name: "1pm",
  //     email: "leslie.alexander@example.com",
  //     role: "Co-Founder / CEO",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //     lastSeen: "3h ago",
  //     lastSeenDateTime: "2023-01-23T13:23Z",
  //   },
  //   {
  //     name: "2pm",
  //     email: "leslie.alexander@example.com",
  //     role: "Co-Founder / CEO",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //     lastSeen: "3h ago",
  //     lastSeenDateTime: "2023-01-23T13:23Z",
  //   },
  // ];

  /** Time
            <div className="bg-yellow-200 flex flex-col w-2/12">
            <div className="bg-gray-200 text-primary-content grid h-10 place-items-end content-start rounded">
              {item.name}
            </div>
          </div>
   * 
   */

  // const style =

  return (
    <div className="w-[50rem] bg-blue-200 ">
      {/* <h1>Jul 22</h1>
      <h1>Mon</h1> */}

      {slots.map((item, ind) => (
        <div className="bg-gray flex gap-2" key={ind}>
          <div className="flex flex-col w-2/12 border-solid border border-gray-200">
            <div
              onClick={() => {
                console.log(
                  `${dayjs(startTime)
                    .add(ind * 30, "minute")
                    .utc()
                    .format("h:mm")}`
                );
              }}
              className="text-primary-content grid h-10 place-content-center"
            ></div>
          </div>
        </div>
      ))}
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
