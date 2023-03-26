import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_STORAGE_KEY = 'settings';

const defaultSettings = {
  units: 'metric',
  theme: 'light',
  defaultHometown: '',
  locationServicesEnabled: false,
  locationAccuracy: "low"
};

const SettingsContext = createContext(defaultSettings);

export const useDataContext = () => useContext(SettingsContext);

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
        if (storedSettings) {
          setSettings(JSON.parse(storedSettings));
        }
      } catch (error) {
        console.error('Error loading settings from storage:', error);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
        console.log('Settings saved to storage');
        console.log(settings);
      } catch (error) {
        console.error('Error saving settings to storage:', error);
      }
    };
    saveSettings();
  }, [settings]);

  return (
    <SettingsContext.Provider value={[settings, setSettings]}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
