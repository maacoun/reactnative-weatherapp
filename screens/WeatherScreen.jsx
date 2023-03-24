import React, {useEffect, useState} from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const WeatherScreen = ({route}) => {
  const {weatherInput} = route.params;
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const geoResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=dc501297718e46d6b1593532232403&q=${weatherInput}&days=1&aqi=no&alerts=no`);
      console.log(geoResponse);
      const data = await geoResponse.json();
      setWeatherData(data);
    };

    fetchWeatherData();
  }, [weatherInput]);

  if (!weatherData) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
            <Image source={require('../assets/thunderstorm.png')} style={styles.logo} />
            <Text>{JSON.stringify(weatherData)}</Text>
    </ScrollView>
  );
}

export default WeatherScreen;

const styles = StyleSheet.create({
  container: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF'
    },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    marginHorizontal: 20
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#333333'
  },
  icon: {
    padding: 10
  },
  gpsButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 20,
  },
  gpsButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF'
  }
});
