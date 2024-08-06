import React, { useRef, useEffect } from 'react';
import { View, TouchableWithoutFeedback, Pressable, Animated } from 'react-native';
import SearchSVG from '../../../SVGs/search.svg.jsx';
import states from '../../../../store/states.js';
import MapSVG from '../../../SVGs/map.svg.jsx';
import s from './sectionBot.styles';
import { sectionBotInit } from './sectionBot.func.js';
import BusSVG from '../../../SVGs/bus.svg.jsx';
import TrainSVG from '../../../SVGs/train.svg.jsx';
import MetroSVG from '../../../SVGs/metro.svg.jsx';

export default function SectionBot({ search, toggleExpand }) {
    const { VW, VH } = states();
    const animatedHeight = useRef(new Animated.Value(VH * 0.7)).current;
    const animatedOpacity = useRef(new Animated.Value(1)).current;
    const styles = s(VW, VH, animatedHeight, animatedOpacity)

    sectionBotInit(search, animatedHeight, animatedOpacity)

    return (
        <TouchableWithoutFeedback onPress={toggleExpand}>
            <Animated.View style={styles.container}>
                <Animated.View style={styles.topContainer}>
                    <Pressable onPress={toggleExpand} style={styles.searchContainer}>
                        <View style={styles.searchIconContainer}>
                            <SearchSVG width={VW * 0.07} height={VW * 0.07} />
                        </View>
                        <View style={styles.searchInput} />
                    </Pressable>

                    <View style={styles.mapContainer}>
                        <MapSVG width={VW * 0.065} height={VW * 0.065} />
                    </View>
                </Animated.View>
                <View style={{
                    width: '100%', height: '5%', flexDirection: 'row', justifyContent: 'center', gap: VW * 0.15,
                    marginTop: '7.5%',
                }}>
                    <View style={{ height: 50, width: 60, backgroundColor: '#0E887D', justifyContent: 'center', alignItems: 'center', borderRadius: VW * 0.05 }}>
                        <BusSVG width={50} height={50} />
                    </View>
                    <View style={{ height: 50, width: 60, backgroundColor: '#0E887D', justifyContent: 'center', alignItems: 'center', borderRadius: VW * 0.05 }}>
                        <TrainSVG width={50} height={50} />
                    </View>
                    <View style={{ height: 50, width: 60, backgroundColor: '#0E887D', justifyContent: 'center', alignItems: 'center', borderRadius: VW * 0.05 }}>
                        <MetroSVG width={50} height={50} />
                    </View>
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}