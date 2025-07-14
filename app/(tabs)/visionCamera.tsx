import { useEffect } from "react";
import { Text, View } from "react-native";
import { useCameraDevice, useCameraPermission } from "react-native-vision-camera";

export default function Camera() {
  const device = useCameraDevice('front')
  const { hasPermission, requestPermission } = useCameraPermission()

  useEffect(() => {requestPermission()}, [])
  
  
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
  return <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}><Text>masz</Text></View>
  

}