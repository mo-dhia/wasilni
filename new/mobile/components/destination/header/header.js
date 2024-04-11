import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './header.styles';
import { states } from '../../store';

export default function Header() {
    const { vw, vh, activeInput } = states()
    const style = styles(vw, vh, activeInput)

    return (
        <View style={style.header_wrapper}>
            <View style={style.header_container}>
                <View style={style.header_imgContainer}>

                </View>
                <View style={style.header_textContainer}>
                    <Text style={style.header_cheer}>Hey Med Dhia {'<3'}</Text>
                    <Text style={style.header_howru}>How are you doing today</Text>
                </View>
                <TouchableOpacity style={style.header_btn}>

                </TouchableOpacity>
            </View>
        </View>)
}
