import { useIsFocused } from "@react-navigation/native";
import { useImage } from "@shopify/react-native-skia";
import { useEffect, useRef, useState } from "react";
import {
  AppState,
  Button,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import {
  CameraPosition,
  DrawableFrame,
  Frame,
  useCameraDevice,
  useCameraPermission,
  Camera as VisionCamera,
} from "react-native-vision-camera";
import {
  Camera,
  Face,
  FaceDetectionOptions,
} from "react-native-vision-camera-face-detector";

// ==================== TODO: clean up the code ======================

export default function OGVisionCamera() {
  const [cameraFacing, setCameraFacing] = useState<CameraPosition>("front");
  const [id, setId] = useState<number | null>(null);
  // const [eyes]
  const { hasPermission, requestPermission } = useCameraPermission();
  const isFocused = useIsFocused();
  const [activeState, setActiveState] = useState(
    AppState.currentState === "active"
  );
  const { width, height } = useWindowDimensions();
  const device = useCameraDevice(cameraFacing);

  const isActive = activeState && isFocused;

  const faceDetectionOptions = useRef<FaceDetectionOptions>({
    performanceMode: "fast",
    classificationMode: "all",
    contourMode: "none",
    landmarkMode: "all",
    windowHeight: height,
    windowWidth: width,
  }).current;

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      setActiveState(AppState.currentState === "active");
      console.log("AppState", AppState.currentState);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    console.log(
      "activeState changed to: => ",
      activeState,
      " so isActive: => ",
      isActive
    );
  }, [activeState, isActive]);

  const image = useImage(
    id
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
  );

  const handleFaceDetection = (faces: Face[], frame: Frame) => {
    console.log("faces", faces.length, "frame", frame.toString());
    console.log(isActive);
    // setId(Math.floor(Math.random() * 1024) + 1);
  };

  const camera = useRef<VisionCamera>(null);
  const handleSkiaActions = (faces: Face[], frame: DrawableFrame) => {
    "worklet";
    if (faces.length <= 0) return;

    faces.map((face) => {
    const {
      bounds,
      landmarks,
      // contours,
    } = face;

    const { NOSE_BASE } = landmarks ? landmarks : {};

    // const { FACE }: { FACE: Point[] } = contours ? contours : { FACE: [] };

    const { height } = bounds;
    // // const newBounds : Bounds = cameraFacing === 'front' ? {height: 10, width: 10, x: (faceDetectionOptions.windowWidth || 0) - width/2 -x, y: y} : bounds
    // const rectPaint = Skia.Paint();
    // rectPaint.setColor(Skia.Color("red"));
    // rectPaint.setStyle(1);
    // rectPaint.setStrokeWidth(3);
    // frame.drawRect(newBounds, rectPaint);
    // frame.drawRect(bounds, rectPaint);

    if (image && NOSE_BASE) {
      // TODO: figure out why FACE is undefined sometimes
      // ========= hardcoded values that worked quite well on two devices (android)
      // frame.drawImage(image, frame.width / 1.34 - FACE[0].x - image.width()/2, FACE[0].y)
      frame.drawImage(
        image,
        NOSE_BASE.x - image.width() / 2,
        NOSE_BASE.y - image.width() / 2 - height / 4
      );
    } // TODO: add a loading icon when face is detected yet image is null
  })
  };

  if (!hasPermission) {
    requestPermission();
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 500,
        }}
      >
        <Text>Masz poksa na czole. Serio. A teraz dej permisje</Text>
      </View>
    );
  }

  if (device === undefined)
    return (
      <View style={styles.deviceless}>
        <Text>Where kamera</Text>
      </View>
    );

  return (
    <View style={[StyleSheet.absoluteFill, styles.cameraContainer]}>
      <Camera
        ref={camera}
        style={[StyleSheet.absoluteFill, { transform: [{ scaleX: -1 }] }]} // gave up with fixing it in the lib
        device={device}
        isActive={isActive}
        enableFpsGraph={false} // fps graph gets flipped as well
        faceDetectionCallback={handleFaceDetection}
        faceDetectionOptions={{
          ...faceDetectionOptions,
          cameraFacing,
        }}
        outputOrientation="preview"
        skiaActions={handleSkiaActions}
        isMirrored={false}
      />

      <View
        style={{
          position: "absolute",
          bottom: 15,
          left: 15,
        }}
      >
        <View
          style={{
            bottom: 10,
          }}
        >
          <Button
            onPress={() =>
              setCameraFacing((current) =>
                current === "front" ? "back" : "front"
              )
            }
            title={"Toggle Cam"}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deviceless: {
    justifyContent: "center",
    alignContent: "center",
  },
  cameraContainer: {
    justifyContent: "center",
    alignContent: "center",
  },
});
