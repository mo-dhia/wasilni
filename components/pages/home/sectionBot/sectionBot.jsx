import React, { useRef, useEffect } from 'react';
import { View, TouchableWithoutFeedback, Pressable, Animated, BackHandler } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import SearchSVG from '../../../SVGs/search.svg.jsx';
import states from '../../../../store/states.js';
import MapSVG from '../../../SVGs/map.svg.jsx';

export default function SectionBot({ search }) {
    const { VW, VH } = states();
    const router = useRouter();
    const animatedHeight = useRef(new Animated.Value(0)).current;
    const animatedOpacity = useRef(new Animated.Value(1)).current;

    

    useEffect(() => {
        animateContainer(search === 'true');
    }, [search]);

    const animateContainer = (expand) => {
        Animated.parallel([
            Animated.timing(animatedHeight, {
                toValue: expand ? 1 : 0,
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

    const toggleExpand = () => {
        const newsearch = search !== 'true';
        router.setParams({ search: newsearch.toString() });
    };

    const containerStyle = {
        transform: [
            {
                translateY: animatedHeight.interpolate({
                    inputRange: [0, 1],
                    outputRange: [VH * 0.7, 0],
                }),
            },
        ],
    };

    return (
        <TouchableWithoutFeedback onPress={toggleExpand}>
            <Animated.View
                style={[
                    {
                        width: '100%',
                        height: VH,
                        backgroundColor: '#FFFFFF',
                        zIndex: 1,
                        borderTopLeftRadius: VW * 0.06,
                        borderTopRightRadius: VW * 0.06,
                        shadowColor: "#000",
                        paddingHorizontal: VW * 0.05,
                        paddingVertical: VW * 0.1,
                        position: 'absolute',
                        bottom: 0,
                    },
                    containerStyle
                ]}
            >
                <Animated.View style={{ opacity: animatedOpacity, display: 'flex', height: VW * 0.15, flexDirection: 'row', justifyContent: 'space-between', gap: VW * 0.025 }}>
                    <Pressable onPress={toggleExpand} style={{
                        backgroundColor: '#ECF3F5', width: '80%', height: '100%', borderRadius: VW * 0.04, display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <View style={{ width: '20%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <SearchSVG style={{ opacity: 1 }} width={VW * 0.07} height={VW * 0.07} />
                        </View>
                        <View style={{ flex: 1, }}>

                        </View>
                    </Pressable>

                    <View style={{ flex: 1, backgroundColor: '#ECF3F5', borderRadius: VW * 0.04, justifyContent: 'center', alignItems: 'center' }}>
                        <MapSVG width={VW * 0.065} height={VW * 0.065} />
                    </View>
                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}