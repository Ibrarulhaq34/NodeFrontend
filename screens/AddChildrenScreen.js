// AddChildrenScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

const AddChildrenScreen = ({ route, navigation }) => {
  const { username, email, password, numberOfChildren } = route.params;

  const [children, setChildren] = useState(
    Array.from({ length: numberOfChildren }, (_, i) => ({ name: '', age: '' }))
  );
  const [error, setError] = useState('');

  const handleInputChange = (index, field, value) => {
    const newChildren = [...children];
    newChildren[index] = { ...newChildren[index], [field]: value };
    setChildren(newChildren);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://192.168.1.9:5000/api/auth/register', { 
        username, 
        email, 
        password, 
        numberOfChildren,
        children 
      });
      console.log('Response:', res.data);
      navigation.navigate('Login');
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      setError('Registration error: ' + (err.response?.data?.msg || err.message));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Add Children Details</Text>
      {children.map((child, index) => (
        <View key={index} style={styles.childContainer}>
          <TextInput
            style={styles.input}
            placeholder={`Child ${index + 1} Name`}
            placeholderTextColor="#000080"
            value={child.name}
            onChangeText={(value) => handleInputChange(index, 'name', value)}
          />
          <TextInput
            style={styles.input}
            placeholder={`Child ${index + 1} Age`}
            placeholderTextColor="#000080"
            value={child.age}
            onChangeText={(value) => handleInputChange(index, 'age', value)}
            keyboardType="numeric"
          />
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ADD8E6', // Light blue background
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    color: '#000080', // Darker blue
    marginBottom: 20,
  },
  childContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#000080', // Darker blue
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
    padding: 8,
    color: '#000080', // Darker blue
  },
  button: {
    backgroundColor: '#87CEEB', // Lighter blue
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000080', // Darker blue
    fontSize: 18,
  },
  errorText: {
    color: '#ff0000',
    marginTop: 10,
  },
});

export default AddChildrenScreen;
