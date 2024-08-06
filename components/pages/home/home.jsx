import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Keyboard, BackHandler } from 'react-native';
import Map from './map/map';
import SectionBot from './sectionBot/sectionBot';
import SectionTop from './sectionTop/sectionTop';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function Home() {
    const { search } = useLocalSearchParams();
    const router = useRouter();


    const toggleExpand = () => {
        const newsearch = search !== 'true';
        router.setParams({ search: newsearch.toString() });
    };
    const handleBackPress = () => {
        if (search === 'true') {
            toggleExpand();
            return true; // Prevent default back action
        }
        return false; // Allow default back action
    };
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => backHandler.remove();
    }, [search]);


    const handleOutsidePress = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View style={styles.container}>
                <Map />
                <SectionTop search={search} />
                <SectionBot search={search} toggleExpand={toggleExpand} />
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