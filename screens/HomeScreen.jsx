import React, { useState, useEffect, useMemo } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Location from 'expo-location';

export const HomeScreen = ({navigation}) => {
  const [vstupPocasko, setVstupPocasko] = useState("")
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  //pri presmerovani se nezmeni predesla hodnota

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync({
      permissionForegroundExplanation: 'We need access to your location to show you the weather',
    });
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }

  const handleNavigationInput = () => {
    console.log(vstupPocasko);
    navigation.navigate("Weather", { weatherInput: vstupPocasko })
  }

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location.coords;
      navigation.navigate('Weather', { weatherInput: `${latitude},${longitude}` });
    }
  }, [location]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={require('../assets/thunderstorm.png')} style={styles.logo} />
            <Text style={styles.appName}>Simpleweather</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Type in your location" value={vstupPocasko} onChangeText={text => setVstupPocasko(text)} />
                <TouchableOpacity style={styles.icon} onPress={handleNavigationInput}>
                <Ionicons name="search-outline" size={24} color="#AAAAAA" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.gpsButton} onPress={getLocation}>
                <Text style={styles.gpsButtonText}>Use GPS instead</Text>
            </TouchableOpacity>
    </ScrollView>
    );
  }

  export default HomeScreen;
  
  const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
      },
    logo: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
      marginBottom: 20
    },
    appName: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 30
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 20,
      backgroundColor: '#F0F0F0',
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginBottom: 20,
      marginHorizontal: 20
    },
    input: {
      flex: 1,
      fontSize: 18,
      color: '#333333'
    },
    icon: {
      padding: 10
    },
    gpsButton: {
      backgroundColor: '#007AFF',
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 20,
    },
    gpsButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF'
    }
  });