import React, { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'
import states from '../../../../store/states';
import s from './sectionTop.styles';
import { sectionTopINIT } from './sectionTop.func';

export default function SectionTop({ search }) {
  const { VH } = states()
  const animatedHeight = useRef(new Animated.Value(-VH * 0.3)).current;
  const styles = s(VH, animatedHeight)
 
  sectionTopINIT(search, animatedHeight)

  return (
    <Animated.View style={styles.container}>
      {/* Your content here */}
    </Animated.View>
  )
}