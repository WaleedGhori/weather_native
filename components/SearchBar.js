import { Dimensions, StyleSheet, TextInput, View } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
const SearchBar = (props) => {

    const [city, setCity] = useState('')


    function handleChange(enter) {
        setCity(enter)
    }

    function cityNameHandler() {
        props.cityName(city)
    }

    return (
        <View style={styles.viewSearch}>
            <TextInput style={styles.inputSearch} placeholder="Enter a city name" onChangeText={handleChange} />
            <Feather name="search" size={24} color="black" onPress={cityNameHandler} />
        </View>);
}

const styles = StyleSheet.create({
    viewSearch: {
        flexDirection: "row",
        borderWidth: 2,
        borderColor: "black",
        width: Dimensions.get('screen').width - 80,
        borderRadius: 10,
        marginTop: 150,
        padding: 10,
        fontSize: 20,
        justifyContent: 'space-between', // Center horizontally
        alignItems: 'center',     // Center vertically
        alignSelf: 'center',      // Center within parent container
    },
    inputSearch: {
        fontSize: 20
    }
})

export default SearchBar;