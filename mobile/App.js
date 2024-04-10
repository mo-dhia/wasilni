import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import ORSMap from './ORSMap';
import Default from './components/default/default';
import { dimensions, states } from './components/store';
import Destination from './components/destination/destination';
import * as Font from 'expo-font';

export default function App() {
  const { setVW, setVH, view } = states();
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
        // Add other styles as needed
      });
      setFontLoaded(true);
    };

    const { width, height } = Dimensions.get('window');
    setVH(height);
    setVW(width);

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: 'gray',
      justifyContent: 'flex-end',
      fontFamily: 'Montserrat',
      flexDirection: view ? 'column-reverse' : 'column'
    }}>
      <ORSMap view={view} />
      {view ? <Destination /> : <Default />}
      <StatusBar style="auto" />
    </View>
  );
}

