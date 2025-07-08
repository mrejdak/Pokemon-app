import { useFetchApi } from "@/hooks/useFetchAPI";
import {
  PokemonProps,
  PokemonSimpleProps,
} from "@/interfaces/PokemonInterface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";

const storeData = async (favPokemon: PokemonProps) => {
  try {
    const jsonValue = JSON.stringify(favPokemon);
    await AsyncStorage.setItem(String(favPokemon.id), jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const Pokemon = ({ item }: { item: PokemonSimpleProps }) => {
  const data: PokemonProps | null = useFetchApi(item.url);

  const handleButtonPress = () => {
    if (data !== null) storeData(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.id}>#{data !== null ? data.id : "?"}</Text>
      </View>
      <View style={styles.imageContainer}>
        {data === null ? (
          <ActivityIndicator size="large" color="#888" />
        ) : (
          <Image
            source={data.sprites.front_default}
            style={styles.image}
            contentFit="contain"
            transition={300}
          />
        )}
      </View>
      <Button title={"Favourite"} onPress={handleButtonPress}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8fc",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
    textTransform: "capitalize",
  },
  id: {
    fontSize: 14,
    color: "#888",
    fontWeight: "600",
  },
  imageContainer: {
    width: 72,
    height: 72,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 36,
    marginLeft: 16,
    borderWidth: 1,
    borderColor: "#eee",
  },
  image: {
    width: 64,
    height: 64,
  },
});
