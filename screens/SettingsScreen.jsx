import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TextInput } from 'react-native';
import {useDataContext} from "../providers/SettingsProvider";

const SettingsScreen = () => {
  // const [units, setUnits] = useState('metric');
  // const [theme, setTheme] = useState('light');
  // const [defaultHometown, setDefaultHometown] = useState();
  // const [locationServicesEnabled, setLocationServicesEnabled] = useState(true);

  const [settings, setSettings] = useDataContext();

  const toggleLocationServices = () => {
    setSettings({
      ...settings,
      locationServicesEnabled: !settings.locationServicesEnabled,
    });
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Default hometown</Text>
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
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location services</Text>
        <Text style={styles.sectionSubtitle}>
          {settings.locationServicesEnabled ? 'Enabled' : 'Disabled'}
        </Text>
        <Switch
          value={settings.locationServicesEnabled}
          onValueChange={toggleLocationServices}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
