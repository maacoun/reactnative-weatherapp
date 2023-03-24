import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// SCREENS
import Home from "./screens/HomeScreen";
import Weather from "./screens/WeatherScreen";
import Analytics from "./screens/AnalyticsScreen";
export const SCREEN_HOME = "Home"
export const SCREEN_WEATHER = "Weather"
export const SCREEN_ANALYTICS = "Analytics"

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case SCREEN_HOME:
                iconName = focused ? "home" : "home-outline";
                break;
              case SCREEN_WEATHER:
                iconName = focused ? "cloud" : "cloud-outline";
                break;
              case SCREEN_ANALYTICS:
                iconName = focused ? "analytics" : "analytics-outline";
                break;
              default: iconName = "information-circle";
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={SCREEN_HOME} component={Home} />
        <Tab.Screen name={SCREEN_WEATHER} component={Weather} />
        <Tab.Screen name={SCREEN_ANALYTICS} component={Analytics} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}