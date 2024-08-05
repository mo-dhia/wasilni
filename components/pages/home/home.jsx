import React, { useRef } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Keyboard } from 'react-native';
import Map from './map/map';
import SectionBot from './sectionBot/sectionBot';
import SectionTop from './sectionTop/sectionTop';
import { useLocalSearchParams } from 'expo-router';

export default function Home() {
    const { search } = useLocalSearchParams();

    const handleOutsidePress = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View style={styles.container}>
                <Map />
                {/* <SectionTop /> */}
                <SectionBot search={search} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
    }
});