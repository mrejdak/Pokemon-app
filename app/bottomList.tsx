import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { RefObject, useCallback, useRef } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// screens modal right now, gorhom later

// temporary



export const PokemonBottomSheet = (props: {ref: RefObject<BottomSheetMethods | null>, id : number | null}) => {

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = ['100%'];

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleExpandPress = () => {
    bottomSheetRef.current?.expand();
  };

  return (<>
    <View style={styles.contentContainer}>
        <Button onPress={handleExpandPress} title="Expand" />
      </View>
    <GestureHandlerRootView style={styles.container}>
      
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose={true}
        enableDynamicSizing={false}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView> </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 100,
    alignItems: 'center',
  },
});

export default PokemonBottomSheet;