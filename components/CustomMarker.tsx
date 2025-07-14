import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { LatLng, Marker } from "react-native-maps";

export const CustomMarker = (marker: {
  coordinate: LatLng;
  imageUrl: string;
  index: number;
  pokemonId: number;
}) => {
  const [discovered, setDiscovered] = useState(false);

  const handleMarkerPress = () => {
    if (!discovered) {
      setDiscovered(true);
    } else {
      router.push({
        pathname: "/modalMap",
        params: { id: marker.pokemonId, index: marker.index },
      });
    }
  };

  return (
    <Marker
      key={marker.index}
      coordinate={marker.coordinate}
      anchor={{ x: 0.5, y: 0.5 }}
      onPress={handleMarkerPress}
    >
      <View
        style={{
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={
            !discovered ? { width: 45, height: 45 } : { width: 50, height: 50 }
          }
          source={
            !discovered
              ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
              : marker.imageUrl
          }
        />
      </View>
    </Marker>
  );
};
// TODO: add animation of getting random pokemon (maybe from among favourite ones)
