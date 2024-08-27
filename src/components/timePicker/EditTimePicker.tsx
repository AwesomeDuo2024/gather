import React, { useEffect } from "react";
import { useTableDragSelect } from "use-table-drag-select";
import TimeSlot from "@/components/timePicker/TimeSlot";

const EditTimePicker = ({
  // updateEditSlots,
  editModeBodyRef,
  dateHeaderDDD,
  dateHeaderMMMD,
  startTime,
  endTime,
}: {
  // updateEditSlots: (newSlots: boolean[][]) => void;
  editModeBodyRef: React.MutableRefObject<boolean[][] | undefined>;
  dateHeaderDDD: string[];
  dateHeaderMMMD: string[];
  startTime: string;
  endTime: string;
}) => {
  const [editRef, editValue] = useTableDragSelect(editModeBodyRef.current);
  console.log("writeValue", editValue);
  useEffect(() => {
    editModeBodyRef.current = editValue;
  }, [editValue]);
  // useEffect(() => {
  //   updateWriteSlots(writeValue);
  // }, [writeValue]);
  return (
    <div className="flex w-full">
      <div className="flex flex-col mr-2">
        <div className="sticky top-0 bg-white h-20 text-transparent">.</div>
        <TimeSlot startTime={startTime!} endTime={endTime!} />
      </div>
      <table ref={editRef} className="flex flex-col order-1 write flex-1">
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
        <tbody className="flex flex-col divide-y  border-2 border-solid border-gray-400">
          {editValue.map((row, rowIndex) => (
            <tr className="flex h-[1.5rem] bg-white" key={rowIndex}>
              {row.map((_, columnIndex) => (
                <td
                  onClick={() => {
                    console.log("write clicked");
                    editModeBodyRef.current = editValue;
                  }}
                  key={columnIndex}
                  className={`select-none flex-1 border-r border-gray-200 border-dashed hover:border-2 hover:border-gray-700 hover:border-dotted
                 ${
                   editValue[rowIndex][columnIndex]
                     ? "bg-sky-500"
                     : "bg-sky-300"
                 }`}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditTimePicker;
