import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://192.168.1.9:5000/api/auth/login', { email, password });
      const { token } = res.data;
      console.log('Response:', res.data);
      navigation.navigate('Hello');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError('Login error: ' + (err.response?.data?.msg || err.message));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Polio Guard Proactive</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Register</Text>
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
});



export default LoginScreen;
