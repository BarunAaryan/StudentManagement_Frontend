import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function MarksChart({ students }) {
  const subjects = ['English', 'Math', 'Hindi', 'Science', 'SocialScience'];
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

  const data = {
    labels: students.map(student => student.name),
    datasets: subjects.map((subject, index) => ({
      label: subject,
      data: students.map(student => student.marks[subject]),
      backgroundColor: colors[index],
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Student Marks Comparison',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default MarksChart;