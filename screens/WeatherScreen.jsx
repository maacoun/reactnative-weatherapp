import React, {useEffect, useState} from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import {ForecastCard} from "../components/ForecastCard";
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';

export const WeatherScreen = ({route}) => {
  const [weatherData, setWeatherData] = useState(null);

  const [location, setLocation] = useState([]);
  const [current, setCurrent] = useState([]);
  const [forecast, setForecast] = useState([]);

  const [loading, setLoading] = useState(true);

  const apikey = "dc501297718e46d6b1593532232403";

  if (route.params === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Weather Screen</Text>
      </View>
    );
  }
  else {
    const {weatherInput} = route.params;
  }

  const fetchWeatherData = async () => {
    setLoading(true); // Set loading to true on component mount
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${weatherInput}&days=1&aqi=no&alerts=no`);
      //console.log(response.data);
      setWeatherData(response.data);

      if (response.data.location) {
        setLocation(response.data.location);
        //console.log(response.data.location);
      }
  
      if (response.data.current) {
        setCurrent(response.data.current);
        //console.log(response.data.current);
      }
  
      if (response.data.forecast) {
        setForecast(response.data.forecast.forecastday[0]);
        //console.log(response.data.forecast.forecastday[0]);
      }

      setLoading(false); // Set loading to false once data is loaded
    } catch (error) {
      console.error(error);
      setLoading(false); // Set loading to false in case of error
    }
  };
  
  useEffect(() => {
    fetchWeatherData();
  }, [weatherInput]);

  //Koleso nacitani
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      </View>
    );
  }
 
  return (
    <ScrollView vertical={true} contentContainerStyle={styles.container}>
      <View style={styles.centre}>
        <Text style={styles.place}>{location.name}</Text>
        <Text style={styles.description}>{current.condition.text}</Text>
        <Image source={require('../assets/thunderstorm.png')} style={styles.icon} />
        <Text style={styles.temperature}>{current.temp_c}°C</Text>
        <Text style={styles.minmax}>Feels Like: {current.feelslike_c}°C</Text>
        <Text style={styles.minmax}>{forecast.day.mintemp_c}°C/{forecast.day.maxtemp_c}°C</Text>
        <View style={styles.separator} />
        <View style={styles.others}>
          <Text style={styles.minmax}>Humidity: {current.humidity}%</Text>
          <Text style={styles.minmax}>Wind: {current.wind_kph}km/h</Text>
          <Text style={styles.minmax}>Precipitation: {forecast.day.totalprecip_mm}mm</Text>
          <Text style={styles.minmax}>Pressure: {current.pressure_mb}mb</Text>
        </View>
        {/* <Text style={styles.minmax}>UV: {current.uv}</Text>
        <Text style={styles.minmax}>Sunrise: {forecast.astro.sunrise}</Text>
        <Text style={styles.minmax}>Sunset: {forecast.astro.sunset}</Text>
        <Text style={styles.minmax}>Moonrise: {forecast.astro.moonrise}</Text>
        <Text style={styles.minmax}>Moonset: {forecast.astro.moonset}</Text>
        <Text style={styles.minmax}>Moon Phase: {forecast.astro.moon_phase}</Text>
        <Text style={styles.minmax}>Moon Illumination: {forecast.astro.moon_illumination}%</Text> */}
        <Text style={styles.minmax}>Last Updated: {moment(current.last_updated).format('HH:mm')}</Text>
      </View>
      <View style={styles.bottom}>
        <ScrollView horizontal={true}>
          {forecast.hour.map((forecast, index) => (
            <ForecastCard key={index} forecast={forecast} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'blue',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  centre : {
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  bottom : {
    // backgroundColor: 'green',
  },
  icon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 20
  },
  place: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  description: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  temperature: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  minmax: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
  },
  others: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '75%',
    flexWrap: 'wrap',
  }
});

  

export default WeatherScreen;
