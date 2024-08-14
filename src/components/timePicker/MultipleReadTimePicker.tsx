"use client";
import { ModeContext } from "@/app/theme-provider";
// import { findAvailabilities } from "@/lib/actions";
import React, { useContext, useEffect, useState } from "react";

const MultipleReadTimePicker = ({
  availabilities,
  readColor,
  commonAvailability,
  dateHeaderDDD,
  dateHeaderMMMD,
}: {
  availabilities: boolean[][];
  readColor: string;
  commonAvailability: number[][];
  dateHeaderDDD: string[];
  dateHeaderMMMD: string[];
}) => {
  console.log("========= MultipleReadTimePicker =========");
  console.log("availabilities", availabilities);
  console.log("commonAvailability", commonAvailability);
  const { mode, setMode, effect, setEffect } = useContext(ModeContext);

  return (
    <table className="flex flex-col order-1 read">
      <thead className="flex flex-col items-stretch">
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
        {availabilities.map((row, rowIndex) => (
          <tr
            onClick={() => {
              setEffect(crypto.randomUUID());
            }}
            className="flex h-[1.5rem] bg-white"
            key={rowIndex}
          >
            {row.map((_, columnIndex) => (
              <td
                onClick={() => {
                  console.log("write clicked");
                }}
                key={columnIndex}
                className={`select-none flex-1 border-r border-gray-200 border-dashed
                ${
                  availabilities[rowIndex][columnIndex] &&
                  commonAvailability[rowIndex][columnIndex] == 0
                    ? "white"
                    : undefined
                }
                ${
                  availabilities[rowIndex][columnIndex] &&
                  commonAvailability[rowIndex][columnIndex] == 1
                    ? "bg-red-200"
                    : undefined
                }
                ${
                  availabilities[rowIndex][columnIndex] &&
                  commonAvailability[rowIndex][columnIndex] == 2
                    ? "bg-red-400"
                    : undefined
                }
                ${
                  availabilities[rowIndex][columnIndex] &&
                  commonAvailability[rowIndex][columnIndex] == 3
                    ? "bg-red-500"
                    : undefined
                }`}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MultipleReadTimePicker;
