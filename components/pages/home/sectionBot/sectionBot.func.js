import { useEffect } from "react";
import { Animated } from "react-native";

export const sectionBotInit = (search, animatedHeight, animatedOpacity) => {
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
    return useEffect(() => {
        animateContainer(search === 'true');
    }, [search]);
}