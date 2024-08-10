"use client";

import { ModeContext } from "@/app/theme-provider";
import { DateData } from "@/lib/schema";
import { calculateTimeSlotBlocks } from "@/lib/utils";
import { use, useContext, useEffect, useRef, useState } from "react";
import { useTableDragSelect } from "use-table-drag-select";
import { Button } from "../ui/button";
import Respondents from "../Respondents";
import ReadTimeSlot from "./WriteTimePicker";
import WriteTimePicker from "./WriteTimePicker";
import ReadTimePicker from "./ReadTimePicker";
import { useRouter } from "next/navigation";

var dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
/*
       [
21:00  [false false false],
21:30  [false false false],
22:00  [false false false],
22:30  [false false false]
    ]


[
[false false false],
[false false false],
[false false false],
[false false false]
]

[
[10 100 100],
[100 1000 100000],
[100 1000 100000],
[100 1000 100000]
]

Each new participant has a weight that is (num_of_participant)  * 10
-- p1 = 10
-- p2 = 100
-- p3 = 1000
-- p4 = 10000
-- p5 = 100000

Color: (in order of IF statement)
-- weight >= 100000: darkest red
-- weight >= 10000: dark red
-- weight >= 1000: red
-- weight >= 100: light red
-- weight >= 10: lightest red


[ Jul 30 |Aug 2 |Aug 3
  [false, false, false], 
  [false, false, false],
  [false, false, false],
  [false, false, false]
]
*/

const TimeSlotDragSelector = ({
  eventId,
  readModeBody,
  writeModeBody,
  dateHeaderDDD,
  dateHeaderMMMD,
  respondentsData,
}: {
  eventId: number;
  readModeBody: boolean[][];
  writeModeBody: boolean[][];
  dateHeaderDDD: string[];
  dateHeaderMMMD: string[];
  respondentsData: { name: string; user_id: number }[] | null;
}) => {
  console.log("==========TimeSlotDragSelector================");

  const { mode, setMode, effect, setEffect } = useContext(ModeContext);

  const [ref, value] = useTableDragSelect(writeModeBody);
  const [readColor, setReadColor] = useState("bg-white");
  const [name, setName] = useState<string>("");

  const updateReadColor = (newColor: string) => {
    setReadColor(newColor);
  };

  const updateSlots = (newSlots: boolean[][]) => {};

  const updateName = (newName: string) => {
    setName(newName);
  };

  console.log("TimeSlotDragSelector renders");
  console.log("TimeSlotDragSelector - respondentsData", respondentsData);

  return (
    <div className="flex">
      {mode == "read" && (
        <>
          <ReadTimePicker
            readColor={readColor}
            readModeBody={readModeBody}
            dateHeaderDDD={dateHeaderDDD}
            dateHeaderMMMD={dateHeaderMMMD}
          />
        </>
      )}
      {mode == "write" && (
        <>
          <WriteTimePicker
            writeModeBody={writeModeBody}
            dateHeaderDDD={dateHeaderDDD}
            dateHeaderMMMD={dateHeaderMMMD}
          />
        </>
      )}
      <Respondents
        updateSlots={updateSlots}
        updateReadColor={updateReadColor}
        eventId={eventId}
        respondentsData={respondentsData}
        updateName={updateName}
        timeSlots={value}
      />
    </div>
  );
};

export default TimeSlotDragSelector;
