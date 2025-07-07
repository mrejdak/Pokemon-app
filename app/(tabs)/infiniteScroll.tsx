import { PokemonList } from "@/components/PokemonList";
import { PokemonProps } from "@/interfaces/PokemonInterface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View } from "react-native";

const storeData = async (favPokemon: PokemonProps) => {
  try {
    const jsonValue = JSON.stringify(favPokemon);
    await AsyncStorage.setItem("my-key", jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export default function Index() {
  return (
    <View style={styles.scroll}>
      <PokemonList limit={200} offset={0} />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 60,
    backgroundColor: "#f5f6fa",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
    marginBottom: 16,
    textAlign: "center",
  },
  flatList: {
    flex: 1,
    marginVertical: 8,
  },
  listItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 6,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  listItemText: {
    fontSize: 16,
    color: "#333",
  },
});
