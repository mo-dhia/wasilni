import React, { useRef } from 'react';
import { View, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios'
import { states, locations } from '../../store';
const { activeInput } = locations

export default function Input({ inputRef, vw, vh, start }) {
    const inputValue = useRef('');
    const { setInputRender, search, setSearch } = states()
    return (
        <View style={Object.assign({
            flex: activeInput.current === 2 ? 0 : 1, justifyContent: 'center',
            height: start ? 0 : 'auto',
        }, activeInput.current === 2 && start ? { overflow: 'hidden' } : activeInput.current === 1 && !start ? { overflow: 'hidden' } : null)}>
            <Text style={{ fontSize: vw * 0.03, fontWeight: 'bold', color: '#c4c4c4' }}>
                {start ? 'Starting location' : 'Destination Location'}
            </Text>
            <View style={{ zIndex: -1, position: 'relative', }}>
                <TextInput
                    ref={inputRef}
                    style={{
                        height: 40, borderColor: 'gray', fontWeight: 'bold', height: vw * 0.15,
                        borderWidth: conditionalStyle(start, 1, 0), padding: conditionalStyle(start, vw * 0.02, 0),
                        borderRadius: vw * 0.04, marginTop: conditionalStyle(start, vw * 0.04, 0),
                        display: activeInput.current === 1 && !start ? 'none' : 'flex'
                    }}
                    onChangeText={text => {
                        inputValue.current = text;
                        autocomplete(text, setSearch);
                    }}
                    placeholder={start ? 'Your Current Location' : 'Select Your Destination Location'}
                    onBlur={() => {
                        if (!inputValue.current || !search.length) {
                            setTimeout(() => {
                                if (start && activeInput.current === 1) {
                                    handleInput(setInputRender, 0)

                                } else if (!start && activeInput.current === 2) {
                                    handleInput(setInputRender, 0)
                                } else if (activeInput === 0) {
                                    handleInput(setInputRender, 0)
                                }
                            }, 0)
                        }
                    }}
                    onFocus={() => handleInput(setInputRender, start ? 1 : 2)}
                />
            </View>
            {!activeInput.current || start && activeInput.current !== 1 ? null : (
                <View style={{
                    position: 'absolute', top: '100%', height: vh * (start ? 0.7 : 0.5),
                    width: vw * 0.92, backgroundColor: 'white', bottom: '0%', left: -vw * 0.07, marginTop: activeInput.current === 2 ? '4%' : 0,
                    zIndex: 1, borderRadius: vw * 0.04, paddingTop: vw*0.01
                }}>
                    <ScrollView style={{ flexGrow: 1, flexShrink: 1 }}>

                        {search.map((e, index) => (
                            <TouchableOpacity onPress={() => handleInput(setInputRender, 0)} key={index} style={{
                                width: '100%', height: vh * 0.08,
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Text style={{ fontSize: vw * 0.05 }}>{e.name}</Text>
                                <View style={{ height: 1, width: '80%', backgroundColor: '#c4c4c4', position: 'absolute', bottom: 0 }} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View >
    )
}


const handleInput = (setInputRender, current) => {
    activeInput.current = current
    setInputRender(p => !p)
}

function conditionalStyle(start, unit1, unit2) {
    console.log(activeInput.current, start);
    return activeInput.current === 2 && !start ? unit1 : activeInput.current === 1 && start ? unit1 : unit2
}
const autocomplete = async (input, setSearch) => {
    try {
        const encodedInput = encodeURIComponent(input);
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodedInput}&format=json&addressdetails=1&polygon_geojson=0&countrycodes=TN&viewbox=10.0718,36.6507,10.3523,36.9168&limit=3`);
        const result = response.data.map(place => ({
            name: place.display_name,
            latitude: parseFloat(place.lat),
            longitude: parseFloat(place.lon),
        }))
        setSearch(result)
    } catch (error) {
        console.error('Error fetching autocomplete results:', error);
        setSearch([]);
    }
};