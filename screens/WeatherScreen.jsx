import React, {useEffect, useState} from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import {ForecastCard} from "../components/ForecastCard";
import { SafeAreaView } from 'react-native-safe-area-context';

export const WeatherScreen = ({route}) => {
  const {weatherInput} = route.params;
  const [weatherData, setWeatherData] = useState(null);

  const [location, setLocation] = useState([]);
  const [current, setCurrent] = useState([]);
  const [forecast, setForecast] = useState([]);

  const apikey = "dc501297718e46d6b1593532232403";

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${weatherInput}&days=1&aqi=no&alerts=no`);
      setWeatherData(response.data);
  
      if (response.data.location) {
        setLocation(response.data.location);
      }
  
      if (response.data.current) {
        setCurrent(response.data.current);
      }
  
      if (response.data.forecast) {
        setForecast(response.data.forecast);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchWeatherData();
  }, []);
  

 
  return (
      //rozjebanej scrollview - scrollview nemuze mit flexend asi (nedavalo by to moc smysl) - zabalit do nej nejakej view, aby se dal nastavit flexend?
      <ScrollView vertical contentContainerStyle={styles.verticalScrollView}>
            <SafeAreaView style={styles.container}>
        <View style={styles.currentData}>
          <Text>{location.name}, {location.region}, {location.country}</Text>
          <Image source={require('../assets/thunderstorm.png')} style={styles.icon} />
          <Text style={styles.temperature}>{current.temp_c}°C</Text>
          <Text style={styles.description}>{current && current.condition && current.condition.text}</Text>
        </View>
        {/* <View>
          <Text>Humidity: {current.humidity}%</Text>
          <Text>Wind: {current.wind_kph} km/h</Text>
          <Text>Pressure: {current.pressure_mb} mb</Text>
        </View> */}
        <Text style={styles.hourlyForecast}>Hourly forecast</Text>
        
        <View style={styles.pokus}>
        <ScrollView horizontal contentContainerStyle={styles.horizontalScrollView}>
          {/* map hour forecast */}
          {forecast.forecastday && forecast.forecastday[0].hour.map((hour, index) => {
            return (
              <ForecastCard key={index} forecast={hour} />
            )
          })}
        </ScrollView>
        </View>
        </SafeAreaView>

      </ScrollView>
  );
}

export default WeatherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 24,
    flexDirection: 'column',
      justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentData: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  verticalScrollView: {
    marginBottom: 16,
  },
  horizontalScrollView: {
    paddingHorizontal: 8,
  },
  icon: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20
  },
  pokus: {
    alignSelf: 'flex-end', // align to the bottom of the container
    justifyContent: 'flex-end', // align to the right of the container
  },
});
