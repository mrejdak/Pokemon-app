import { LoadIconDisplay } from "@/components/LoadIconDisplay";
import { TypesDisplay } from "@/components/TypesDisplay";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import { PokemonProps } from "@/interfaces/PokemonInterface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const storeData = async (favPokemon: PokemonProps) => {
  try {
    const jsonValue = JSON.stringify(favPokemon);
    await AsyncStorage.setItem(String(favPokemon.id), jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export default function ModalScroll() {
  const params = useLocalSearchParams();
  const name = useRef<string | null>(null)
  const url = useRef<string | null>(null)

  try {
    name.current = typeof params.name === "string" ? params.name : null;
    url.current = typeof params.url === "string" ? params.url : null;
  } catch (error) {
    console.log(error);
  }

  const data = usePokemonDetails(
    name.current || "pikachu"
  );
  // placeholder not to fetch null (can't `if` the hook, TODO: find better workaround)

  const handleButtonPress = () => {
    if (data !== null) storeData(data);
  };
  if (name.current === null || url.current === null) {
    return (
        <View>
          <Text>Error: pokemon data not found</Text>
        </View>
    );
  }
  return (
      <View style={styles.container}>
        <Text style={styles.pokemonText}>{name.current}</Text>
        {/* <Image source={data.sprites.front_default} style={styles.image} /> */}
        <LoadIconDisplay
          data={data}
          size={220}
          imageStyle={styles.image}
        ></LoadIconDisplay>
        <Text style={styles.pokemonText}>Types:</Text>
        <TypesDisplay types={data?.types !== undefined ? data.types : []} />
        <Button title={"Favourite"} onPress={handleButtonPress}></Button>
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
