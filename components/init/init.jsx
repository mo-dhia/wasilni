import React, { useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import states from '../../store/states';

export default function Init() {
    const { setVW, setVH } = states()
    useEffect(() => {
        const { width, height } = Dimensions.get('window');
        setVW(width)
        setVH(height)
    }, []);

    return null
}