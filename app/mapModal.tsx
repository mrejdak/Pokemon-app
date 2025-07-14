import { LoadIconDisplay } from "@/components/LoadIconDisplay";
import { TypesDisplay } from "@/components/TypesDisplay";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import { router, useLocalSearchParams } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

const ModalScreen = ({ id, index }: { id: number; index: number }) => {
  const handleButtonPress = () => {
    router.setParams({ toRemove: index });
    router.dismiss();
  };

  const data = usePokemonDetails(String(id));

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
};

export default function MapModal() {
  const params = useLocalSearchParams();
  const id = Number(params.id);
  const index = Number(params.index);

  if (isNaN(id) || isNaN(index)) {
    return (
      <View>
        <Text>Error: pokemon data not found</Text>
      </View>
    );
  }

  return <ModalScreen id={id} index={index} />;
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
