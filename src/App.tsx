import React, { memo } from "react";

interface TableCell {
  value: string;
}

interface TableRow {
  cells: TableCell[];
}

interface TableData {
  rows: TableRow[];
}

interface Table {
  id: string;
  type: "TABLE_1" | "TABLE_2" | "TABLE_3" | "TABLE_4";
  data: TableData;
}

const generateTablesHTML = (tablesArr: Table[]) => {
  const styles = `
    <style>
      .container {
        display: flex;
        flex-direction: column;
        gap: 25px;
        margin-top: 5px;
      }

      .tableCustom {
        width: 100%;
        overflow-x: auto;
        position: relative;
      }

      .tableCustom::-webkit-scrollbar {
        width: 5px;
        height: 10px;
        background-color: #181818;
        border-radius: 8px;
      }

      .tableCustom::-webkit-scrollbar-thumb {
        background: #333;
        border-radius: 8px;
      }

      @media (max-width: 768px) {
        .tableCustom::-webkit-scrollbar {
          border-radius: 4px;
        }
      }

      .tableCustom table {
        width: 100%;
        background-color: #181818;
        border-collapse: collapse;
      }

      .tableCustom table td {
        border: 1px inset #fff;
        padding: 10px;
        font-size: 16px;
        font-weight: 500;
        font-family: "YouTube Sans", sans-serif;
        min-width: 200px;
        text-align: center;
        white-space: nowrap;
      }

      @media (max-width: 768px) {
        .tableCustom table td {
          min-width: 120px !important;
          font-size: 13px;
        }
      }

      /* Table 1 */
      @media (max-width: 768px) {
        .table1 {
          width: 100%;
        }
        .table1 table {
          width: calc(6 * 120px + 5px) !important;
        }
      }
      @media (min-width: 769px) {
        .table1 tr td:nth-child(n + 2) {
          width: fit-content;
          min-width: 0 !important;
        }
        .table1 tr td:first-child {
          width: 150px !important;
        }
      }
      .table1 tr td:nth-child(1) {
        background: #d9d9d9 !important;
        text-align: left;
        color: #000;
      }
      .table1 tr td:nth-child(2) { 
        background: #91d051 !important;
        color: #000;
      }
      .table1 tr td:nth-child(3) { 
        background: #ffff00 !important;
        color: #000;
      }
      .table1 tr td:nth-child(4) { 
        background: #fec000 !important;
        color: #000;
      }
      .table1 tr td:nth-child(5),
      .table1 tr td:nth-child(6) { 
        background: #ff0100 !important;
        color: #000;
      }
      .table1 tr:nth-child(3) td:nth-child(n+2) {
        background: #181818 !important;
        color: #f1f1f1;
      }

      /* Table 2 */
      @media (min-width: 769px) {
        .table2 table tr td:nth-child(n + 2) {
          width: fit-content;
          min-width: 0 !important;
        }
        .table2 table tr td:first-child {
          width: 150px !important;
        }
      }
      @media (max-width: 768px) {
        .table2 {
          width: calc(100%);
        }
        .table2 table {
          width: auto !important;
        }
        .table2 tr td:nth-child(n + 2) {
          width: fit-content;
          min-width: 0 !important;
          padding-left: 20px;
          padding-right: 20px;
        }
      }

      /* Table 2 & 4 shared styles */
      .table2 tr:nth-child(1) td,
      .table4 tr:nth-child(1) td {
        background: #d9d9d9 !important;
        color: #000;
      }
      .table2 tr td:nth-child(1),
      .table4 tr td:nth-child(1) {
        text-align: left;
        background: #181818 !important;
        color: #f1f1f1;
      }
      .table2 tr:nth-child(2) td,
      .table4 tr:nth-child(2) td {
        color: #f1f1f1;
        background: #181818 !important;
      }

      /* Table 3 */
      .table3 tr td {
        white-space: normal;
      }
      .table3 tr td:nth-child(1) {
        background: #d9d9d9 !important;
        text-align: left;
        color: #000;
      }
      .table3 tr td:nth-child(2) { 
        background: #91d051 !important;
        color: #000;
      }
      .table3 tr td:nth-child(3) { 
        background: #ffff00 !important;
        color: #000;
      }
      .table3 tr:nth-child(3) td:nth-child(n+2) {
        background: #181818 !important;
        color: #f1f1f1;
      }

      /* Table 3 & 4 shared styles */
      .table3 table,
      .table4 table {
        width: calc(3 * 200px + 2px);
      }
      @media (max-width: 768px) {
        .table3 table,
        .table4 table {
          width: 100%;
        }
        .table3 tr td,
        .table4 tr td {
          width: calc(100% / 3) !important;
        }
      }
    </style>
  `;

  return `
    ${styles}
    <div class="container">
      ${tablesArr
        .map(
          (table) => `
        <div style="position: relative; width: calc(100% + 15px); overflow: hidden;">
          <div class="tableCustom ${table.type.toLowerCase()}">
            <table>
              ${table.data.rows
                .map(
                  (row) => `
                <tr>
                  ${row.cells
                    .map(
                      (cell) => `
                    <td>${cell.value}</td>
                  `
                    )
                    .join("")}
                </tr>
              `
                )
                .join("")}
            </table>
          </div>
          <div style="position: absolute; bottom: 0; left: -1px; top: 0; background: linear-gradient(to left, rgba(24,24,24,0), rgba(24,24,24,0.12) 15%, rgba(24,24,24,0.21) 24%, rgba(24,24,24,0.55) 48%, rgba(24,24,24,0.76) 68%, rgba(24,24,24,0.9) 83%, rgba(24,24,24,0.98) 95%, #181818); height: 100%; width: 0; z-index: 1; transition: all 0.2s ease-in-out;" class="maskLeft"></div>
          <div style="position: absolute; bottom: 0; right: -1px; top: 0; background: linear-gradient(to right, rgba(24,24,24,0), rgba(24,24,24,0.12) 15%, rgba(24,24,24,0.21) 24%, rgba(24,24,24,0.55) 48%, rgba(24,24,24,0.76) 68%, rgba(24,24,24,0.9) 83%, rgba(24,24,24,0.98) 95%, #181818); height: 100%; width: 0; z-index: 1; transition: all 0.2s ease-in-out;" class="maskRight"></div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};

