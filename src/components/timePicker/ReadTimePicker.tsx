"use client";
import { ModeContext } from "@/app/theme-provider";
import React, { useContext, useEffect, useState } from "react";
import { useTableDragSelect } from "use-table-drag-select";

const ReadTimePicker = ({
  readColor,
  readModeBody,
  dateHeaderDDD,
  dateHeaderMMMD,
}: {
  readColor: string;
  readModeBody: boolean[][];
  dateHeaderDDD: string[];
  dateHeaderMMMD: string[];
}) => {
  const [readRef, readValue] = useTableDragSelect(readModeBody);
  const [readSlots, setReadSlots] = useState<boolean[][]>(readValue);
  const { mode, setMode, effect, setEffect } = useContext(ModeContext);
  // console.log("ReadTimePicker readValue", readValue);
  // console.log("ReadTimePicker readSlots", readSlots);

  useEffect(() => {
    setReadSlots([
      [true, true, true],
      [true, true, true],
      [true, true, false],
      [true, true, false],
    ]);
  }, []);
  return (
    <table className="flex flex-col w-[50rem] order-1 read">
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
        {readValue.map((row, rowIndex) => (
          <tr
            onClick={() => {
              setEffect(crypto.randomUUID());
            }}
            className="flex lg:h-[1rem] bg-white"
            key={rowIndex}
          >
            {row.map((_, columnIndex) => (
              <td
                onClick={() => {
                  console.log("write clicked");
                }}
                key={columnIndex}
                className={`select-none flex-1 border-r border-gray-200 border-dashed
                 
                ${readSlots[rowIndex][columnIndex] ? "bg-red-500" : "white"}`}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReadTimePicker;
