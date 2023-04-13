import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingsProvider, {useDataContext} from './providers/SettingsProvider';
import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, Modal } from 'react-native';
import { LightSensor } from "expo-sensors";
import debounce from 'lodash/debounce';

// SCREENS
import Home from "./screens/HomeScreen";
import Weather from "./screens/WeatherScreen";
import Analytics from "./screens/AnalyticsScreen";
import Settings from "./screens/SettingsScreen";

export const SCREEN_HOME = "Home";
export const SCREEN_WEATHER = "Weather";
export const SCREEN_ANALYTICS = "Analytics";
export const SCREEN_SETTINGS = "Settings";

const Tab = createBottomTabNavigator();

const DEBOUNCE_DELAY_MS = 1000;

export default function App() {
  return (
    <SettingsProvider>
      <Root />
    </SettingsProvider>
  );
}

const Root = () => {
  const [settings, setSettings] = useDataContext();
  const [{ illuminance }, setData] = useState({ illuminance: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const [environment, setEnvironment] = useState("");

  useEffect(() => {
    _toggle();

    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    console.log("toggle");
    if (this._subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    this._subscription = LightSensor.addListener(data => {
      setData(data);
      if (data.illuminance > 1000) {
        setEnvironment("bright");
      }
      if (data.illuminance < 100) {
        setEnvironment("dim");
      }
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: settings.theme === "dark" ? "#1e1e1e" : "#e5e5f0",
          },
          headerTintColor: settings.theme === "dark" ? "#e5e5f0" : "#1e1e1e",
          tabBarStyle: {
            backgroundColor: settings.theme === "dark" ? "#1e1e1e" : "#e5e5f0",
          },
          tabBarActiveTintColor: settings.theme === "dark" ? "#e5e5f0" : "#1e1e1e",
          tabBarInactiveTintColor: settings.theme === "dark" ? "#e5e5f0" : "#1e1e1e",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === SCREEN_HOME) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === SCREEN_WEATHER) {
              iconName = focused ? 'cloud' : 'cloud-outline';
            } else if (route.name === SCREEN_ANALYTICS) {
              iconName = focused ? 'analytics' : 'analytics-outline';
            } else if (route.name === SCREEN_SETTINGS) {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}
      >
        <Tab.Screen name={SCREEN_HOME} component={Home} />
        <Tab.Screen name={SCREEN_WEATHER} component={Weather} />
        {/* <Tab.Screen name={SCREEN_ANALYTICS} component={Analytics} /> */}
        <Tab.Screen name={SCREEN_SETTINGS} component={Settings} />
      </Tab.Navigator>
      <Modal
        animationType="slide"
        transparent={true}
        visible={(environment == "bright" && settings.theme != "light") || (environment == "dim" && settings.theme != "dark") && settings.useLightSensor && modalVisible == false}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10, margin: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Change Theme</Text>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>The current environment is {environment}.</Text>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>Would you like to change the theme to {environment == "bright" ? "light" : "dark"}?</Text>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ fontSize: 16, color: "#007AFF", marginRight: 10 }} onPress={() => setModalVisible(!modalVisible)}>Cancel</Text>
              <Text style={{ fontSize: 16, color: "#007AFF" }} onPress={() => {
                setSettings({ ...settings, theme: environment == "bright" ? "light" : "dark" });
                setModalVisible(!modalVisible);
              }}>Change</Text>
            </View>
          </View>
        </View>
      </Modal>
    </NavigationContainer>
  );
}