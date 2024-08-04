import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default function Map() {
    return <MapView style={styles.map}
        initialRegion={{
            latitude: 36.765373,
            longitude: 10.193074,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
    />
}


const styles = StyleSheet.create({
    
    map: {
      width: '100%',
      height: '100%',
      position: 'absolute'
    },
  });