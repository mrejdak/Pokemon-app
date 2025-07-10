import { PokemonProps } from "@/interfaces/PokemonInterface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { TypesDisplay } from "./TypesDisplay";

const removeData = async (id: number) => {
  try {
    await AsyncStorage.removeItem(String(id));
  } catch (error) {
    console.error("Error removing data:", error);
  }
};

const PokemonDisplay = ({ data, triggerUpdate }: { data: PokemonProps, triggerUpdate : Dispatch<SetStateAction<boolean>> }) => {
  const handleButtonPress = () => {
    removeData(data.id);
    triggerUpdate((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pokemonText}>{data.name}</Text>
      <Image source={data.sprites.front_default} style={styles.image} />
      <Text style={styles.pokemonText}>Types:</Text>
      <TypesDisplay types={data.types} />
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
  const focus = useIsFocused();
  const [update, setUpdate] = useState(false)

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
  }, [focus, update]);

  if (error) return <Text style={styles.errorText}>{error}</Text>;
  if (pokemon.length > 0)
    return (
      <FlatList
        data={pokemon}
        renderItem={({ item }) => <PokemonDisplay data={item} triggerUpdate={setUpdate}/>}
      />
    );
  return <DefaultDisplay />;
};
// TODO: add loading view, so that it doesnt default when loading
// bonus TODO: hook that gets async function, executes it and sets flag loading/error/loaded, returns data

// TODO: keep data in map, remove locally & from AsyncStorage - read from AsyncStorage only when swapping between tabs
// useReducer - will be helpful with map
// maybe a listener? (ask first)

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
    textTransform: "capitalize",
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
