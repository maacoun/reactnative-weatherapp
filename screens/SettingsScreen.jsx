import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {useDataContext} from "../providers/SettingsProvider";
import * as Location from 'expo-location';
import lightTheme from '../styles/lightTheme';
import darkTheme from '../styles/darkTheme';

const SettingsScreen = () => {
  const [settings, setSettings] = useDataContext();
  const styles = settings.theme === 'light' ? lightTheme : darkTheme;

  const cancelGPSPermission = async () => {
    await Location.hasServicesEnabledAsync();
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync({ forceRequest: true });
      if (!granted) {
        alert('Location permission denied');
      }
    } catch (error) {
      console.log(error);
    }  };
  
  const toggleLocationServices = () => {
    setSettings({
      ...settings,
      locationServicesEnabled: !settings.locationServicesEnabled,
    });
    if (settings.locationServicesEnabled) {
      cancelGPSPermission();
    }
  };

  return (
    <ScrollView style={styles.settingsScreenContainer}>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
       <View style={styles.section}>
        <Text style={styles.sectionTitle}>Selected unit</Text>
        <Text style={styles.sectionSubtitle}>
          {settings.units === 'metric' ? 'Metric' : 'Imperial'}
        </Text>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionSmallText}>Imperial</Text>
          <Switch
            value={settings.units === 'metric'}
            onValueChange={() =>
              setSettings({
                ...settings,
                units: settings.units === 'metric' ? 'imperial' : 'metric',
              })
            }
          />
          <Text style={styles.sectionSmallText}>Metric</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Selected theme</Text>
        <Text style={styles.sectionSubtitle}>{settings.theme === 'light' ? 'Light' : 'Dark'}</Text>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionSmallText}>Dark</Text>
          <Switch
            value={settings.theme === 'light'}
            onValueChange={() =>
              setSettings({
                ...settings,
                theme: settings.theme === 'light' ? 'dark' : 'light',
              })
            }
          />
          <Text style={styles.sectionSmallText}>Light</Text>
        </View>
      </View>
      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location accuracy</Text>
        <Text style={styles.sectionSubtitle}>
          {settings.locationAccuracy === 'low' ? 'Low' : 'High'}
        </Text>
        <View style={styles.sectionRow}>
          <Text>High</Text>
          <Switch
            value={settings.locationAccuracy === 'low'}
            onValueChange={() =>
              setSettings({
                ...settings,
                locationAccuracy: settings.locationAccuracy === 'low' ? 'high' : 'low',
              })
            }
          />
          <Text>Low</Text>
        </View>
      </View> */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Default hometown</Text>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionSubtitle}>{settings.defaultHometown}</Text>
          <TextInput
            style={styles.sectionTextInput}
            value={settings.defaultHometown}
            onChangeText={(text) =>
              setSettings({
                ...settings,
                defaultHometown: text,
              })
            }
          />
        </View>
      </View>
      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location services</Text>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionSubtitle}>
            {settings.locationServicesEnabled ? 'Enabled' : 'Disabled'}
          </Text>
          <Switch
            value={settings.locationServicesEnabled}
            onValueChange={toggleLocationServices}
          />
        </View>
      </View> */}
    </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SettingsScreen;
