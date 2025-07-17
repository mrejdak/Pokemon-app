import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import {
  PokemonProps,
  PokemonSimpleProps,
} from "@/interfaces/PokemonInterface";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LoadIconDisplay } from "./LoadIconDisplay";

const PokemonRecord = ({ item }: { item: PokemonSimpleProps }) => {
  const data: PokemonProps | null = usePokemonDetails(item.name);

  return (
    <Link
      href={{
        pathname: "/scrollModal",
        params: { name: item.name, url: item.url },
      }}
      asChild
    >
      <Pressable style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.id}>#{data !== null ? data.id : "?"}</Text>
        </View>

        <LoadIconDisplay data={data}></LoadIconDisplay>
      </Pressable>
    </Link>
  );
};

export const Pokemon = ({ item }: { item: PokemonSimpleProps }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PokemonRecord item={item} />
    </QueryClientProvider>
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
});
