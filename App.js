import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingsProvider, {useDataContext} from './providers/SettingsProvider';
import React from 'react';

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
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: settings.theme === "dark" ? "#252525" : "cccccc",
          },
          headerTintColor: settings.theme === "dark" ? "#cccccc" : "#252525",
          tabBarStyle: {
            backgroundColor: settings.theme === "dark" ? "#252525" : "cccccc",
          },
          tabBarActiveTintColor: settings.theme === "dark" ? "#cccccc" : "#252525",
          tabBarInactiveTintColor: settings.theme === "dark" ? "#cccccc" : "#252525",
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
        <Tab.Screen name={SCREEN_ANALYTICS} component={Analytics} />
        <Tab.Screen name={SCREEN_SETTINGS} component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}