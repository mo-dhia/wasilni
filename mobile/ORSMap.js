import { View, StyleSheet, Button } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { locations, states } from './components/store';

const ORSMap = ({ view }) => {
  const { routeCoordinates, destination, setDestination, origin, setOrigin } = states()
  const { map } = locations

  return (
    <View style={{ height: '100%', height: view ? '37%' : '100%' }}>

      <MapView
        ref={map}
        style={styles.map}
        initialRegion={{
          latitude: 36.765373,
          longitude: 10.193074,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={(event) => {
          const { coordinate } = event.nativeEvent;
          if (!origin) {
            setOrigin(coordinate);
          } else if (!destination) {
            setDestination(coordinate);
          }
        }}
      >
        {origin && <Marker coordinate={origin} />}
        {destination && <Marker coordinate={destination} />}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={4}
            strokeColor="#625ffe"
          />
        )}
      </MapView>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default ORSMap;
