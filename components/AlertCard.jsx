import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {useDataContext} from "../providers/SettingsProvider";
import lightTheme from '../styles/lightTheme';
import darkTheme from '../styles/darkTheme';

export const AlertCard = ({alert}) => {
  const [settings, setSettings] = useDataContext();
  const styles = settings.theme === 'light' ? lightTheme : darkTheme;

  console.log(alert);
  //if alerts is empty, return view with no alerts
  if (alert == null) {
    return (
      <View style={styles.alert}>
        <Text style={styles.headline}>No alerts</Text>
      </View>
    );
  }
  else {
    return (
      <View style={styles.alert}>
        <Text style={styles.headline}>{alert.headline}</Text>
        <Text style={styles.alertText}>{alert.category}</Text>
        <Text style={styles.alertText}>{moment(alert.effective).format('DD.MM.YYYY')}</Text>
        <Text style={styles.alertText}>{moment(alert.expires).format('DD.MM.YYYY')}</Text>
        <Text style={styles.alertText}>{alert.desc}</Text>
      </View>
    );
  }
}

export default AlertCard;
