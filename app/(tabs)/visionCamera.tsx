import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { AppState, StyleSheet, Text, View } from "react-native";
import { Frame, useCameraDevice, useCameraPermission } from "react-native-vision-camera";
import { Camera, Face, FaceDetectionOptions } from "react-native-vision-camera-face-detector";

export default function VisionCamera() {
  const device = useCameraDevice('front')
  const { hasPermission, requestPermission } = useCameraPermission()
  const isFocused = useIsFocused()
  const isActive = isFocused && AppState.currentState === "active"

  useEffect(() => {requestPermission()}, [])

  const faceDetectionOptions = useRef<FaceDetectionOptions>( {
    landmarkMode: 'all'
  } ).current

  const handleFaceDetection = (faces: Face[], frame: Frame) => {
    console.log(
      'faces', faces.length,
      'frame', frame.toString()
    )
    // TODO: draw pokemon on faces
  }
  
  if (!hasPermission) return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 500
      }}
    >
      <Text>Masz poksa na czole. Serio. A teraz dej permisje</Text>
    </View>
  );

  if (device === undefined) return (<View style={styles.deviceless}>
    <Text>Where kamera</Text>
  </View>)

  return (<Camera style={StyleSheet.absoluteFill}
      device={device}
      isActive={isActive}
      enableFpsGraph={true}
      faceDetectionCallback={handleFaceDetection}
      faceDetectionOptions={faceDetectionOptions}/>)
}

const styles = StyleSheet.create({
  deviceless: {
    justifyContent: 'center',
    alignContent: 'center'
  }
})