// C:\Projects\AuthApp\screens\HelloScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HelloScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello</Text>
      <Button title="Return to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default HelloScreen;
