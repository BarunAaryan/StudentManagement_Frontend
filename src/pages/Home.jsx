import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MarksTable from '../components/MarksTable';
import Dashboard from '../components/Dashboard';
import AddStudentForm from '../components/AddStudentForm';
import { getStudents, updateStudent, addStudent } from '../api/api';

function Home() {
  const { user, logout } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const { data } = await getStudents();
      setStudents(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch students:', err);
      setError('Failed to fetch students. Please try again.');
      if (err.response && err.response.status === 401) {
        logout();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMark = async (studentId, subject, value) => {
    if (user.role !== 'teacher') return;
    try {
      const { data } = await updateStudent(studentId, { [`marks.${subject}`]: value });
      setStudents(students.map(student => 
        student._id === studentId ? data : student
      ));
      setError(null);
    } catch (err) {
      console.error('Failed to update mark:', err);
      setError('Failed to update mark. Please try again.');
    }
  };

  const handleAddStudent = async (newStudent) => {
    if (user.role !== 'teacher') return;
    try {
      const { data } = await addStudent(newStudent);
      setStudents([...students, data]);
      setError(null);
    } catch (err) {
      console.error('Failed to add student:', err);
      setError('Failed to add student. Please try again.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Student Management System</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      
      <MarksTable 
        students={students} 
        onUpdateMark={handleUpdateMark} 
        isTeacher={user.role === 'teacher'}
      />
      
      <Dashboard students={students} />
      
      {user.role === 'teacher' && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Add New Student</h2>
          <AddStudentForm onAddStudent={handleAddStudent} />
        </div>
      )}
    </div>
  );
}

export default Home;