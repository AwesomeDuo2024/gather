"use client";

import React from "react";
import styled from "styled-components";
import { useTable } from "react-table";
// import { useCellRangeSelection } from "react-table-plugins";
import useCellRangeSelection from "../../lib/useCellRangeSelection";
import { useEffect } from "react";

const TimeSlotBigBlockCellSelection = ({ columns, data }) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // currentSelectedCellIds: cells of a current selected range
    // selectedCellIds: All previously selected cells
    state: { selectedCellIds, currentSelectedCellIds, isSelectingCells },
    getCellsBetweenId,
    setSelectedCellIds,
    cellsById,
  } = useTable(
    {
      columns,
      data,
      // cellIdSplitBy (string): Cell id is split by column.id + cellIdSplitBy + row.id
      cellIdSplitBy: "cols_rows",
      initialState: {
        selectedCellIds: {},
      },
    },
    useCellRangeSelection
  );

  console.log("selectedCellIds", selectedCellIds);
  console.log("currentSelectedCellIds", currentSelectedCellIds);
  let cellsSelected = { ...currentSelectedCellIds, ...selectedCellIds };

  // console.log(cellsSelected);

  // getCellsBetweenId returns all cell Ids between two cell Id, and then setState for selectedCellIds
  const selectRandomCells = React.useCallback(() => {
    // const cellsBetween = getCellsBetweenId(...getRandomCellIds());
    setSelectedCellIds(cellsBetween);
  }, [setSelectedCellIds]);

  // useEffect(() => {
  //   console.log("[selectedCellIds]", selectedCellIds);
  // }, [selectedCellIds]);

  return (
    <>
      <div>
        <table className="w-[50rem]" {...getTableProps()}>
          {/* Header */}
          <thead>
            {headerGroups.map((headerGroup, ind) => {
              // console.log("headerGroup", headerGroup);
              return (
                <tr key={ind} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => {
                    // console.log("column", column);
                    return column.hideHeader === false ? null : (
                      <th key={ind} {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>

          {/* Body */}
          <tbody
            className="divide-y divide-x divide-dashed"
            {...getTableBodyProps()}
          >
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr className="bg-yellow-200" key={i} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        // onClick={(e) =>
                        //   setSelectedCellIds({
                        //     ...selectedCellIds,
                        //     ...{ a: true },
                        //   })
                        // }
                        key={i}
                        {...cell.getCellRangeSelectionProps()}
                        {...cell.getCellProps()}
                        className={`w-[4rem] h-[4rem] ${
                          cellsSelected[cell.id]
                            ? "bg-blue-200 select-none"
                            : "bg-white select-none"
                        }`}
                      >
                        {undefined}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <pre>
        <code>
          {JSON.stringify({ selectedCellIds, currentSelectedCellIds }, null, 2)}
        </code>
      </pre>
    </>
  );
};

export default TimeSlotBigBlockCellSelection;
