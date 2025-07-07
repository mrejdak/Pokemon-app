import { PokemonProps } from "@/interfaces/PokemonInterface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const removeData = async () => {
  try {
    await AsyncStorage.removeItem("favourite");
  } catch (error) {
    console.error('Error removing data:', error);
  }
};


const PokemonDisplay = ( {data} : {data : PokemonProps} ) => {

  // const handleButtonPress = () => {
  //   removeData(data.name)

  // }

  return (
    <View style={styles.container}>
      <Text style={styles.pokemonText}>
        ID: {data.id} Name: {data.name}
      </Text>
      <Image source={data.sprites.front_default} style={styles.image} />
      <Text style={styles.pokemonText}>Types:</Text>
      <Text style={styles.typesText}>{data.types.map(types => types.type.name)}</Text>
      <Button onPress={removeData} title="Remove from favourites"></Button>
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
  const [pokemon, setPokemon] = useState<PokemonProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavourite = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("favourite");
        if (jsonValue !== null) {
          setPokemon(JSON.parse(jsonValue));
        }
      } catch (e) {
        setError("Error occurred");
        console.log(e);
      }
    };
    fetchFavourite();
  }, []);

  if (error) return <Text style={styles.errorText}>{error}</Text>;
  if (pokemon !== null) return <PokemonDisplay data={pokemon} />;
  return <DefaultDisplay />;
};


const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7f8fa",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    margin: 16,
  },
  pokemonText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#22223b",
    textAlign: "center",
  },
  image: {
    width: 120,
    height: 120,
    marginVertical: 12,
    borderRadius: 60,
    backgroundColor: "#e9ecef",
    borderWidth: 2,
    borderColor: "#c9ada7",
  },
  typesText: {
    fontSize: 16,
    color: "#4a4e69",
    marginBottom: 8,
    fontWeight: "500",
    textTransform: "capitalize",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 32,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#f2e9e4",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  errorText: {
    color: "#d7263d",
    fontSize: 16,
    margin: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
