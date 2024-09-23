import React from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

const subjects = ['English', 'Math', 'Hindi', 'Science', 'SocialScience'];

function MarksTable({ students, onUpdateMark, isTeacher }) {
  const columns = React.useMemo(
    () => [
      {
        header: 'Student',
        accessorKey: 'name',
      },
      ...subjects.map(subject => ({
        header: subject,
        accessorKey: `marks.${subject}`,
        cell: info => 
          isTeacher ? (
            <input
              type="number"
              value={info.getValue()}
              onChange={(e) => onUpdateMark(info.row.original._id, subject, e.target.value)}
              className="w-full p-1 border rounded"
            />
          ) : (
            info.getValue()
          ),
      })),
    ],
    [isTeacher, onUpdateMark]
  );

  const table = useReactTable({
    data: students,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="px-4 py-2 border">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-2 border">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MarksTable;