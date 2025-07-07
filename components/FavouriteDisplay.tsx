import { PokemonProps } from "@/interfaces/PokemonInterface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

const PokemonDisplay = ( {data} : {data : PokemonProps} ) => {
  return (
    <View>
      <Text>
        ID: {data.id} Name: {data.name}
      </Text>
      <Image source={data.sprites.front_default} />
      {/* <Text>Types:</Text> */}
      {/* {data.types.map(types => <Text>{types.type_name}</Text>} */}
    </View>
  );
};

const DefaultDisplay = () => {
  return (
    <View>
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
        const jsonValue = await AsyncStorage.getItem("my-key");
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

  if (error) return <Text>{error}</Text>;
  if (pokemon !== null) return <PokemonDisplay data={pokemon} />;
  return <DefaultDisplay />;
};
