"use client";

import { ModeContext } from "@/app/theme-provider";
import { DateData } from "@/lib/schema";
import { calculateTimeSlotBlocks } from "@/lib/utils";
import { use, useContext, useEffect, useState } from "react";
import { useTableDragSelect } from "use-table-drag-select";
import { Button } from "../ui/button";

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

*/

const TimeSlotDragSelector = ({ dates }: { dates: DateData[] }) => {
  const { mode, setMode } = useContext(ModeContext);
  useEffect(() => {
    // setTimeout(() => {
    //   console.log("timeout done");
    //   setMode("write");
    // }, 3000);
  }, [mode, setMode]);

  console.log("TimeSlotDragSelector - mode", mode);

  const v: number = 0;

  // Header
  const dateHeaderMMMD = dates.map((date) =>
    dayjs(date.start_datetime).utc().format("MMM D")
  );
  const dateHeaderDDD = dates.map((date) =>
    dayjs(date.start_datetime).utc().format("ddd")
  );

  console.log("TimeSlotDragSelector dateHeaderMMMD", dateHeaderMMMD);

  // Body of Array
  // Column
  const columnCount = dateHeaderMMMD.length;

  // Row
  const rowCount = calculateTimeSlotBlocks(
    dates[0].start_datetime,
    dates[0].end_datetime
  );

  const body: boolean[][] = [];
  const temp: boolean[] = [];
  for (let i = 0; i < columnCount; i++) {
    temp.push(false);
  }

  for (let i = 0; i < rowCount; i++) {
    body.push(temp);
  }

  console.log("TimeSlotDragSelector - body", body);
  const [ref, value] = useTableDragSelect(body);

  console.log("TimeSlotDragSelector value", value);
  console.log("TimeSlotDragSelector ref", ref);

  return (
    <table ref={ref} className="flex flex-col w-[50rem]">
      <thead className="flex flex-col items-stretch">
        <tr className="flex">
          <th></th>
          {dateHeaderMMMD.map((date, ind) => (
            <th className="flex-1" key={ind}>
              {date}
            </th>
          ))}
        </tr>
        <tr className="flex">
          <th></th>
          {dateHeaderDDD.map((date, ind) => (
            <th className="flex-1" key={ind}>
              {date}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="flex flex-col divide-y  border-2 border-solid border-gray-400">
        {value.map((row, rowIndex) =>
          mode == "read" ? (
            <>
              <tr className="flex h-[1rem] bg-white" key={rowIndex}>
                {/* <tr className="flex w-full h-[1rem]"></tr> */}
                {/* {row.map((_, columnIndex) => (
                  <td
                    onClick={() => {
                      console.log("clicked");
                    }}
                    key={columnIndex}
                    className={`select-none flex-1 h-[1rem] border-r border-gray-200 border-dashed bg-white
                  }
          `}
                  />
                ))} */}
              </tr>
            </>
          ) : (
            <tr className="flex h-[1rem]" key={rowIndex}>
              {row.map((_, columnIndex) => (
                <td
                  key={columnIndex}
                  className={`select-none flex-1 border-r border-gray-200 border-dashed bg-red-500
                     ${
                       value[rowIndex][columnIndex] ? "bg-red-500" : "bg-white"
                     }`}
                />
              ))}
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default TimeSlotDragSelector;
