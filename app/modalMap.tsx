import { LoadIconDisplay } from "@/components/LoadIconDisplay";
import { TypesDisplay } from "@/components/TypesDisplay";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import { router, useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function ModalScroll() {
  const params = useLocalSearchParams();
  const id = useRef<number | null>(null)
  const index = useRef<number | null>(null)
  try {
    id.current = typeof params.id === "string" && !isNaN(Number(params.id)) ? Number(params.id) : null;
    index.current = typeof params.index === "string" && !isNaN(Number(params.index)) ? Number(params.index) : null;
  } catch (error) {
    console.log(error);
  }

  const data = usePokemonDetails(
    String(id.current || 25)
  );
  // placeholder not to fetch null (can't `if` the hook, TODO: find better workaround)

  const handleButtonPress = () => {
    router.setParams({toRemove: index.current})
    router.dismiss()
  };

  if (id.current === null) {
    return (
        <View>
          <Text>Error: pokemon data not found</Text>
        </View>
    );
  }
  
  return (
      <View style={styles.container}>
        <Text style={styles.pokemonText}>{data !== null ? data.name : "?"}</Text>
        <LoadIconDisplay
          data={data}
          size={220}
          imageStyle={styles.image}
        ></LoadIconDisplay>
        <Text style={styles.pokemonText}>Types:</Text>
        <TypesDisplay types={data?.types !== undefined ? data.types : []} />
        <Button title={"Remove Marker"} onPress={handleButtonPress}></Button>
      </View>
  );
}
// TODO: PokemonDisplay code repeated from FavouriteDisplay, move it after correcting button to fav/un-fav
// ** or change the display

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pokemonText: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
    color: "#22223b",
    textAlign: "center",
    letterSpacing: 0.5,
    textTransform: "capitalize",
  },
  image: {
    marginVertical: 12,
    borderRadius: 60,
    backgroundColor: "#e9ecef",
    borderWidth: 3,
    borderColor: "#c9ada7",
    shadowColor: "#4a4e69",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },
});
