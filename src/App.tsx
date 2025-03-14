// import "./styles.css";

interface TableCell {
  value: string;
}

interface TableRow {
  cells: TableCell[];
}

interface TableData {
  rows: TableRow[];
}

export enum TemplateTableType {
  TABLE_1 = "TABLE_1",
  TABLE_2 = "TABLE_2",
  TABLE_3 = "TABLE_3",
  TABLE_4 = "TABLE_4",
}

export interface TableInstance {
  id: string;
  type: TemplateTableType;
  data: TableData;
}

export const convertTemplateTableToHTML = (tables: TableInstance[]): string => {
  // ... existing code ...

  const generateTableHTML = (table: TableInstance) => {
    const TABLE_WIDTH = 200;
    const TABLE_WIDTH_MOBILE = 120;
    const getTableWidth = (type: TemplateTableType): string => {
      const isMobile = window.innerWidth <= 768; // md breakpoint
      const cellWidth = isMobile ? TABLE_WIDTH_MOBILE : TABLE_WIDTH;
      switch (type) {
        case TemplateTableType.TABLE_1:
          return isMobile ? `calc(6 * ${TABLE_WIDTH_MOBILE}px + 5px)` : "100%";
        case TemplateTableType.TABLE_2:
          return "100%";
        case TemplateTableType.TABLE_3:
        case TemplateTableType.TABLE_4:
          return `calc(3 * ${cellWidth}px + 2px)`;
        default:
          return "100%";
      }
    };

    const getCellStyle = (
      rowIndex: number,
      cellIndex: number,
      type: TemplateTableType
    ): string => {
      const isMobile = window.innerWidth <= 768;
      const baseStyle = `
        padding: 10px;
        border: 1px inset #fff;
        text-align: center;
        min-width: ${isMobile ? TABLE_WIDTH_MOBILE : TABLE_WIDTH}px;
        color: #000;
        font-weight: 500;
        background: #fff;
        width: fit-content;
      `;

      const firstColumnStyle = `
        width: 150px !important;
        text-align: left;
        ${isMobile ? "min-width: " + TABLE_WIDTH_MOBILE + "px !important" : ""};
      `;

      const cellBiggerThan0AndNotMobileTable1 = `${baseStyle} min-width: 0 !important; width: fit-content;`;
      const cellBiggerThan0AndNotMobileTable2 = `${baseStyle} min-width: 0 !important; width: fit-content;`;
      switch (type) {
        case TemplateTableType.TABLE_1: {
          // Match with .table1 styles
          if (cellIndex === 0) {
            return `${baseStyle} ${firstColumnStyle} background: #d9d9d9;`;
          }
          if (rowIndex === 2) {
            return `${baseStyle} background: #181818; color: #f1f1f1;`;
          }

          switch (cellIndex) {
            case 1:
              return `${cellBiggerThan0AndNotMobileTable1} background: #91d051;`;
            case 2:
              return `${cellBiggerThan0AndNotMobileTable1} background: #ffff00;`;
            case 3:
              return `${cellBiggerThan0AndNotMobileTable1} background: #fec000;`;
            case 4:
            case 5:
              return `${cellBiggerThan0AndNotMobileTable1} background: #ff0100;`;
            default:
              return baseStyle;
          }
        }

        case TemplateTableType.TABLE_2: {
          // Match with .table2 styles
          if (cellIndex === 0) {
            return `${baseStyle} ${firstColumnStyle} text-align: left; background: #181818; color: #f1f1f1;`;
          }
          if (rowIndex === 0) {
            return `${cellBiggerThan0AndNotMobileTable2} background: #d9d9d9;`;
          }
          if (rowIndex === 1) {
            return `${cellBiggerThan0AndNotMobileTable2} background: #181818; color: #f1f1f1;`;
          }
          return baseStyle;
        }

        case TemplateTableType.TABLE_3: {
          // Match with .table3 styles
          if (cellIndex === 0) {
            return `${baseStyle} text-align: left; background: #d9d9d9;`;
          }
          if (rowIndex === 2) {
            return `${baseStyle} background: #181818; color: #f1f1f1;`;
          }
          switch (cellIndex) {
            case 1:
              return `${baseStyle} background: #91d051;`;
            case 2:
              return `${baseStyle} background: #ffff00;`;
            default:
              return baseStyle;
          }
        }

        case TemplateTableType.TABLE_4: {
          console.log(rowIndex, cellIndex);
          // Match with .table4 styles
          if (cellIndex === 0) {
            return `${baseStyle} text-align: left; background: #181818; color: #f1f1f1;`;
          }
          if (rowIndex === 0) {
            return `${baseStyle} background: #d9d9d9;`;
          }
          if (rowIndex === 1) {
            return `${baseStyle} background: #181818; color: #f1f1f1;`;
          }
          return baseStyle;
        }

        default:
          return baseStyle;
      }
    };

    // ... maskStyle remains the same ...

    const maskStyle = `
    position: absolute;
    bottom: 0;
    top: 0;
    height: 100%;
    width: 0;
    z-index: 1;
    transition: all 0.2s ease-in-out;
  `;

    const maskLeftStyle = `
    ${maskStyle}
    left: -1px;
    background: linear-gradient(
      to left,
      rgba(24, 24, 24, 0),
      rgba(24, 24, 24, 0.12) 15%,
      rgba(24, 24, 24, 0.21) 24%,
      rgba(24, 24, 24, 0.55) 48%,
      rgba(24, 24, 24, 0.76) 68%,
      rgba(24, 24, 24, 0.9) 83%,
      rgba(24, 24, 24, 0.98) 95%,
      #181818
    );
  `;

    const maskRightStyle = `
    ${maskStyle}
    right: -1px;
    background: linear-gradient(
      to right,
      rgba(24, 24, 24, 0),
      rgba(24, 24, 24, 0.12) 15%,
      rgba(24, 24, 24, 0.21) 24%,
      rgba(24, 24, 24, 0.55) 48%,
      rgba(24, 24, 24, 0.76) 68%,
      rgba(24, 24, 24, 0.9) 83%,
      rgba(24, 24, 24, 0.98) 95%,
      #181818
    );
  `;

    return `
    <div style="position: relative; display: block; gap: 5px;">
      <div style="position: relative; width: calc(100%); overflow: hidden; margin-bottom: 25px;">
        <div class="maskLeft" style="${maskLeftStyle}"></div>
        <div style="width: 100%; overflow-x: auto; position: relative;">
          <table style="width: ${getTableWidth(
            table.type
          )}; border-collapse: collapse!important; background-color: #181818;">
            <tbody>
              ${table.data.rows
                .map(
                  (row: TableRow, rowIndex: number) => `
                <tr>
                  ${row.cells
                    .map((cell: TableCell, cellIndex: number) => {
                      return `
                        <td style="${getCellStyle(
                          rowIndex,
                          cellIndex,
                          table.type
                        )}">
                          ${cell.value}
                        </td>
                      `;
                    })
                    .join("")}
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
        <div class="maskRight" style="${maskRightStyle}"></div>
      </div>
    </div>
  `;
  };
  return `
    <div style="display: block; gap: 25px; margin-top: 5px;">
      ${tables.map((table) => generateTableHTML(table)).join("")}
    </div>
  `;
};

const getTableDataItem = (item: any) => {
  if (item?.table) {
    try {
      const tableData = JSON.parse(item?.table);
      console.log({ tableData });
      return tableData;
    } catch (error) {
      console.log("---error---", error);
      return [];
    }
  }
  return [];
};

const tablesArr = [
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

export default function App() {
  const htmlString = convertTemplateTableToHTML(tablesArr as any[]);
  // const htmlString = convertTemplateTableToHTML(getTableDataItem(tableString));
  console.log("htmlString", htmlString);
  return (
    <div className="App">
      <p>ABC</p>
      {htmlString && <div dangerouslySetInnerHTML={{ __html: htmlString }} />}
    </div>
  );
}
