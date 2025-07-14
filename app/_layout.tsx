import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* <Stack.Screen name="bottomList" options= {{headerShown: false}} /> */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="scrollModal"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="mapModal"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen name="index" />
    </Stack>
  );
}
