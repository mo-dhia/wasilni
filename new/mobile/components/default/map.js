
import { View, StyleSheet, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useEffect } from 'react';
import * as Location from 'expo-location';
import { locations, states } from '../store';

export default function Map({ view }) {
    const { routeCoordinates, destination, setDestination, origin, setOrigin } = states()
    const { map } = locations
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords
            setOrigin({ latitude, longitude });
            map.current.animateToRegion({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
        })();
    }, []);

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
                {origin && (
                    <Marker coordinate={origin}>
                        <Image source={require('../../assets/markers/user.png')} style={{ height: 35, width: 35 }} />
                    </Marker>
                )}
                {routeCoordinates.length > 0 && (
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeWidth={4}
                        strokeColor="#625ffe"
                    />
                )}
            </MapView>


        </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

