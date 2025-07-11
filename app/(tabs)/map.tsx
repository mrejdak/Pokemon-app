import { Image } from "expo-image";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  GestureHandlerRootView,
  Pressable,
} from "react-native-gesture-handler";
import MapView, { LatLng, LongPressEvent, Marker } from "react-native-maps";

interface MarkerProps {
  index: number;
  coordinate: LatLng;
  imageUrl: string;
  discovered: boolean;
  pokemonId: number;
}

const CustomMarker = (marker: {
  coordinate: LatLng;
  imageUrl: string;
  key: number;
  pokemonId: number;
}) => {
  console.log(marker.imageUrl);

  const [discovered, setDiscovered] = useState(false);

  const handleMarkerPress = () => {
    setDiscovered(true);
  };

  return (
    <View style={styles.markerContainer}>
      <Marker
        key={marker.key}
        coordinate={marker.coordinate}
        anchor={{ x: 0.5, y: 0.5 }}
        onPress={handleMarkerPress}
      >
        <View
          style={{
            width: 30,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable onPress={() => {}}>
            {!discovered ? (
              <Image
                style={{ width: 30, height: 30 }}
                source={
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                }
              />
            ) : (
              <Link href={{pathname: "/modalMap",
                params: {id: marker.pokemonId}
              }} asChild>
                <Pressable>
              <Image
                style={{ width: 40, height: 40 }}
                source={marker.imageUrl}
              />
              </Pressable>
              </Link>
            )}
          </Pressable>
        </View>
      </Marker>
    </View>
  );
};
//TODO: android pressable doesnt work

// removing markers needs to be in the bottom sheet that pops up

export default function Map() {
  const [markers, setMarkers] = useState<MarkerProps[]>([]);

  const handleLongPress = (event: LongPressEvent) => {
    const id = Math.floor(Math.random() * 1024) + 1;
    const newMarker = {
      index: 1, //TODO: index for removing markers, add later
      coordinate: event.nativeEvent.coordinate,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      discovered: false,
      pokemonId: id,
    };
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    console.log(markers);
  };

  useEffect(() => {
    setMarkers([
      {
        index: 1,
        coordinate: {
          latitude: 50.049683,
          longitude: 19.944544,
        },
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        discovered: false,
        pokemonId: 1,
      },
    ]);
  }, []);

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsPointsOfInterest={false}
          initialRegion={{
            latitude: 50.049683,
            longitude: 19.944544,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onLongPress={handleLongPress}
        >
          {markers.map((marker) => (
            <CustomMarker key={marker.index} {...marker} />
          ))}
        </MapView>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  markerContainer: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
