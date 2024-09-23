import React from 'react';

function Dashboard({ students }) {
  const subjects = ['English', 'Math', 'Hindi', 'Science', 'SocialScience'];

  const calculateTotal = (studentMarks) => 
    Object.values(studentMarks).reduce((sum, mark) => sum + Number(mark), 0);

  const rankings = students
    .map(student => ({
      name: student.name,
      total: calculateTotal(student.marks),
    }))
    .sort((a, b) => b.total - a.total)
    .map((student, index) => ({ ...student, rank: index + 1 }));

  const subjectToppers = subjects.map(subject => {
    const topper = students.reduce((max, student) => 
      (student.marks[subject] > (max.marks[subject] || 0)) ? student : max
    , { marks: {} });
    return { subject, topper: topper.name };
  });

  return (
    <div className="mt-8 space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Overall Ranking</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Rank</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Total Marks</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((student) => (
              <tr key={student.name}>
                <td className="px-4 py-2 border">{student.rank}</td>
                <td className="px-4 py-2 border">{student.name}</td>
                <td className="px-4 py-2 border">{student.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Subject Toppers</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Subject</th>
              <th className="px-4 py-2 border">Topper</th>
            </tr>
          </thead>
          <tbody>
            {subjectToppers.map((topper) => (
              <tr key={topper.subject}>
                <td className="px-4 py-2 border">{topper.subject}</td>
                <td className="px-4 py-2 border">{topper.topper}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;