import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/favourite" push asChild>
        <Button title = "Favourite Pokémon"></Button>
      </Link>
      <Link href="/infiniteScroll" push asChild>
        <Button title = "Pokémon List"></Button>
      </Link>
      <Link href="/visionCamera" push asChild>
        <Button title = "Camera"></Button>
      </Link>
      <Link href="/map" push asChild>
        <Button title = "Map"></Button>
      </Link>
    </View>
  );
}
