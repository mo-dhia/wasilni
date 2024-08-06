import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableWithoutFeedback, Pressable, Animated, Text, TextInput } from 'react-native';
import SearchSVG from '../../../SVGs/search.svg.jsx';
import states from '../../../../store/states.js';
import MapSVG from '../../../SVGs/map.svg.jsx';
import s from './sectionBot.styles';
import { sectionBotInit } from './sectionBot.func.js';
import BusSVG from '../../../SVGs/bus.svg.jsx';
import TrainSVG from '../../../SVGs/train.svg.jsx';
import MetroSVG from '../../../SVGs/metro.svg.jsx';
import { getNearbyStations } from '../../../../functions/metroHandler.js';

export default function SectionBot({ search, toggleExpand }) {
    const { VW, VH, locations, activeInput, setDeparture, setDestination } = states();
    const [expanded, setExpanded] = useState(false)
    const animatedHeight = useRef(new Animated.Value(VH * 0.7)).current;
    const animatedOpacity = useRef(new Animated.Value(1)).current;
    const styles = s(VW, VH, animatedHeight, animatedOpacity)

    sectionBotInit(search, animatedHeight, animatedOpacity)
    useEffect(() => {
        setExpanded(search)
    }, [search])
    return (
        <>
            <Animated.View style={{ ...styles.container, backgroundColor: '#edf2f5' }}>
                {expanded ?
                    <Pressable onPress={toggleExpand} style={{ height: '17.5%', marginTop: 10, width: '100%', borderRadius: VW * 0.05, overflow: 'hidden', alignItems: 'center', backgroundColor: 'white' }}>
                        <TextInput style={{ flex: 1, width: '100%', }} />
                        <View style={{ height: 2, backgroundColor: '#edf2f5', width: '70%', }} />
                        <TextInput style={{ flex: 1, width: '100%', }} />
                    </Pressable>
                    : <Animated.View style={styles.topContainer}>
                        <Pressable onPress={toggleExpand} style={styles.searchContainer}>
                            <View style={styles.searchIconContainer}>
                                <SearchSVG width={VW * 0.07} height={VW * 0.07} />
                            </View>
                            <View style={styles.searchInput} />
                        </Pressable>

                        <View style={styles.mapContainer}>
                            <MapSVG width={VW * 0.065} height={VW * 0.065} />
                        </View>
                    </Animated.View>}


            </Animated.View>



        </>
    );
}