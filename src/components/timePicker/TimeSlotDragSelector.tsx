"use client";

import { ModeContext } from "@/app/theme-provider";
import { useContext, useState } from "react";
import WriteTimePicker from "./WriteTimePicker";
import ReadTimePicker from "./ReadTimePicker";
import Respondents from "../Respondents";
import { AvailabilityDataType, DateData } from "@/lib/schema";
import { calculateTimeSlotBlocks } from "@/lib/utils";
import MultipleReadTimePicker from "./MultipleReadTimePicker";
import ScheduleCalendarEventButton from "@/components/ScheduleCalendarEventButton";

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

const compare = (a1: any[], a2: any[]) => {
  return a1.map((val, idx) => {
    return val.map((v: any, index: any) => {
      return v | a2[idx][index] ? true : false;
    });
  });
};

const addNestedArrays = (arr1: number[][], arr2: number[][]) => {
  // Initialize an empty array to store the result
  let result = [];

  // Iterate through each row
  for (let i = 0; i < arr1.length; i++) {
    // Initialize an empty row for the result
    let row = [];

    // Iterate through each column
    for (let j = 0; j < arr1[i].length; j++) {
      // Add the corresponding elements from arr1 and arr2
      row.push(arr1[i][j] + arr2[i][j]);
    }

    // Push the resulting row to the result array
    result.push(row);
  }

  // Return the result
  return result;
};

const filterAndtransformNestedBoolToNestedNum = (
  availabilities: AvailabilityDataType[]
): number[][] | null => {
  const filtered_availabilities = availabilities.map(
    (avail) => avail.timeslots
  );

  const transformed_availabilities = filtered_availabilities.map((v1) =>
    v1.map((v2) => v2.map((v3) => (v3 == true ? 1 : 0)))
  );

  if (availabilities.length > 1) {
    console.log("availability length > 1");
    // return [...availabilities][1].timeslots.map((row) => row);
    let temp = addNestedArrays(
      transformed_availabilities[0],
      transformed_availabilities[1]
    );
    for (let i = 2; i < transformed_availabilities.length; ++i) {
      const newTemp = [...temp];
      console.log("newTemp", newTemp);
      temp = addNestedArrays([...newTemp], transformed_availabilities[i]);
    }
    console.log("temp", temp);
    return temp.map((row) => row);
  } else if (availabilities.length == 1) {
    console.log("availability length = 0");
    const returnThis: unknown | number[][] = filtered_availabilities
      .map((v1) => v1.map((v2) => v2.map((v3) => (v3 == true ? 1 : 0))))
      .flat();
    console.log(JSON.stringify(returnThis));
    return returnThis as number[][];
  } else {
    return null;
  }
};

function findAvailabilities(
  availabilities: AvailabilityDataType[]
): boolean[][] | null {
  const filtered_availabilities = availabilities.map(
    (avail) => avail.timeslots
  );

  if (availabilities.length > 1) {
    console.log("availability length > 1");
    // return [...availabilities][1].timeslots.map((row) => row);
    let temp = compare(filtered_availabilities[0], filtered_availabilities[1]);
    for (let i = 2; i < filtered_availabilities.length; ++i) {
      const newTemp = [...temp];
      console.log("newTemp", newTemp);
      temp = compare([...newTemp], filtered_availabilities[i]);
    }
    console.log("temp", temp);
    return temp.map((row) => row);
  } else if (availabilities.length == 1) {
    console.log("availability length = 0");
    return [...availabilities][0].timeslots.map((row) => row);
  } else {
    return null;
  }
}

const TimeSlotDragSelector = ({
  availabilities,
  dates,
  eventId,
  respondentsData,
  startTime,
  endTime,
  eventName,
}: {
  availabilities: AvailabilityDataType[];
  dates: DateData[];
  eventId: string;
  respondentsData: { name: string; user_id: number }[] | null;
  startTime: string | undefined;
  endTime: string | undefined;
  eventName: string;
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

  // To toggle best times switch. Pass state and handler to switch in Respondents component
  // Pass state to MultipleReadTimePicker component to change cell color
  const [isChecked, setIsChecked] = useState<boolean>(false);

  // const updateReadColor = (newColor: string) => {
  //   setReadColor(newColor);
  // };

  const updateWriteSlots = (newSlots: boolean[][]) => {
    setWriteBody([...newSlots]);
  };

  const modifiedAvailabilities = findAvailabilities(availabilities!);
  console.log("modifiedAvailabilities", modifiedAvailabilities);
  console.log("writeBody", writeBody);

  const transformedAvailabilities = filterAndtransformNestedBoolToNestedNum(
    availabilities!
  );
  console.log("transformedAvailabilities", transformedAvailabilities);
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-12">
      <div className="w-full">
        {mode == "read" && availabilities.length > 0 && (
          <>
            <MultipleReadTimePicker
              readColor={readColor}
              availabilities={modifiedAvailabilities!}
              commonAvailability={transformedAvailabilities!}
              dateHeaderDDD={dateHeaderDDD}
              dateHeaderMMMD={dateHeaderMMMD}
              startTime={startTime!}
              endTime={endTime!}
              toggleBestTimeslot={isChecked}
            />
            <ScheduleCalendarEventButton eventName={eventName} />
          </>
        )}
        {mode == "read" && availabilities.length == 0 && (
          <>
            <ReadTimePicker
              readColor={readColor}
              readModeBody={readModeBody}
              dateHeaderDDD={dateHeaderDDD}
              dateHeaderMMMD={dateHeaderMMMD}
              startTime={startTime!}
              endTime={endTime!}
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
              startTime={startTime!}
              endTime={endTime!}
            />
          </>
        )}
      </div>
      <div className="lg:w-1/4">
        <Respondents
          updateWriteSlots={updateWriteSlots}
          writeModeBody={writeBody}
          eventId={eventId}
          respondentsData={respondentsData}
          toggleBestTimeslot={isChecked}
          setToggleBestTimeslot={setIsChecked}
        />
      </div>
    </div>
  );
};

export default TimeSlotDragSelector;
