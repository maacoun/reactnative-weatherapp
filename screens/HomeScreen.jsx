import React, { useState, useEffect, useMemo } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Location from 'expo-location';
import {useDataContext} from "../providers/SettingsProvider";
import lightTheme from '../styles/lightTheme';
import darkTheme from '../styles/darkTheme';


export const HomeScreen = ({navigation}) => {
  const [settings, setSettings] = useDataContext();

  const [vstupPocasko, setVstupPocasko] = useState("")
  const [location, setLocation] = useState(null);
  const [geocoded, setGeocoded] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const styles = settings.theme === 'light' ? lightTheme : darkTheme;

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync({
      permissionForegroundExplanation: 'We need access to your location to show you the weather',
      setSettings: {
        ...settings,
        locationServicesEnabled: status === 'granted' ? true : false,
      }
    });
    console.log(status);
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    // const geocoded = await Location.reverseGeocodeAsync(location.coords);
    // setGeocoded(geocoded);
  }

  const handleNavigationInput = () => {
    console.log(vstupPocasko);
    navigation.navigate("Weather", { weatherInput: vstupPocasko });
    setVstupPocasko("");
  }

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location.coords;
      navigation.navigate('Weather', { weatherInput: `${latitude},${longitude}` });
    }
  }, [location]);

  useEffect(() => {
    console.log("changed")
  }, [settings.theme])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={require('../assets/thunderstorm.png')} style={styles.logo} />
            <Text style={styles.appName}>Skywatch</Text>
            <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Type in your location" 
                  placeholderTextColor =  {settings.theme === 'light' ? "#d4d4d5" : "#d8d8eb"}
                  value={vstupPocasko} 
                  onChangeText={text => setVstupPocasko(text)} 
                  onSubmitEditing={handleNavigationInput}
                />
                <TouchableOpacity onPress={handleNavigationInput}><Ionicons name="search-outline" size={24} style={styles.inputContainerIcon} /></TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.gpsButton} onPress={getLocation}>
                <Text style={styles.gpsButtonText}>Use GPS instead</Text>
            </TouchableOpacity>
    </ScrollView>
    );
  }

  export default HomeScreen;