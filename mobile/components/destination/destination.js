import { View, Text, Pressable } from "react-native";
import { locations, states } from "../store";
import Header from "./header/header";
import Search from "./search/search";

export default function Destination() {
    const { vw, vh } = states()
    const { from, to } = locations
    return (
        <>
            <Pressable onPressIn={() => {
                if (from.current.isFocused()) {
                    from.current.blur();
                }
                if (to.current.isFocused()) {
                    to.current.blur()
                }
            }} style={{ width: '100%', height: '50%', top: '0%', paddingHorizontal: '4%', backgroundColor: '#f8f8f8' }}>
                <Header />
                <Search />
                <View style={{ width: '100%', height: '15%', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: vw * 0.041 }}>Stations Near You</Text>
                </View>
            </Pressable>
            <View style={{ backgroundColor: 'transparent', position: 'absolute', bottom: 0, width: '100%', height: '50%', justifyContent: 'flex-end', pointerEvents: 'none' }}>
                <View style={{ position: 'absolute', backgroundColor: '#f8f8f8', width: '4%', height: '100%', left: 0 }} />
                <View style={{ position: 'absolute', backgroundColor: '#f8f8f8', width: '4%', height: '100%', right: 0 }} />

            </View>
            <View style={{ backgroundColor: '#f8f8f8', width: '100%', height: '15%', position: 'absolute', bottom: 0 }}>

            </View>
        </>
    )
}
