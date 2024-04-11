import { View, Pressable, Text, ScrollView, TouchableOpacity } from 'react-native';
import Input from './input';
import { locations, states } from '../../store';
import { calculateRoute } from '../../../functions/map_functions';
import { handleInput } from '../../../functions/input_functions';

export default function Search() {
    const { vw, vh, setRouteCoordinates, destination, origin, setInputRender, search, setOrigin, setDestination } = states();
    const { from, to, activeInput } = locations

    return (
        <View
            style={{
                zIndex: 1, width: '100%', height: '52%', backgroundColor: 'white',
                borderRadius: vw * 0.04, padding: '7.5%'
            }}
        >
            <View style={{ flex: 1, position: 'relative' }}>
                <Input inputRef={from} vw={vw} vh={vh} start={true} />
                <Input inputRef={to} vw={vw} vh={vh} />
                {activeInput.current ? null : <Pressable
                    onPress={() => calculateRoute(setRouteCoordinates, destination, origin)}
                    style={{
                        height: '32%', width: '95%', backgroundColor: 'blue', borderRadius: vw * 0.04, alignSelf: 'center',
                        bottom: '18%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#625ffe'
                    }}>
                    <Text style={{ fontFamily: 'Montserrat', fontWeight: 900, color: 'white', fontSize: vw * 0.035, }}>Get The Route</Text>
                </Pressable>}

                {!activeInput.current ? null :
                    <View style={{
                        position: 'absolute', top: '90%', height: vh * 0.5,
                        width: vw * 0.92, backgroundColor: 'white', left: -vw * 0.07,
                        zIndex: 1, borderRadius: vw * 0.04,

                    }}>
                        <View style={{
                            width: '100%', borderStyle: 'dashed', width: '50%', borderBottomWidth: 1,
                            alignSelf: 'center', borderColor: '#c4c4c4', marginTop: '5%'
                        }} />
                        <ScrollView style={{ flexGrow: 1, flexShrink: 1, marginTop: '10%' }}>

                            {search.map((e, index) => (
                                <TouchableOpacity onPress={() => handleInput(setInputRender, 0, e, activeInput.current > 1 ? setDestination : setOrigin)} key={index} style={{
                                    width: '100%', height: vh * 0.08,
                                    justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Text style={{ fontSize: vw * 0.05, flexWrap: 'wrap', alignSelf: 'center', width: '85%', textAlign: 'center' }}>{e.name}</Text>
                                    <View style={{ height: 1, width: '80%', backgroundColor: '#c4c4c4', position: 'absolute', bottom: 0 }} />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                }
            </View>
        </View>
    );
}

