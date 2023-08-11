import { ImageBackground, StyleSheet, View } from 'react-native';
import SearchBar from './components/SearchBar';
import Weather from './components/Weather';
import { useState } from 'react';

export default function App() {

  const [savedName, setSavedName] = useState(null)
  const [backGroundImg, setbackGroundImg] = useState('')
  function cityNameHandler(t) {
    setSavedName(t)
  }

  function backgroundHandler(background){
    setbackGroundImg(background)
  }
  return (
    <View style={styles.container}> 
    <ImageBackground source={backGroundImg} style={styles.container} resizeMode='cover'> 
      <SearchBar cityName={cityNameHandler} />
      <Weather cityName={savedName} background={backgroundHandler} />
    </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
flex:1
  },
});
