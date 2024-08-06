import React, { useEffect } from 'react';
import { Dimensions, StatusBar, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import states from '../../store/states';

export default function Init() {
    const { setVW, setVH, setTOPBAR } = states();
    const insets = useSafeAreaInsets();

    useEffect(() => {
        const updateDimensions = () => {
            const { width, height } = Dimensions.get('window');
            const statusBarHeight = Constants.statusBarHeight || 0;
            
            // Calculate full height including status bar and safe areas
            const fullHeight = height + statusBarHeight
            //  + insets.top + insets.bottom;
            setTOPBAR(statusBarHeight)
            setVW(width);
            setVH(fullHeight);
        };

        // Initial update
        updateDimensions();

        // Listen for dimension changes (e.g., rotation)
        const subscription = Dimensions.addEventListener('change', updateDimensions);

        // Cleanup
        return () => subscription.remove();
    }, [insets]);

    return null;
}