// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
// import React, { useCallback, useRef } from 'react';
// import { Button, StyleSheet, Text, View } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';


// // temporary

// const App = () => {

//   const bottomSheetRef = useRef<BottomSheet>(null);


//   const snapPoints = ['30%'];


//   const handleSheetChanges = useCallback((index: number) => {
//     console.log('handleSheetChanges', index);
//   }, []);

//   const handleExpandPress = () => {
//     bottomSheetRef.current?.expand();
//   };


//   return (<>
//     <View style={styles.contentContainer}>
//         <Button onPress={handleExpandPress} title="Expand" />
//       </View>
//     <GestureHandlerRootView style={styles.container}>
      
//       <BottomSheet
//         ref={bottomSheetRef}
//         snapPoints={snapPoints}
//         onChange={handleSheetChanges}
//         index={-1}
//       >
//         <BottomSheetView style={styles.contentContainer}>
//           <Text>Awesome 🎉</Text>
//         </BottomSheetView>
//       </BottomSheet>
//     </GestureHandlerRootView> </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'grey',
//   },
//   contentContainer: {
//     flex: 1,
//     padding: 100,
//     alignItems: 'center',
//   },
// });

// export default App;
