import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {useDataContext} from "../providers/SettingsProvider";

export const ForecastCard = ({forecast}) => {
  const [settings, setSettings] = useDataContext();

  return (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>{moment(forecast.time).format('HH:mm')}</Text>
        {/* <Text style={styles.cardTitle}>{forecast.temp_c}°C</Text> */}
        {settings.units == "metric" ? <Text style={styles.cardTitle}>{forecast.temp_c}°C</Text> : <Text style={styles.cardTitle}>{forecast.temp_f}°F</Text>}
        <Text style={styles.cardTitle}>{forecast.chance_of_rain}<Ionicons name="water-outline" style={styles.ionicon}/></Text>
        <Image source={{ uri: 'https:' + forecast.condition.icon.substring(2) }} style={styles.icon} />
        <Text style={styles.cardTitle}>{forecast.condition.text}</Text>   
    </View>
  );
}

export default ForecastCard;

const styles = StyleSheet.create({
    card: {
        width: 175,
        height: 175,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        margin: 10,
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
      cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      icon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
      },
      ionicon: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      },
});
