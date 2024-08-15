"use client";
import { ModeContext } from "@/app/theme-provider";
import { AvailabilityDataType } from "@/lib/schema";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTableDragSelect } from "use-table-drag-select";
import TimeSlot from "@/components/timePicker/TimeSlot";

// const transformNestedBoolToNestedNum = (a) =>
//   a.map((v1) => v1.map((v2) => v2.map((v3) => (v3 == true ? 1 : 0))));

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

const ReadTimePicker = ({
  availabilities,
  readColor,
  readModeBody,
  dateHeaderDDD,
  dateHeaderMMMD,
  startTime,
  endTime,
}: {
  availabilities?: boolean[][];
  readColor: string;
  readModeBody?: boolean[][];
  dateHeaderDDD: string[];
  dateHeaderMMMD: string[];
  startTime: string;
  endTime: string;
}) => {
  // if the data passed in is of AvailabilityDataType
  const [readRef, readValue] = useTableDragSelect(readModeBody);
  console.log("HERERERERER");
  console.log(startTime, endTime);

  console.log("readValue", readValue);
  console.log("readRef", readValue);
  // const readSlots = useRef(readValue);
  const { mode, setMode, effect, setEffect } = useContext(ModeContext);
  return (
    <div className="flex w-full">
      <div className="flex flex-col mr-2">
        <div className="sticky top-0 bg-white h-20 text-transparent">.</div>
        <TimeSlot startTime={startTime!} endTime={endTime!} />
      </div>
      <table className="flex flex-col order-1 flex-1">
        <thead className="flex flex-col sticky top-0 py-3 bg-white z-10">
          <tr className="flex">
            <th></th>
            {dateHeaderMMMD.map((date, ind) => (
              <th className="flex-1 text-sm" key={ind}>
                {date}
              </th>
            ))}
          </tr>
          <tr className="flex">
            <th></th>
            {dateHeaderDDD.map((date, ind) => (
              <th className="flex-1 text-sm font-normal mb-2" key={ind}>
                {date}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="flex flex-col divide-y border-2 border-solid border-gray-400">
          {readValue.map((row, rowIndex) => (
            <tr
              onClick={() => {
                setEffect(crypto.randomUUID());
              }}
              // Adjust cell size
              className="flex h-[1.5rem]"
              key={rowIndex}
            >
              {row.map((_, columnIndex) => (
                <td
                  onClick={() => {
                    console.log("write clicked");
                  }}
                  key={columnIndex}
                  className={`select-none flex-1 border-r border-gray-200 border-dashed
                
                ${readValue[rowIndex][columnIndex] ? "bg-red-500" : "white"}`}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReadTimePicker;
