import React from 'react';
import { convertTemplateTableToHTML } from '../../utils/tableUtils';

const tablesArr = [
  {
    id: 'TABLE_1-1741138037012',
    type: 'TABLE_1',
    data: {
      rows: [
        {
          cells: [
            { value: '321' },
            { value: '213' },
            { value: '3213' },
            { value: '21321321321' },
            { value: '3213' },
            { value: '1321' },
          ],
        },
        {
          cells: [
            { value: '32132' },
            { value: '321' },
            { value: '213213' },
            { value: '213' },
            { value: '2132' },
            { value: '321' },
          ],
        },
        {
          cells: [
            { value: '13' },
            { value: '21' },
            { value: '21321321321' },
            { value: '3213' },
            { value: '1321' },
            { value: '32132' },
          ],
        },
      ],
    },
  },
  {
    id: 'TABLE_2-1741138047780',
    type: 'TABLE_2',
    data: {
      rows: [
        {
          cells: [
            { value: '321' },
            { value: '13213' },
            { value: '2132' },
            { value: '1321' },
            { value: '321' },
            { value: '3213' },
            { value: '3213' },
          ],
        },
        {
          cells: [
            { value: '321' },
            { value: '32' },
            { value: '213' },
            { value: '1321321' },
            { value: '32132' },
            { value: '2132' },
            { value: '21' },
          ],
        },
      ],
    },
  },
  {
    id: 'TABLE_3-1741138057276',
    type: 'TABLE_3',
    data: {
      rows: [
        { cells: [{ value: '321' }, { value: '3213' }, { value: '2132' }] },
        { cells: [{ value: '3213' }, { value: '321' }, { value: '1321' }] },
        {
          cells: [{ value: '321321' }, { value: '321' }, { value: '321321321' }],
        },
      ],
    },
  },
  {
    id: 'TABLE_4-1741138063637',
    type: 'TABLE_4',
    data: {
      rows: [
        {
          cells: [{ value: '21321___444' }, { value: '321321' }, { value: '32132132' }],
        },
        {
          cells: [{ value: '3213__111' }, { value: '321321321' }, { value: '321321' }],
        },
      ],
    },
  },
];

const TemplateTable = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const htmlString = convertTemplateTableToHTML(tablesArr as any[]);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6">Template Table Demo</h1>
      <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
        {htmlString && <div dangerouslySetInnerHTML={{ __html: htmlString }} />}
      </div>
    </div>
  );
};

export default TemplateTable;
