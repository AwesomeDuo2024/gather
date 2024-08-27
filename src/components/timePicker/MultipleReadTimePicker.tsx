"use client";
import { ModeContext } from "@/app/theme-provider";
// import { findAvailabilities } from "@/lib/actions";
import React, { useContext, useEffect, useState } from "react";
import TimeSlot from "@/components/timePicker/TimeSlot";
import { getMostRespondents } from "@/lib/utils";
import { useTableDragSelect } from "use-table-drag-select";

const MultipleReadTimePicker = ({
  availabilities,
  commonAvailability,
  dateHeaderDDD,
  dateHeaderMMMD,
  startTime,
  endTime,
  toggleBestTimeslot,
}: {
  availabilities: boolean[][];
  commonAvailability: number[][];
  dateHeaderDDD: string[];
  dateHeaderMMMD: string[];
  startTime: string;
  endTime: string;
  toggleBestTimeslot: boolean;
}) => {
  console.log("========= MultipleReadTimePicker =========");
  console.log("availabilities", availabilities);
  console.log("commonAvailability", commonAvailability);
  const { mode, setMode, effect, setEffect } = useContext(ModeContext);
  const [multipleReadRef, _] = useTableDragSelect(availabilities);

  const maxPersonCount: number = getMostRespondents(commonAvailability);

  return (
    <div className="flex w-full">
      <div className="flex flex-col mr-2">
        <div className="sticky top-0 bg-white h-20 text-transparent">.</div>
        <TimeSlot startTime={startTime!} endTime={endTime!} />
      </div>
      <table
        ref={multipleReadRef}
        className="flex flex-col order-1 read flex-1"
      >
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
                  className={`select-none flex-1 border-r border-gray-200 hover:border-2 hover:border-gray-700 border-dotted 
                    ${
                      toggleBestTimeslot &&
                      availabilities[rowIndex][columnIndex] &&
                      commonAvailability[rowIndex][columnIndex] ===
                        maxPersonCount
                        ? "bg-gradient-to-r from-red-700 via-pink-900 to-blue-700"
                        : undefined
                    }
                    ${
                      !toggleBestTimeslot &&
                      availabilities[rowIndex][columnIndex] &&
                      commonAvailability[rowIndex][columnIndex] == 0
                        ? "white"
                        : undefined
                    }
                    ${
                      !toggleBestTimeslot &&
                      availabilities[rowIndex][columnIndex] &&
                      commonAvailability[rowIndex][columnIndex] == 1
                        ? "bg-sky-200"
                        : undefined
                    }
                    ${
                      !toggleBestTimeslot &&
                      availabilities[rowIndex][columnIndex] &&
                      commonAvailability[rowIndex][columnIndex] == 2
                        ? "bg-sky-400"
                        : undefined
                    }
                    
                    ${
                      !toggleBestTimeslot &&
                      availabilities[rowIndex][columnIndex] &&
                      commonAvailability[rowIndex][columnIndex] == 3
                        ? "bg-sky-700"
                        : undefined
                    }
                  
                    ${
                      !toggleBestTimeslot &&
                      availabilities[rowIndex][columnIndex] &&
                      commonAvailability[rowIndex][columnIndex] == 4
                        ? "bg-sky-900"
                        : undefined
                    }
                    
                    ${
                      !toggleBestTimeslot &&
                      availabilities[rowIndex][columnIndex] &&
                      commonAvailability[rowIndex][columnIndex] >= 5
                        ? "bg-sky-950"
                        : undefined
                    }
                `}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MultipleReadTimePicker;
