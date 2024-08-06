import { StyleSheet } from 'react-native';

const styles = (VH, animatedHeight) => (
    StyleSheet.create({
        container: { opacity: 0.5, width: '100%', height: '30%', backgroundColor: 'red', position: 'absolute', top: 0, zIndex: 2, transform: [{ translateY: animatedHeight.interpolate({ inputRange: [0, 1], outputRange: [0, -VH * 0.3], }), },] },
    })
);

export default styles;