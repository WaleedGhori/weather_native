import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SearchBar from './components/SearchBar';
import Weather from './components/Weather';
import { useState } from 'react';

export default function App() {

  const [savedName, setSavedName] = useState(null)
  function cityNameHandler(t) {
    setSavedName(t)
  }
  return (
    <View style={styles.container}>
      <SearchBar cityName={cityNameHandler} />
      <Weather cityName={savedName} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {


  },
});
