import React, { useState } from "react";
import { ITableProps } from "./interface";
import { useAppSelector } from "../../../../../redux_app/hooks";
import { Wine } from "../../../../../global/interfaces/interface";
import {
  wineStatistics,
  wineGamaStatistics,
  segByClass,
} from "../../../../../global/utilities";

const Table: React.FC<ITableProps> = (props) => {
  const [showGamaStats, setShowGamaStats] = useState<boolean>(true);
  const [showStats, setShowStats] = useState<boolean>(true);

  const tableData: Wine[] = useAppSelector((state) => state.root.wineData);
  const tabularData: { [key: string]: Wine[] } = segByClass(tableData);

  const KEY: keyof Wine = "Flavanoids";
  const MEASURES: string[] = ["Mean", "Mode", "Median"];

  const constructTableHeader = (data: ReturnType<typeof segByClass>) => {
    const headers = Object.keys(data);
    return headers.map((header, idx) => {
      return (
        <th
          className="font-bold border border-stone-600 text-lg p-4 text-left"
          key={idx}
        >
          {header.split("_").join(" ").toUpperCase()}
        </th>
      );
    });
  };

  wineStatistics(tableData, 1, "Flavanoids");
  wineGamaStatistics(tableData, 1);

  return (
    <div className="overflow-x-scroll pl-6 pr-6 pt-8 pb-8 overflow-y-scroll border border-solid border-stone-400 rounded-xl">
      <table id="data-visualisation-table" className="text-stone-200">
        <thead>
          <th className="font-bold text-lg border border-stone-600 pl-2  pr-10 text-left">
            Measure
          </th>
          {constructTableHeader(tabularData)}
        </thead>
        <tbody>
          <tr>
            <td
              onClick={() => setShowStats(!showStats)}
              className="font-bold border cursor-pointer border-stone-400 pl-2 text-yellow-600 pr-5 pt-5 pb-5"
              colSpan={Object.keys(tabularData).length + 1}
            >
              Statistics <span className="ml-2">{showStats ? "⬇️" : "⬆️"}</span>
            </td>
          </tr>
          {showStats && (
            <>
              <tr>
                <td className="border border-stone-700 ">Mean</td>
                {Object.keys(tabularData).map((key: string, idx) => {
                  let stats = wineStatistics(
                    tableData,
                    parseInt(key.split("_")[1]),
                    KEY
                  );
                  return (
                    <td
                      key={idx}
                      className="border text-center border-stone-700 "
                    >
                      {stats.mean}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="border  border-stone-700 ">Mode</td>
                {Object.keys(tabularData).map((key: string, idx) => {
                  let stats = wineStatistics(
                    tableData,
                    parseInt(key.split("_")[1]),
                    KEY
                  );
                  return (
                    <td
                      key={idx}
                      className="border text-center border-stone-700 "
                    >
                      {stats.mode}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="border  border-stone-700 ">Median</td>
                {Object.keys(tabularData).map((key: string, idx) => {
                  let stats = wineStatistics(
                    tableData,
                    parseInt(key.split("_")[1]),
                    KEY
                  );
                  return (
                    <td
                      className="border text-center border-stone-700 "
                      key={idx}
                    >
                      {stats.median}
                    </td>
                  );
                })}
              </tr>
            </>
          )}
          <tr>
            <td
              onClick={() => setShowGamaStats(!showGamaStats)}
              className="font-bold cursor-pointer text-emerald-600 pr-5 pt-5 pb-5"
              colSpan={Object.keys(tabularData).length + 1}
            >
              Gama Statistics{" "}
              <span className="ml-2">{showGamaStats ? "⬇️" : "⬆️"}</span>
            </td>
          </tr>
          {showGamaStats && (
            <>
              <tr>
                <td className="border border-stone-700 ">Mean</td>
                {Object.keys(tabularData).map((key: string, idx) => {
                  let stats = wineGamaStatistics(
                    tableData,
                    parseInt(key.split("_")[1])
                  );
                  return (
                    <td
                      key={idx}
                      className="border text-center border-stone-700 "
                    >
                      {stats.mean}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td>Mode</td>
                {Object.keys(tabularData).map((key: string, idx) => {
                  let stats = wineGamaStatistics(
                    tableData,
                    parseInt(key.split("_")[1])
                  );
                  return (
                    <td
                      key={idx}
                      className="border text-center border-stone-700 "
                    >
                      {stats.mode}
                    </td>
                  );
                })}
              </tr>
              <tr className="">
                <td className="border border-stone-700 ">Median</td>
                {Object.keys(tabularData).map((key: string, idx) => {
                  let stats = wineGamaStatistics(
                    tableData,
                    parseInt(key.split("_")[1])
                  );
                  return (
                    <td
                      className="border text-center border-stone-700 "
                      key={idx}
                    >
                      {stats.median}
                    </td>
                  );
                })}
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
