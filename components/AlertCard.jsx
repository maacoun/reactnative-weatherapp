import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

export const AlertCard = ({alert}) => {
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
        <Text>{alert.category}</Text>
        <Text>{moment(alert.effective).format('DD.MM.YYYY')}</Text>
        <Text>{moment(alert.expires).format('DD.MM.YYYY')}</Text>
        <Text>{alert.desc}</Text>
      </View>
    );
  }
}

export default AlertCard;

const styles = StyleSheet.create({
  alert: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headline: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

});
