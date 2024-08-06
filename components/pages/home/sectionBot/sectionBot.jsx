import React, { useRef, useEffect } from 'react';
import { View, TouchableWithoutFeedback, Pressable, Animated } from 'react-native';
import SearchSVG from '../../../SVGs/search.svg.jsx';
import states from '../../../../store/states.js';
import MapSVG from '../../../SVGs/map.svg.jsx';
import s from './sectionBot.styles';

export default function SectionBot({ search, toggleExpand }) {
    const { VW, VH } = states();
    const animatedHeight = useRef(new Animated.Value(VH * 0.7)).current;
    const animatedOpacity = useRef(new Animated.Value(1)).current;
    const styles = s(VW, VH, animatedHeight, animatedOpacity)

    useEffect(() => {
        animateContainer(search === 'true');
    }, [search]);

    const animateContainer = (expand) => {
        Animated.parallel([
            Animated.timing(animatedHeight, {
                toValue: expand ? 0 : 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(animatedOpacity, {
                toValue: expand ? 0 : 1,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start();
    };

    return (
        <TouchableWithoutFeedback onPress={toggleExpand}>
            <Animated.View style={styles.container}>
                <Animated.View style={styles.topContainer}>
                    <Pressable onPress={toggleExpand} style={styles.searchContainer}>
                        <View style={styles.searchIconContainer}>
                            <SearchSVG style={{ opacity: 1 }} width={VW * 0.07} height={VW * 0.07} />
                        </View>
                        <View style={styles.searchInput} />
                    </Pressable>

                    <View style={styles.mapContainer}>
                        <MapSVG width={VW * 0.065} height={VW * 0.065} />
                    </View>
                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}