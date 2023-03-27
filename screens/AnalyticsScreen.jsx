import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Popup from '../components/Popup';

export const AnalyticsScreen = () => {
  return (
    <View>
        <Text>History Screen</Text>
        <Popup />
    </View>
  );
}

export default AnalyticsScreen;
