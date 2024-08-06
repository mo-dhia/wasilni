import React, { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'
import states from '../../../../store/states';
import s from './sectionTop.styles';

export default function SectionTop({ search }) {
  const { VH } = states()
  const animatedHeight = useRef(new Animated.Value(-VH * 0.3)).current;
  const styles = s(VH, animatedHeight)
  useEffect(() => {
    animateContainer(search === 'true');
  }, [search]);

  const animateContainer = (expand) => {
    Animated.timing(animatedHeight, {
      toValue: expand ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };


  return (
    <Animated.View style={styles.container}>
      {/* Your content here */}
    </Animated.View>
  )
}