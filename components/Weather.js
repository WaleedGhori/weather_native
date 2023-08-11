import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { clear_day, clear_night, cloud_day, cloud_night, haze_day, haze_night, rain_day, rain_night, snow_day, snow_night} from '../assets/backgrounds/index'
const apiKey = 'a1a8f4cca3ea2120af85ecae0b86c46d'

const Weather = (props) => {
    console.log(props);
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [icon, setIcon] = useState();
    const [background , setBackGround] = useState()
    const fetchApi = async (cityname) => {
        setLoading(true)
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}`)
        if (res.status == 200) {
            let data = await res.json()
            setWeatherData(data)
        }
        setLoading(false)
    }
    useEffect(() => {
        const obj = {
            snow: <FontAwesome name="snowflake-o" size={48} color="black" />,
            cloud: <Ionicons name="cloudy" size={48} color="white" />,
            haze: <Fontisto name="day-haze" size={48} color="black" />,
            sun: <Feather name="sun" size={48} color="black" />,
            smoke: <MaterialCommunityIcons name="smoke" size={48} color="black" />,
            rainy: <Ionicons name="rainy" size={48} color="black" />,
            dust: <FontAwesome name="industry" size={24} color="black" />
        }
      
        if (weatherData != null) {

            const now = new Date()
            const sunrise = new Date(weatherData.sys.sunrise * 1000);
            const sunset = new Date(weatherData.sys.sunset * 1000);
            const isDayTime = now>sunrise && now<sunset


            switch (weatherData.weather[0].main) {
                case 'Snow':
                    setIcon(obj.snow)
                    isDayTime ? setBackGround(snow_day) :setBackGround(snow_night)
                    break
                case 'Smoke':
                    setIcon(obj.smoke)
                    isDayTime ? setBackGround(snow_day) :setBackGround(snow_night)
                    break
                case 'Clouds':
                    setIcon(obj.cloud)
                    isDayTime ? setBackGround(cloud_day) :setBackGround(cloud_night)
                    break
                case 'Clear':
                    setIcon(obj.sun)
                    isDayTime ? setBackGround(clear_day) :setBackGround(clear_night)
                    break
                case 'Rainy':
                    setIcon(obj.rainy)
                    isDayTime ? setBackGround(rain_day) :setBackGround(rain_night)
                    break
                case 'Haze':
                    setIcon(obj.haze)
                    isDayTime ? setBackGround(haze_day) :setBackGround(haze_night)
                    break
                case 'Dust':
                    setIcon(obj.dust)
                    isDayTime ? setBackGround(snow_day) :setBackGround(snow_night)
                    break
                default:
                    setIcon(obj.haze)
                    isDayTime ? setBackGround(snow_day) :setBackGround(snow_night)

            } 
            props.background(background)
        }
    }, [weatherData])

    useEffect(() => {
        if (props.cityName != '') {
            fetchApi(props.cityName)
        }
    }, [props.cityName])

    if (loading) {
        return (
            <ActivityIndicator style={styles.activity} size='large' />
        )
    }
    else if (weatherData == null) {
        return (
            <View><Text style={styles.cityText}>Enter a City Name</Text></View>
        )
    }

    else {
        return (
            <View style={styles.main}>
                <Text style={styles.centigrade}>{weatherData.wind.deg}°</Text>
                <Text style={styles.city}>{weatherData.name}</Text>
                <View style={styles.iconView}>
                    <View >
                        <Text style={styles.humidity}>{weatherData.main.humidity}</Text>
                        <Text style={styles.temperature}>{weatherData.main.temp}</Text>
                    </View>
                    <View>
                        <Text style={styles.icon}>{icon}</Text>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({

    centigrade: {
        textAlign: 'center',
        fontSize: 60,
        marginTop: 100,
    },
    city: {
        textAlign: 'center',
        fontSize: 20,
    },
    iconView: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: 50,
        width: Dimensions.get('screen').width - 50,
        alignSelf: 'center',
        color: 'black',

    },
    activity: {
        marginTop: 100,
    },
    cityText: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: 30
    },
    humidity: { fontSize: 18 },
    temperature: { fontSize: 18 },
    icon: { fontSize: 18 }
})

export default Weather;