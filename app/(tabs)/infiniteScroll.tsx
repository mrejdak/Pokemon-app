import { PokemonList } from "@/components/PokemonList";
import { StyleSheet, View } from "react-native";

export default function InfiniteScroll() {
  // const bottomSheetRef = useRef<BottomSheet>(null)
  // const [id, setID] = useState<number | null>(null)
  
  // const handleExpandPress = () => {
  //   bottomSheetRef.current?.expand()
  // }
  
  return (
    <View style={styles.scroll}>
      {/* <Button onPress={handleExpandPress} title="expand"/> */}
      <PokemonList limit={20} />
      {/* <PokemonBottomSheet ref={bottomSheetRef} id={id}/> */}
      {/* <PokemonBottomSheet ref={bottomSheetRef} title={String("oke")}/> */}
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
