import { PokemonProps } from "@/interfaces/PokemonInterface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

const removeData = async (name: string) => {
  try {
    await AsyncStorage.removeItem(name);
  } catch (error) {
    console.error("Error removing data:", error);
  }
};

const PokemonDisplay = ({ data }: { data: PokemonProps }) => {
  const handleButtonPress = () => {
    removeData(data.name);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pokemonText}>
        {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
      </Text>
      <Image source={data.sprites.front_default} style={styles.image} />
      <Text style={styles.pokemonText}>Types:</Text>
      <View style={styles.typesContainer}>
        {data.types.map((typeObj, _idx) => (
          <View key={typeObj.type.name} style={styles.typesBox}>
            <Text style={styles.typesText}>{typeObj.type.name}</Text>
          </View>
        ))}
      </View>
      <Button
        onPress={handleButtonPress}
        title="Remove from favourites"
      ></Button>
    </View>
  );
};

const DefaultDisplay = () => {
  return (
    <View style={styles.buttonContainer}>
      <Link href="/infiniteScroll" push asChild>
        <Button title="Choose your favourite Pokémon here"></Button>
      </Link>
    </View>
  );
};

export const FavouriteDisplay = () => {
  const [pokemon, setPokemon] = useState<PokemonProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const focus = useIsFocused()
  useEffect(() => {
    const fetchFavourite = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const storedValues = await AsyncStorage.multiGet(keys);
          const jsonValues = storedValues.map((jsonValue) => {
            if (jsonValue[1] !== null) {
              return JSON.parse(jsonValue[1]);
            }
          });
          setPokemon(jsonValues);
      } catch (e) {
        setError("Error occurred");
        console.log(e);
      }
    };
    fetchFavourite();
  }, [focus]);

  if (error) return <Text style={styles.errorText}>{error}</Text>;
  if (pokemon.length > 0)
    return (
      <FlatList
        data={pokemon}
        renderItem={({ item }) => <PokemonDisplay data={item} />}
      />
    );
  return <DefaultDisplay />;
};

const styles = StyleSheet.create({
  container: {
    padding: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
    borderRadius: 20,
    shadowColor: "#22223b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    margin: 18,
    borderWidth: 1,
    borderColor: "#e0e1dd",
  },
  pokemonText: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
    color: "#22223b",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  image: {
    width: 120,
    height: 120,
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
  typesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  typesBox: {
    backgroundColor: "#c9ada7",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginHorizontal: 4,
  },
  typesText: {
    fontSize: 17,
    color: "#4a4e69",
    marginBottom: 10,
    fontWeight: "600",
    textTransform: "capitalize",
    textAlign: "center",
    letterSpacing: 0.3,
  },
  buttonContainer: {
    marginTop: 36,
    width: "92%",
    alignSelf: "center",
    backgroundColor: "#f2e9e4",
    borderRadius: 14,
    padding: 16,
    shadowColor: "#22223b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e0e1dd",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  errorText: {
    color: "#d7263d",
    fontSize: 17,
    margin: 18,
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 0.2,
  },
});

