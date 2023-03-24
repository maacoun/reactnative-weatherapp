import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';


export const HomeScreen = ({navigation}) => {
  const [vstupPocasko, setVstupPocasko] = useState("")
  const [location, setLocation] = useState(null);

  // Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

// function to check permissions and get Location
const getLocation = () => {
  const result = requestLocationPermission();
  result.then(res => {
    console.log('res is:', res);
    if (res) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
          setLocation(position);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
          setLocation(false);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  });
  console.log(location);
};

  const handleNavigationInput = () => {
    console.log(vstupPocasko);
    navigation.navigate("Weather", { weatherInput: vstupPocasko })
  }

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