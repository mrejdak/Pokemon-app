import { Link } from "expo-router";
import { Button, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/favourite" push asChild>
        <Button title="Favourite Pokémon"></Button>
      </Link>
      <Link href="/infiniteScroll" push asChild>
        <Button title="Pokémon List"></Button>
      </Link>
      <Link href="/visionCamera" push asChild>
        <Button title="Camera"></Button>
      </Link>
      <Link href="/map" push asChild>
        <Button title="Map"></Button>
      </Link>
      {/* bottomList is temporary */}
      {/* <Link href="/bottomList" push asChild>
        <Button title="bottomList"></Button>
      </Link> */}
      <Link href="/painter" push asChild>
        <Button title="painter"></Button>
      </Link>
    </View>
  );
}
