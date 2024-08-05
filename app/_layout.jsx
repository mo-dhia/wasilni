import React from 'react';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Init from '../components/init/init';

export default function Layout() {
    return (
        <SafeAreaProvider>
            <Init />
            <Slot />
        </SafeAreaProvider>
    );
}