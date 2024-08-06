import { StyleSheet, Animated } from 'react-native';

const styles = (VW, VH, animatedHeight,animatedOpacity) => (
    StyleSheet.create({
        container: { width: '100%', height: VH, backgroundColor: '#FFFFFF', zIndex: 1, borderTopLeftRadius: VW * 0.06, borderTopRightRadius: VW * 0.06, shadowColor: "#000", paddingHorizontal: VW * 0.05, paddingVertical: VW * 0.1, position: 'absolute', top: 0, transform: [{ translateY: animatedHeight.interpolate({ inputRange: [0, 1], outputRange: [VH * 0.15, VH * 0.7] }) }] },
        topContainer: { display: 'flex', height: VW * 0.15, flexDirection: 'row', justifyContent: 'space-between', gap: VW * 0.025 },
        searchContainer:{ backgroundColor: '#ECF3F5', width: '80%', height: '100%', borderRadius: VW * 0.04, display: 'flex', flexDirection: 'row' },
        searchIconContainer: { width: '20%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' },
        searchInput: { flex: 1 },
        mapContainer:{ flex: 1, backgroundColor: '#ECF3F5', borderRadius: VW * 0.04, justifyContent: 'center', alignItems: 'center' }
    })
);

export default styles;