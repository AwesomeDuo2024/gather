"use client";

import { ModeContext } from "@/app/theme-provider";
import { DateData } from "@/lib/schema";
import { calculateTimeSlotBlocks } from "@/lib/utils";
import { use, useContext, useEffect, useState } from "react";
import { useTableDragSelect } from "use-table-drag-select";
import { Button } from "../ui/button";
import Respondents from "../Respondents";

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

const TimeSlotDragSelector = ({
  body,
  dateHeaderDDD,
  dateHeaderMMMD,
  respondentsData,
}: {
  body: boolean[][];
  dateHeaderDDD: string[];
  dateHeaderMMMD: string[];
  respondentsData: { name: string; user_id: number }[] | null;
}) => {
  const { mode, setMode, effect, setEffect } = useContext(ModeContext);
  const [ref, value] = useTableDragSelect(body);
  useEffect(() => {
    // setTimeout(() => {
    //   console.log("timeout done");
    //   setMode("write");
    // }, 3000);
  }, [mode, setMode, effect]);
  const [name, setName] = useState<string>("");
  const updateName = (newName: string) => {
    setName(newName);
  };
  console.log("TimeSlotDragSelector - name", name);

  console.log("TimeSlotDragSelector value", value);
  console.log("TimeSlotDragSelector ref", ref);

  return (
    <div className="flex ">
      <Respondents
        respondentsData={respondentsData}
        updateName={updateName}
        timeSlots={value}
      />

      <table ref={ref} className="flex flex-col w-[50rem] order-1">
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
                <tr
                  onClick={() => {
                    setEffect(crypto.randomUUID());
                  }}
                  className="flex lg:h-[1rem] bg-white"
                  key={rowIndex}
                >
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
                       value[rowIndex][columnIndex]
                         ? "bg-red-500"
                         : "bg-red-300"
                     }`}
                  />
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TimeSlotDragSelector;
