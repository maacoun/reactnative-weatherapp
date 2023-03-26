import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {useDataContext} from "../providers/SettingsProvider";
import lightTheme from '../styles/lightTheme';
import darkTheme from '../styles/darkTheme';

export const TempViewer = ({current, forecast}) => {
    const [settings, setSettings] = useDataContext();
    const styles = settings.theme === 'light' ? lightTheme : darkTheme;

    if (settings.units === "metric") {
        return (
            <View style={styles.tempdiv}>
                <Text style={styles.temperature}>{current.temp_c}°C</Text>
                <Text style={styles.text}>Feels Like: {current.feelslike_c}°C</Text>
                <Text style={styles.text}>{forecast.day.mintemp_c}°C/{forecast.day.maxtemp_c}°C</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.tempdiv}>
                <Text style={styles.temperature}>{current.temp_f}°F</Text>
                <Text style={styles.text}>Feels Like: {current.feelslike_f}°F</Text>
                <Text style={styles.text}>{forecast.day.mintemp_f}°F/{forecast.day.maxtemp_f}°F</Text>
            </View>
        );
    }
}

export default TempViewer;