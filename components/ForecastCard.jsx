import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {useDataContext} from "../providers/SettingsProvider";
import lightTheme from '../styles/lightTheme';
import darkTheme from '../styles/darkTheme';

export const ForecastCard = ({forecast}) => {
  const [settings, setSettings] = useDataContext();
  const styles = settings.theme === 'light' ? lightTheme : darkTheme;

  return (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>{moment(forecast.time).format('HH:mm')}</Text>
        {settings.units == "metric" ? <Text style={styles.cardTitle}>{forecast.temp_c}°C</Text> : <Text style={styles.cardTitle}>{forecast.temp_f}°F</Text>}
        <Text style={styles.cardTitle}>{forecast.chance_of_rain}<Ionicons name="water-outline" style={styles.ionicon}/></Text>
        <Image source={{ uri: 'https:' + forecast.condition.icon.substring(2) }} style={styles.icon} />
        <Text style={styles.cardTitle}>{forecast.condition.text}</Text>   
    </View>
  );
}

export default ForecastCard;
