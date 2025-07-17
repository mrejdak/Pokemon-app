import { LoadIconDisplay } from "@/components/LoadIconDisplay";
import { TypesDisplay } from "@/components/TypesDisplay";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import { getData, removeData, storeData } from "@/utils/storageUtils";
import { AntDesign } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const queryClient = new QueryClient();

export default function ScrollModal() {
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollModalComponent />
    </QueryClientProvider>
  );
}

const ScrollModalComponent = () => {
  const params = useLocalSearchParams();
  const name = useRef<string | null>(null);
  const url = useRef<string | null>(null);
  const [stored, setStored] = useState(false);

  try {
    name.current = typeof params.name === "string" ? params.name : null;
    url.current = typeof params.url === "string" ? params.url : null;
  } catch (error) {
    console.log(error);
  }

  const data = usePokemonDetails(name.current || "pikachu");
  // placeholder not to fetch null (can't `if` the hook, TODO: find better workaround)

  const handleButtonPress = () => {
    if (data !== null) {
      if (stored) removeData(data.id);
      else storeData(data);
      setStored((prevState) => !prevState);
    }
  };

  useEffect(() => {
    const checkKey = async () => {
      const storedValue = await getData(data?.id !== undefined ? data.id : 0);
      setStored(storedValue !== null);
    };
    checkKey();
  }, [data]);

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
      <LoadIconDisplay
        data={data}
        size={220}
        imageStyle={styles.image}
      ></LoadIconDisplay>
      <Text style={styles.pokemonText}>Types:</Text>
      <TypesDisplay types={data?.types !== undefined ? data.types : []} />
      <Pressable
        onPress={handleButtonPress}
        style={({ pressed }) => ({
          padding: 10,
          margin: 10,
          transform: pressed ? [{ scale: 0.92 }] : [{ scale: 1.0 }],
        })}
      >
        <AntDesign
          name={stored ? "heart" : "hearto"}
          size={36}
          color={stored ? "#e63966" : "#8e5c74"}
        />
      </Pressable>
    </View>
  );
};
// TODO: PokemonDisplay code repeated from FavouriteDisplay, move it after correcting updates in FavouriteDisplay
// ** or change the display - preferably

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
