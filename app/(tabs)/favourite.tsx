import { FavouriteDisplay } from "@/components/FavouriteDisplay";
import { StyleSheet, View } from "react-native";

export default function Favourite() {
  return (
    <View style={styles.listContainer}>
      <FavouriteDisplay />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
});