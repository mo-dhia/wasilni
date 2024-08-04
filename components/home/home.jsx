import React from 'react';
import { StyleSheet, View } from 'react-native';
import Map from './map/map';
import SectionBot from './sectionBot/sectionBot';
import SectionTop from './sectionTop/sectionTop';

export default function Home() {
    return <>
        <View style={styles.container}>
            <Map />
            <SectionTop />
            <SectionBot />
        </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between'
    }
});
