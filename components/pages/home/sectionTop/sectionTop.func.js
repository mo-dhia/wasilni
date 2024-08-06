import { useEffect } from "react";
import { Animated } from "react-native";



export const sectionTopINIT = (search, animatedHeight) => {
    const animateContainer = (expand) => {
        Animated.timing(animatedHeight, {
            toValue: expand ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };
    return useEffect(() => {
        animateContainer(search === 'true');
    }, [search]);

}