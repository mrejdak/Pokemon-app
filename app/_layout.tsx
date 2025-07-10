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
        name="modalScroll"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="modalMap"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen name="index" />
    </Stack>
  );
}
