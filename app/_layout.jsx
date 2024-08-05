import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { Slot, useRouter, usePathname } from 'expo-router';
import Init from '../components/init/init';

export default function Layout() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (pathname === '/') {
                // If we're on the home screen, let the OS handle the back button
                return false;
            } else {
                // Otherwise, navigate back within the app
                router.back();
                return true;
            }
        });

        return () => backHandler.remove();
    }, [pathname]);

    return (
        <>
            <Init />
            <Slot />
        </>
    );
}