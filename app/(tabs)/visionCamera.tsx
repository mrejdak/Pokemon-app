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
  Point,
  useCameraDevice,
  useCameraPermission,
  Camera as VisionCamera,
} from "react-native-vision-camera";
import {
  Camera,
  Face,
  FaceDetectionOptions,
} from "react-native-vision-camera-face-detector";

// ==================== TODO: clean up and improve this code ======================

export default function OGVisionCamera() {
  const [cameraFacing, setCameraFacing] = useState<CameraPosition>("front");
  const [id, setId] = useState<number | null>(null);
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
  };

  const camera = useRef<VisionCamera>(null);
  const handleSkiaActions = (faces: Face[], frame: DrawableFrame) => {
    "worklet";
    if (faces.length <= 0) return;

    faces.map((face) => {
      const {
        bounds,
        landmarks,
        smilingProbability,
        leftEyeOpenProbability, // due to changes in the lib, right and left eye are swapped with each other
        rightEyeOpenProbability,
      } = face;

      console.log("usmieeech: ", smilingProbability);
      console.log(
        "lewe: ",
        leftEyeOpenProbability,
        " prawe: ",
        rightEyeOpenProbability
      );
      // TODO: add changing pokemon on blink or smile
      const { NOSE_BASE, LEFT_EYE, RIGHT_EYE } = landmarks ? landmarks : {};
      if (!LEFT_EYE || !RIGHT_EYE || !NOSE_BASE) return;
      const EYES_MIDPOINT: Point = {
        x: (LEFT_EYE.x + RIGHT_EYE.x) / 2,
        y: (LEFT_EYE.y + RIGHT_EYE.y) / 2,
      };
      const FOREHEAD: Point = {
        x: EYES_MIDPOINT.x - (NOSE_BASE.x - EYES_MIDPOINT.x) * 1.4,
        y: EYES_MIDPOINT.y - (NOSE_BASE.y - EYES_MIDPOINT.y) * 1.4,
      };
      // could simplify those calculations, but the readability is better this way and the optimization is negligible

      if (image) {
        // ========= hardcoded values that worked quite well on two devices (android)
        // frame.drawImage(image, frame.width / 1.34 - FACE[0].x - image.width()/2, FACE[0].y)
        const { height, width } = bounds;
        const scaleFactorWidth = (width / image.width()) * 0.6;
        const scaleFactorHeight = (height / image.height()) * 0.6;
        frame.save();
        frame.translate(FOREHEAD.x, FOREHEAD.y);
        frame.scale(scaleFactorWidth, scaleFactorHeight);
        frame.drawImage(image, -image.width() / 2, -image.height() / 2);
        frame.restore();
      } // TODO: add a loading icon when face is detected yet image is null
    });
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
        style={[StyleSheet.absoluteFill,
           { transform: [{ scaleX: -1 }] }
          ]} // gave up with fully fixing this in the lib
        // current fix only involves changing file `useSkiaFrameProcessor.ts`, by replacing line 98 (`canvas.translate(frame.height, frame.width)`)
        // with `canvas.translate(0, frame.width)` and adding `canvas.restore()` after line 235 (`else canvas.drawImage(image, 0, 0)`)
        // afterwards the front camera image is not mirrored, which is the reason for style={{transform: ...}} to flip it horizontally
        // ***this fix is for android only*** for ios, comment out the added `canvas.restore()` in line 236 and change the lines 97-98 to 
        // `canvas.translate(frame.height, 0);` `canvas.rotate(90, 0, 0)` (on ios the pokemon image will be rotated 90 degrees - don't have time to fix it)
        device={device}
        isActive={isActive}
        enableFpsGraph={false} // style={{transform: ...}} flips fps graph as well
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
