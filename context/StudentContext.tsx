import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const StudentContext = createContext(null);

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  // Load from device storage on startup
  useEffect(() => {
    const loadData = async () => {
      const saved = await AsyncStorage.getItem('@student_records');
      if (saved) setStudents(JSON.parse(saved));
    };
    loadData();
  }, []);

  // Function to add a student and save to storage
  const addStudent = async (newStudent) => {
    const updated = [...students, newStudent];
    setStudents(updated);
    await AsyncStorage.setItem('@student_records', JSON.stringify(updated));
  };

  return (
    <StudentContext.Provider value={{ students, addStudent }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => useContext(StudentContext);