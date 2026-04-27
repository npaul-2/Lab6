import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { StudentSchema } from '../../schema/studentSchema';

export default function Entry() {
  
    // const { addStudent } = useStudents();
  
    // Form State
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    age: '',
    gpa: '',
    major: '',
    units: '',
    gradYear: '',
    unpaidDues: ''
  });

  const handleAddStudent = () => {
    // Convert strings to numbers for validation
    const formattedData = {
      ...formData,
      age: parseInt(formData.age),
      gpa: parseFloat(formData.gpa),
      units: parseInt(formData.units),
      gradYear: parseInt(formData.gradYear),
      unpaidDues: parseFloat(formData.unpaidDues),
    };

    // Validate with Zod
    const result = StudentSchema.safeParse(formattedData);

    if (!result.success) {
      alert(result.error.issues[0].message);
      return;
    }

    if (result.success) {
       addStudent(result.data); 
       alert("Student Added Successfully!");
    }

    //console.log("Validation Passed!", result.data);
    // save result.data to global list next...
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>New Student Entry</Text>
      
      <TextInput 
        placeholder="Student ID" 
        style={styles.input} 
        onChangeText={(txt) => setFormData({...formData, id: txt})}
      />
      
      <TextInput 
        placeholder="Full Name" 
        style={styles.input} 
        onChangeText={(txt) => setFormData({...formData, name: txt})}
      />

      <TextInput 
        placeholder="Age" 
        keyboardType="numeric"
        style={styles.input} 
        onChangeText={(txt) => setFormData({...formData, age: txt})}
      />

      <TextInput 
        placeholder="GPA (0.0 - 4.0)" 
        keyboardType="numeric"
        style={styles.input} 
        onChangeText={(txt) => setFormData({...formData, gpa: txt})}
      />

      <TextInput 
        placeholder="Major" 
        style={styles.input} 
        onChangeText={(txt) => setFormData({...formData, major: txt})}
      />

      <TextInput 
        placeholder="Units" 
        keyboardType="numeric"
        style={styles.input} 
        onChangeText={(txt) => setFormData({...formData, units: txt})}
      />

      <TextInput 
        placeholder="Graduation year" 
        keyboardType="numeric"
        style={styles.input} 
        onChangeText={(txt) => setFormData({...formData, gradYear: txt})}
      />

      <TextInput 
        placeholder="Unpaid dues" 
        keyboardType="numeric"
        style={styles.input} 
        onChangeText={(txt) => setFormData({...formData, unpaidDues: txt})}
      />

      <Button title="Add Student" onPress={handleAddStudent} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "gray" },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 8, fontSize: 16 }
});