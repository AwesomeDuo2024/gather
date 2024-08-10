"use client";

import { ModeContext } from "@/app/theme-provider";
import { useContext, useState } from "react";
import { useTableDragSelect } from "use-table-drag-select";
import WriteTimePicker from "./WriteTimePicker";
import ReadTimePicker from "./ReadTimePicker";
import Respondents from "../Respondents";
import { DateData } from "@/lib/schema";
import { calculateTimeSlotBlocks } from "@/lib/utils";

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
  availabilities,
  dates,
  eventId,
  respondentsData,
}: {
  availabilities: {
    user_id: number;
    timeslots: boolean[][];
    availability_id: string;
  }[];
  dates: DateData[];
  eventId: string;
  respondentsData: { name: string; user_id: number }[] | null;
}) => {
  console.log("==========TimeSlotDragSelector================");
  console.log("availabilities", availabilities);

  // ============= Calculate time slots ============= //
  // Header
  const dateHeaderMMMD = dates?.map((date) =>
    dayjs(date.start_datetime).utc().format("MMM D")
  );
  const dateHeaderDDD = dates?.map((date) =>
    dayjs(date.start_datetime).utc().format("ddd")
  );

  // Body of Array
  // Column
  const columnCount = dateHeaderMMMD?.length;

  // Row
  const rowCount = calculateTimeSlotBlocks(
    dates![0].start_datetime,
    dates![0].end_datetime
  );

  const readModeBody: boolean[][] = [];
  const writeModeBody: boolean[][] = [];
  const readRowArray: boolean[] = new Array(columnCount).fill(false);
  const writeRowArray: boolean[] = new Array(columnCount).fill(false);

  for (let i = 0; i < rowCount; i++) {
    readModeBody.push(readRowArray);
    writeModeBody.push(writeRowArray);
  }
  console.log("writeModeBody", writeModeBody);

  const { mode, setMode, effect, setEffect } = useContext(ModeContext);
  const [writeBody, setWriteBody] = useState<boolean[][]>(writeModeBody);
  const [readColor, setReadColor] = useState("bg-white");
  const [name, setName] = useState<string>("");

  // const updateReadColor = (newColor: string) => {
  //   setReadColor(newColor);
  // };

  const updateWriteSlots = (newSlots: boolean[][]) => {
    setWriteBody([...newSlots]);
  };

  // const updateName = (newName: string) => {
  //   setName(newName);
  // };

  console.log("writeBody", writeBody);
  return (
    <div className="flex">
      {mode == "read" && availabilities.length > 0 && (
        <>
          <ReadTimePicker
            readColor={readColor}
            readModeBody={availabilities[1].timeslots}
            dateHeaderDDD={dateHeaderDDD}
            dateHeaderMMMD={dateHeaderMMMD}
          />
        </>
      )}
      {mode == "read" && availabilities.length == 0 && (
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
            updateWriteSlots={updateWriteSlots}
            writeModeBody={writeBody}
            dateHeaderDDD={dateHeaderDDD}
            dateHeaderMMMD={dateHeaderMMMD}
          />
        </>
      )}
      <Respondents
        updateWriteSlots={updateWriteSlots}
        writeModeBody={writeBody}
        eventId={eventId}
        respondentsData={respondentsData}
      />
    </div>
  );
};

export default TimeSlotDragSelector;
