import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import Constants from 'expo-constants';

export default function Map() {
    const [VH, setVH] = useState('100%')
    useEffect(() => {
        const { height } = Dimensions.get('window');
        const statusBarHeight = Constants.statusBarHeight || 0;
        const fullHeight = height + statusBarHeight;

        setVH(fullHeight);
    }, []);

    const styles = StyleSheet.create({

        map: {
            width: '100%',
            height: VH,
            position: 'absolute'
        },
    });
    return <MapView style={styles.map}
        initialRegion={{
            latitude: 36.765373,
            longitude: 10.193074,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
    />
}


