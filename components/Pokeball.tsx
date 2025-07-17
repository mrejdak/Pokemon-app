import React from 'react';
import { StyleSheet, View } from 'react-native';


// ============= markers wouldn't render <View> and <Image> conditionally, switched to fetching pokeball image to keep both in <Image> components


export const PokeballIcon = ({ size }: { size: number }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Top half (red) */}
      <View style={[styles.half, styles.topHalf, { height: size / 2 + 1}]} />
      
      {/* Bottom half (white) */}
      <View style={[styles.half, styles.bottomHalf, { height: size / 2 - 1}]} />
      
      {/* Middle black line */}
      <View style={[styles.line, { width: size, height: size / 10 }]} />
      
      {/* Center button */}
      <View style={[styles.centerButton, { 
        width: size / 4, 
        height: size / 4,
        borderWidth: size / 20 
      }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  half: {
    position: 'absolute',
    width: '100%',
  },
  topHalf: {
    top: 0,
    backgroundColor: '#FF1C1C',
  },
  bottomHalf: {
    bottom: 0,
    backgroundColor: '#fff',
  },
  line: {
    backgroundColor: '#000',

    position: 'absolute',
  },
  centerButton: {
    backgroundColor: '#fff',
    borderRadius: 100,
    borderColor: '#000',
    position: 'absolute',
    zIndex: 10,
  },
});