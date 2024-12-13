// RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [numberOfChildren, setNumberOfChildren] = useState(''); 
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      if (parseInt(numberOfChildren) > 0) {
        // Save initial registration data
        navigation.navigate('AddChildren', { 
          username, 
          email, 
          password, 
          numberOfChildren: parseInt(numberOfChildren) 
        });
      } else {
        // Directly register if no children
        const res = await axios.post('http://192.168.1.9:5000/api/auth/register', { 
          username, 
          email, 
          password, 
          numberOfChildren: 0 
        });
        console.log('Response:', res.data); // Handle token
        Alert.alert('Registration Successful', 'You have successfully registered.', [
          { text: 'OK', onPress: () => navigation.navigate('Login') }
        ]);
      }
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      setError('Registration error: ' + (err.response?.data?.msg || err.message));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Polio Guard Proactive</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#01579B"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#01579B"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#01579B"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Children"
        placeholderTextColor="#01579B"
        value={numberOfChildren}
        onChangeText={setNumberOfChildren}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B3E5FC', // Slightly darker light blue
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    color: '#0277BD', // Darker blue text
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#0277BD', // Darker blue border
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
    padding: 8,
    width: '80%',
    color: '#0277BD', // Darker blue text
  },
  button: {
    backgroundColor: '#81D4FA', // Slightly darker button background
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: '80%',
  },
  buttonText: {
    color: '#01579B', // Darker blue text
    fontSize: 18,
    textAlign: 'center',
  },
  errorText: {
    color: '#D32F2F', // Red error text
    marginTop: 10,
  },
  childContainer: {
    marginBottom: 20,
  },
});



export default RegisterScreen;
