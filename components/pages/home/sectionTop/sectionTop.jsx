import React, { useEffect, useRef } from 'react'
import { Animated, TextInput, View } from 'react-native'
import states from '../../../../store/states';
import s from './sectionTop.styles';
import { sectionTopINIT } from './sectionTop.func';
import axios from 'axios';

export default function SectionTop({ search }) {
  const { VH, topBAR, setLocations, setActiveInput } = states()
  const animatedHeight = useRef(new Animated.Value(-VH * 0.3)).current;
  const styles = s(VH, animatedHeight)
  sectionTopINIT(search, animatedHeight)


  const autocomplete = async (input, setSearch) => {
    try {
      const encodedInput = encodeURIComponent(input);
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: encodedInput,
          format: 'json',
          addressdetails: 1,
          polygon_geojson: 0,
          countrycodes: 'TN',
          viewbox: '10.0718,36.6507,10.3523,36.9168',
          limit: 3,
          'accept-language': 'fr' // Change to 'en' for English
        }
      })
      const result = response.data.map(place => ({
        name: place.display_name,
        latitude: parseFloat(place.lat),
        longitude: parseFloat(place.lon),
      }))
      console.log(result)
      setLocations(result)
    } catch (error) {
      console.error('Error fetching autocomplete results:', error);
      // setSearch([]);
    }
  };
  return (
    <Animated.View style={styles.container}>
      <View style={{ marginTop: topBAR, width: '100%', height: 60, backgroundColor: 'purple' }}>
      </View>
      <TextInput onFocus={() => setActiveInput(1)} onBlur={() => setActiveInput(0)} onChangeText={autocomplete} style={{ width: '100%', height: 50, backgroundColor: 'brown' }} />
      <TextInput onFocus={() => setActiveInput(2)} onBlur={() => setActiveInput(0)} onChangeText={autocomplete} style={{ width: '100%', height: 50, backgroundColor: 'brown' }} />
    </Animated.View>
  )
}