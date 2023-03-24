import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

export const ForecastCard = ({forecast}) => {
    console.log(forecast);
    console.log( forecast.condition.icon.substring(2) );
  return (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>{moment(forecast.time).format('HH:mm')}</Text>
        <Text style={styles.cardTitle}>{forecast.temp_c}°C</Text>
        <Image source={{ uri: 'https:' + forecast.condition.icon.substring(2) }} style={styles.icon} />
        <Text style={styles.cardTitle}>{forecast.condition.text}</Text>   
    </View>
  );
}

export default ForecastCard;

const styles = StyleSheet.create({
    card: {
        width: 150,
        height: 180,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        marginRight: 16,
        alignItems: 'center',
        justifyContent: 'center',
      },
      cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      icon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
      },
});
