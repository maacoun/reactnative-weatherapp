import * as React from 'react';
import { Text, ScrollView, View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Popup from '../components/Popup';
import lightTheme from '../styles/lightTheme';
import darkTheme from '../styles/darkTheme';
import {useDataContext} from "../providers/SettingsProvider";

export const AnalyticsScreen = () => {
  const [settings, setSettings] = useDataContext();
  const styles = settings.theme === 'light' ? lightTheme : darkTheme;

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.text}>History Screen</Text>
        <Popup />
    </ScrollView>
  );
}

export default AnalyticsScreen;