const tablesArrValue = [
  {
    id: "TABLE_1-1741138037012",
    type: "TABLE_1",
    data: {
      rows: [
        {
          cells: [
            { value: "321" },
            { value: "213" },
            { value: "3213" },
            { value: "21321321321" },
            { value: "3213" },
            { value: "1321" },
          ],
        },
        {
          cells: [
            { value: "32132" },
            { value: "321" },
            { value: "213213" },
            { value: "213" },
            { value: "2132" },
            { value: "321" },
          ],
        },
        {
          cells: [
            { value: "13" },
            { value: "21" },
            { value: "21321321321" },
            { value: "3213" },
            { value: "1321" },
            { value: "32132" },
          ],
        },
      ],
    },
  },
  {
    id: "TABLE_2-1741138047780",
    type: "TABLE_2",
    data: {
      rows: [
        {
          cells: [
            { value: "321" },
            { value: "13213" },
            { value: "2132" },
            { value: "1321" },
            { value: "321" },
            { value: "3213" },
            { value: "3213" },
          ],
        },
        {
          cells: [
            { value: "321" },
            { value: "32" },
            { value: "213" },
            { value: "1321321" },
            { value: "32132" },
            { value: "2132" },
            { value: "21" },
          ],
        },
      ],
    },
  },
  {
    id: "TABLE_3-1741138057276",
    type: "TABLE_3",
    data: {
      rows: [
        { cells: [{ value: "321" }, { value: "3213" }, { value: "2132" }] },
        { cells: [{ value: "3213" }, { value: "321" }, { value: "1321" }] },
        {
          cells: [
            { value: "321321" },
            { value: "321" },
            { value: "321321321" },
          ],
        },
      ],
    },
  },
  {
    id: "TABLE_4-1741138063637",
    type: "TABLE_4",
    data: {
      rows: [
        {
          cells: [
            { value: "21321___444" },
            { value: "321321" },
            { value: "32132132" },
          ],
        },
        {
          cells: [
            { value: "3213__111" },
            { value: "321321321" },
            { value: "321321" },
          ],
        },
      ],
    },
  },
];

const TableComponent = memo(({ htmlString }: { htmlString: string }) => (
  <div dangerouslySetInnerHTML={{ __html: htmlString }} />
));

export default function App() {
  const htmlString = generateTablesHTML(tablesArrValue);

  return (
    <div className="App">
      <TableComponent htmlString={htmlString} />
    </div>
  );
}
