import React, { useRef } from 'react';
import { View, TextInput, Text, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import axios from 'axios'
import { states, locations } from '../../store';
import { autocomplete, handleInput } from '../../../functions/input_functions';
const { activeInput } = locations

export default function Input({ inputRef, vw, vh, start }) {
    const inputValue = useRef('');
    const { setInputRender, search, setSearch } = states()
    return (
        <View style={{
            justifyContent: 'center', marginTop: start ? 0 : '-2%',
            height: start ? '25%' : '70%', width: '100%',
        }}>
            <Text style={{ fontSize: vw * 0.028, fontWeight: 'bold', color: '#c4c4c4' }}>
                {start ? 'Starting location' : 'Destination Location'}
            </Text>
            <View style={{ zIndex: -1, position: 'relative', }}>
                <TextInput
                    ref={inputRef}
                    style={{
                        height: 40, borderColor: 'gray', fontWeight: 'bold', height: vw * 0.15, fontFamily: 'Montserrat',
                        fontSize: vw * 0.035, fontWeight: 'bold',
                        borderWidth: 0, padding: 0,
                        borderRadius: vw * 0.04, marginTop: -vw * 0.04,
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
            {!inputValue.current ? null :
                <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#c4c4c4', position: 'absolute', bottom: '-30%', borderStyle: 'dashed' }} />}

        </View >
    )
}


