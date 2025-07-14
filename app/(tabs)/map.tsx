import { CustomMarker } from "@/components/CustomMarker";
import { router, useGlobalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { LatLng, LongPressEvent } from "react-native-maps";

interface MarkerProps {
  index: number;
  coordinate: LatLng;
  imageUrl: string;
  discovered: boolean;
  pokemonId: number;
}

export default function Map() {
  const [markers, setMarkers] = useState<MarkerProps[]>([]);
  const params = useGlobalSearchParams();
  const index = useRef(0)


  const toRemove = Number(params.toRemove)
  useEffect(() => {
    try {
        if (!isNaN(toRemove))
          setMarkers((prevMarkers) =>
            prevMarkers.filter((marker) => marker.index !== toRemove)
          );
      router.setParams({});
    } catch (error) {
      console.log(error);
    }
  }, [toRemove]);

  const handleLongPress = (event: LongPressEvent) => {
    const id = Math.floor(Math.random() * 1024) + 1;
    const newMarker = {
      index: index.current,
      coordinate: event.nativeEvent.coordinate,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      discovered: false,
      pokemonId: id,
    };
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    index.current = index.current + 1;
    console.log(markers);
    console.log(index);
  };


  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsPointsOfInterest={false}
          initialRegion={{
            latitude: 50.049683,
            longitude: 19.944544,
            latitudeDelta: 0.0411,
            longitudeDelta: 0.02105,
          }}
          onLongPress={handleLongPress}
          customMapStyle={[
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ]}
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
