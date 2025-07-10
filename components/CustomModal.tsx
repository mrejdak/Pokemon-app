import { usePokemonDetails } from "@/hooks/usePokemonDetails";

const CustomModal = (props :) => {
  const data = usePokemonDetails(
      props.name || "pikachu"
    );
    // placeholder not to fetch null (can't `if` the hook, TODO: find better workaround)
  
    const handleButtonPress = () => {
      if (data !== null) storeData(data);
    };
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
          {/* <Image source={data.sprites.front_default} style={styles.image} /> */}
          <LoadIconDisplay
            data={data}
            size={220}
            imageStyle={styles.image}
          ></LoadIconDisplay>
          <Text style={styles.pokemonText}>Types:</Text>
          <TypesDisplay types={data?.types !== undefined ? data.types : []} />
          <Button title={"Favourite"} onPress={handleButtonPress}></Button>
        </View>
    );
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
}