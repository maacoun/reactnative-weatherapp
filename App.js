import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingsProvider, {useDataContext} from './providers/SettingsProvider';
import React, { useState, useEffect, Text } from 'react';
import { LightSensor } from "expo-sensors";

// SCREENS
import Home from "./screens/HomeScreen";
import Weather from "./screens/WeatherScreen";
import Analytics from "./screens/AnalyticsScreen";
import Settings from "./screens/SettingsScreen";
export const SCREEN_HOME = "Home"
export const SCREEN_WEATHER = "Weather"
export const SCREEN_ANALYTICS = "Analytics"
export const SCREEN_SETTINGS = "Settings"

const Tab = createBottomTabNavigator();

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

  // useEffect(() => {
  //   const subscription = LightSensor.addListener((data) => {
  //     setData(data);
  //   });
  //   return () => subscription.remove();
  // }, []);

  // useEffect(() => {
  //   console.log(illuminance);
  //   if (illuminance < 100) {
  //     setSettings({ theme: "dark" });
  //   } else {
  //     setSettings({ theme: "light" });
  //   }
  // }, [illuminance]);

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
    </NavigationContainer>
  );
}