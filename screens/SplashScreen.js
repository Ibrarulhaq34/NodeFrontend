import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000); // 3 seconds
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Polio Guard Proactive</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000FF',
  },
  text: {
    fontSize: 32,
    color: '#fff',
  },
});

export default SplashScreen;
