import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { useDataContext } from "../providers/SettingsProvider";
import lightTheme from "../styles/lightTheme";
import darkTheme from "../styles/darkTheme";
import { LightSensor } from "expo-sensors";

export const Popup = () => {
  const [{ illuminance }, setData] = useState({ illuminance: 0 });
  const [settings, setSettings] = useDataContext();
  const [alertDisplayed, setAlertDisplayed] = useState(false);
  const styles = settings.theme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    if (settings.useLightSensor) {
      _subscribe();
    } else {
      _unsubscribe();
    }

    return () => {
      _unsubscribe();
    };
  }, [settings.useLightSensor]);

  //běží nanejvýš jednou 
  useEffect(() => {
    const interval = setInterval(() => {
      if (settings.useLightSensor && settings.theme === "light" && illuminance < 10 && !alertDisplayed) {
        setAlertDisplayed(true);
        Alert.alert(
          "You are in a dim environment",
          "Would you like to set theme to dark?",
          [
            {
              text: "Yes",
              onPress: () => setSettings({ ...settings, theme: "dark" }),
              setAlertDisplayed: false,
            },
            {
              text: "No",
              onPress: () => console.log("Cancel Pressed"),
              setAlertDisplayed: false,
              style: "cancel",
            },
          ],
          { cancelable: false }
        );
      }
      else if (settings.useLightSensor && settings.theme === "dark" && illuminance > 100 && !alertDisplayed) {
        setAlertDisplayed(true);
        Alert.alert(
          "You are in a bright environment",
          "Would you like to set theme to light?",
          [
            {
              text: "Yes",
              onPress: () => setSettings({ ...settings, theme: "light" }),
              setAlertDisplayed: false,
            },
            {
              text: "No",
              onPress: () => console.log("Cancel Pressed"),
              setAlertDisplayed: false,
              style: "cancel",
            },
          ],
          { cancelable: false }
        );
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [illuminance, settings.useLightSensor, settings.theme, alertDisplayed]);

  const _subscribe = () => {
    this._subscription = LightSensor.addListener(setData);
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  return (
    <View style={styles.sensor}>
      <Text>Light Sensor:</Text>
      <Text>
        {settings.useLightSensor && (
          <>
            Illuminance:{" "}
            {Platform.OS === "android"
              ? `${illuminance} lx`
              : `Only available on Android`}
          </>
        )}
        {!settings.useLightSensor && <>Light Sensor is disabled in settings</>}
      </Text>
    </View>
  );
};

export default Popup;
