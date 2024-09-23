import React, { useState } from 'react';

function AddStudentForm({ onAddStudent }) {
  const [name, setName] = useState('');
  const [marks, setMarks] = useState({
    English: '',
    Math: '',
    Hindi: '',
    Science: '',
    SocialScience: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddStudent({ name, marks });
    setName('');
    setMarks({
      English: '',
      Math: '',
      Hindi: '',
      Science: '',
      SocialScience: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Student Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      {Object.keys(marks).map((subject) => (
        <div key={subject}>
          <label htmlFor={subject} className="block text-sm font-medium text-gray-700">
            {subject} Marks
          </label>
          <input
            type="number"
            id={subject}
            value={marks[subject]}
            onChange={(e) => setMarks({ ...marks, [subject]: e.target.value })}
            required
            min="0"
            max="100"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Student
      </button>
    </form>
  );
}

export default AddStudentForm;