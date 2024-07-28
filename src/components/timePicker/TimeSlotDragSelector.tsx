"use client";

import { DateData } from "@/lib/schema";
import { calculateTimeSlotBlocks } from "@/lib/utils";
import { useTableDragSelect } from "use-table-drag-select";

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
*/

const TimeSlotDragSelector = ({ dates }: { dates: DateData[] }) => {
  console.log("TimeSlotDragSelector dates", dates);

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
      <tbody className="flex flex-col divide-y">
        {value.map((row, rowIndex) => (
          <tr className="flex" key={rowIndex}>
            {/* <th>{rowIndex + 1}</th> */}
            {/* <th className="flex-0 w-[5rem]">{`${dayjs(dates[0].start_datetime)
              .utc()
              .add(30 * (rowIndex + 1), "minute")
              .format("h:mm A")}`}</th> */}
            {row.map((_, columnIndex) => (
              <td
                key={columnIndex}
                className={`select-none flex-1 h-[2rem] border-r border-gray-200 border-dashed ${
                  value[rowIndex][columnIndex] ? "bg-red-500" : "bg-white"
                }`}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TimeSlotDragSelector;
