import React, {useEffect, useState} from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import axios from "axios";
import {ForecastCard} from "../components/ForecastCard";
import {AlertCard} from "../components/AlertCard";
import {TempViewer} from "../components/TempViewer";
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDataContext} from "../providers/SettingsProvider";


export const WeatherScreen = ({route}) => {
  const [settings, setSettings] = useDataContext();
  const { weatherInput } = route.params ? route.params : settings.defaultHometown == "" ? {weatherInput: "Prague"} : {weatherInput: settings.defaultHometown};

  const [location, setLocation] = useState([]);
  const [current, setCurrent] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [alerts, setAlerts] = useState([{}]);

  const [loading, setLoading] = useState(true);

  const apikey = "dc501297718e46d6b1593532232403";

  const fetchWeatherData = async () => {
    if (!weatherInput) return; // Return if no input is provided

    setLoading(true); // Set loading to true on component mount
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${weatherInput}&days=1&aqi=yes&alerts=yes`);
      //console.log(response.data);

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

      if (response.data.alerts) {
        setAlerts(response.data.alerts);
        console.log(response.data.alerts);
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
        <View style={styles.wrappingPanel}>
          <Text style={styles.place}>{location.name}</Text>
          <TempViewer current={current} forecast={forecast} />
          <Image source={{ uri: 'https:' + current.condition.icon.substring(2) }} style={styles.pictogram} />
          <Text style={styles.description}>{current.condition.text}</Text>
          <Text style={styles.time}>Last Updated: {moment(current.last_updated).format('HH:mm')}</Text>
          <View style={styles.buttons}>
            {settings.defaultHometown == "" && settings.defaultHometown != location.name ? (
              <TouchableOpacity style={styles.button} onPress={() => setSettings({...settings, defaultHometown: location.name})}>
                <Text style={styles.buttonText}>Set as default</Text>
              </TouchableOpacity>
            ) : null}
            {settings.defaultHometown != "" && settings.defaultHometown != location.name ? (
              <TouchableOpacity style={styles.button} onPress={() => setLocation({name: settings.defaultHometown})}>
                <Text style={styles.buttonText}>Show default</Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity style={styles.button} onPress={() => fetchWeatherData()}>
              <Text style={styles.buttonText}>Refresh</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
          <View style={styles.others}>
            <Text style={styles.text}>
              Humidity <Ionicons name="water-outline" style={styles.ionicon}/>: {current.humidity}% 
            </Text>
            <Text style={styles.text}>
              {settings.units == "metric" ? "Wind Speed" : "Wind Speed (mph)"} <Ionicons name="speedometer-outline" style={styles.ionicon}/>: {current.wind_kph} {settings.units == "metric" ? "km/h" : "mph"}
            </Text>
            <Text style={styles.text}>UV: {current.uv}</Text>
          </View>
          <View style={styles.separator} />
        </View>
      </View>
      <View style={styles.astro}>
        <View style={styles.wrappingPanel}>
          <Text style={styles.description}>Sunrise and Sunset</Text>
          <Text style={styles.text}>
            Sunrise <Ionicons name="sunny-outline" style={styles.ionicon}/>: {forecast.astro.sunrise}
          </Text>
          <Text style={styles.text}>
            Sunset <Ionicons name="moon-outline" style={styles.ionicon}/>: {forecast.astro.sunset}
          </Text>
          <Text style={styles.description}>Moon</Text>
          <Text style={styles.text}>
            Moonrise <Ionicons name="moon-outline" style={styles.ionicon}/>: {forecast.astro.moonrise}
          </Text>
          <Text style={styles.text}>
            Moonset <Ionicons name="moon-outline" style={styles.ionicon}/>: {forecast.astro.moonset}
          </Text>
          <Text style={styles.text}>
            Moon Phase <Ionicons name="moon-outline" style={styles.ionicon}/>: {forecast.astro.moon_phase}
          </Text>
          <Text style={styles.text}>
            Moon Illumination <Ionicons name="moon-outline" style={styles.ionicon}/>: {forecast.astro.moon_illumination}%
          </Text>
          <View style={styles.separator} />
          </View>
        </View>
      <View style={styles.airquality}>
        <View style={styles.wrappingPanel}>
          <Text style={styles.description}>Air Quality</Text>
            <View style={styles.airqualityvalues}>
              <Text style={styles.text}>
                PM10: {current.air_quality.pm10.toFixed(1)}
              </Text>
              <Text style={styles.text}>
                PM2.5: {current.air_quality.pm2_5.toFixed(1)}
              </Text>
              <Text style={styles.text}>
                NO2: {current.air_quality.no2.toFixed(1)}
              </Text>
              <Text style={styles.text}>
                O3: {current.air_quality.o3.toFixed(1)}
              </Text>
              <Text style={styles.text}>
                SO2: {current.air_quality.so2.toFixed(1)}
              </Text>
              <Text style={styles.text}>
                CO: {current.air_quality.co.toFixed(1)}
              </Text>
            </View>
          <View style={styles.separator} />
        </View>
      </View>

      {alerts.alert && alerts.alert.length > 0 ? (
        <View style={styles.alerts}>
          <View style={styles.wrappingPanel}>
            <Text style={styles.description}>
              Alerts <Ionicons name="warning-outline" style={styles.ionicon}/>
            </Text>
            {alerts.alert.map((alert, index) => (
              <AlertCard key={index} alert={alert} />
            ))}
            <View style={styles.separator} />
          </View>
        </View>
      ) : (
        <View style={styles.alerts}>
          <View style={styles.wrappingPanel}>
            <Text style={styles.description}>
              Alerts
            </Text>
            <Text style={styles.text}>No alerts <Ionicons name="beer-outline" style={styles.ionicon}/> </Text>
            <View style={styles.separator} />
          </View>
        </View>
      )}

      <View style={styles.bottom}>
      <View style={styles.wrappingPanel}>
        <Text style={styles.description}>Forecast</Text>
          <ScrollView horizontal={true}>
            {forecast.hour.map((forecast, index) => (
              <ForecastCard key={index} forecast={forecast} />
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: 'blue',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  centre : {
    //backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  astro : {
    //backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  airquality : {
    //backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  alerts : {
    //backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  bottom : {
    //backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  pictogram: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  place: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
  },
  ionicon: {
    fontSize: 16,
    marginBottom: 5,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tempdiv: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  others: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  airqualityvalues: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '75%',
    flexWrap: 'wrap',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  wrappingPanel: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  wrappingPanelText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

  

export default WeatherScreen;
