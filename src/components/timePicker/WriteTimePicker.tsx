import React, { useEffect } from "react";
import { useTableDragSelect } from "use-table-drag-select";

const WriteTimePicker = ({
  updateWriteSlots,
  writeModeBody,
  dateHeaderDDD,
  dateHeaderMMMD,
}: {
  updateWriteSlots: (newSlots: boolean[][]) => void;
  writeModeBody: boolean[][];
  dateHeaderDDD: string[];
  dateHeaderMMMD: string[];
}) => {
  const [writeRef, writeValue] = useTableDragSelect(writeModeBody);
  console.log("writeValue", writeValue);
  useEffect(() => {
    updateWriteSlots(writeValue);
  }, [writeValue]);
  return (
    <table ref={writeRef} className="flex flex-col w-[50rem] order-1 write">
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
        {writeValue.map((row, rowIndex) => (
          <tr className="flex lg:h-[1rem] bg-white" key={rowIndex}>
            {row.map((_, columnIndex) => (
              <td
                onClick={() => {
                  console.log("write clicked");
                }}
                key={columnIndex}
                className={`select-none flex-1 border-r border-gray-200 border-dashed
                 ${
                   writeValue[rowIndex][columnIndex]
                     ? "bg-red-500"
                     : "bg-red-300"
                 }`}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WriteTimePicker;
