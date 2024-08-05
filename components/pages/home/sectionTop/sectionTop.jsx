import React, { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'
import states from '../../../../store/states';

export default function SectionTop({ search }) {
  const { VH } = states()
  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateContainer(search === 'true');
  }, [search]);

  const animateContainer = (expand) => {
    Animated.timing(animatedHeight, {
      toValue: expand ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const containerStyle = {
    transform: [
      {
        translateY: animatedHeight.interpolate({
          inputRange: [0, 1],
          outputRange: [-VH * 0.3, 0], // Assuming the height is 30% of VH
        }),
      },
    ],
  };

  return 
  (
    <Animated.View 
      style={[
        {
          width: '100%', 
          height: '30%', 
          backgroundColor: 'red', 
          position: 'absolute', 
          top: 0, 
          zIndex: 2,
          position: 'relative',
        },
        containerStyle
      ]}
    >
      {/* Your content here */}
    </Animated.View>
  )
}