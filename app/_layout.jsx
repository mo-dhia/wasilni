import { Slot } from 'expo-router';
import Init from '../components/init/init';
import { Text } from 'react-native';

export default function Layout() {
    return <>
        <Init />
        <Slot />
    </>
}
