import { PokemonList } from "@/components/PokemonList";
import { StyleSheet, View } from "react-native";


export default function InfiniteScroll() {
  
  return (
    <View style={styles.scroll}>
      <PokemonList limit={20} />
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
});
