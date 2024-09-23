import React, { useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

function StudentView({ student }) {
  const subjects = ['English', 'Math', 'Hindi', 'Science', 'SocialScience'];
  
  const data = useMemo(() => 
    subjects.map(subject => ({
      subject,
      maxMarks: 100,
      marksObtained: student.marks[subject],
      percentage: student.marks[subject],
    })),
    [student]
  );

  const columns = useMemo(
    () => [
      {
        header: 'Subject',
        accessorKey: 'subject',
      },
      {
        header: 'Maximum Marks',
        accessorKey: 'maxMarks',
      },
      {
        header: 'Marks Obtained',
        accessorKey: 'marksObtained',
      },
      {
        header: 'Percentage',
        accessorKey: 'percentage',
        cell: info => `${info.getValue()}%`,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalMarks = Object.values(student.marks).reduce((sum, mark) => sum + Number(mark), 0);
  const totalPercentage = (totalMarks / (subjects.length * 100)) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">{student.name}'s Marksheet</h2>
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
          <tr>
            <td colSpan="2" className="px-4 py-2 border font-bold">Total</td>
            <td className="px-4 py-2 border font-bold">{totalMarks}</td>
            <td className="px-4 py-2 border font-bold">{totalPercentage.toFixed(2)}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StudentView;