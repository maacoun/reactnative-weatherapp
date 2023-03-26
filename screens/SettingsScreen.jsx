import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {useDataContext} from "../providers/SettingsProvider";
import * as Location from 'expo-location';

const SettingsScreen = () => {
  const [settings, setSettings] = useDataContext();

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
    <ScrollView style={styles.container}>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
       <View style={styles.section}>
        <Text style={styles.sectionTitle}>Selected unit</Text>
        <Text style={styles.sectionSubtitle}>
          {settings.units === 'metric' ? 'Metric' : 'Imperial'}
        </Text>
        <View style={styles.sectionRow}>
          <Text>Imperial</Text>
          <Switch
            value={settings.units === 'metric'}
            onValueChange={() =>
              setSettings({
                ...settings,
                units: settings.units === 'metric' ? 'imperial' : 'metric',
              })
            }
          />
          <Text>Metric</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Selected theme</Text>
        <Text style={styles.sectionSubtitle}>{settings.theme === 'light' ? 'Light' : 'Dark'}</Text>
        <View style={styles.sectionRow}>
          <Text>Dark</Text>
          <Switch
            value={settings.theme === 'light'}
            onValueChange={() =>
              setSettings({
                ...settings,
                theme: settings.theme === 'light' ? 'dark' : 'light',
              })
            }
          />
          <Text>Light</Text>
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
            style={styles.textInput}
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  sectionRow: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#777',
  },
});

export default SettingsScreen;
