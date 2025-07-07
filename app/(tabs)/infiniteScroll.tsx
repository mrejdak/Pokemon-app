import { PokemonList } from "@/components/PokemonList";
import { StyleSheet, Text, View } from "react-native";

// async function getFromAPI(url: string) {
//   try {
//     const response = await fetch(url);
//     const json = await response.json();
//     return json.results;
//   } catch (error) {
//     console.log(error);
//   }
// }

// function getPokemonListFromAPI(limit: number) {
//   return getFromAPI(
//     "https://pokeapi.co/api/v2/pokemon?limit=" + encodeURIComponent(limit)
//   );
// }

// function getPokemon() {
//   const pokeList = getPokemonListFromAPI(10);
//   const props = pokeList.then((list) => {
//     list.map((pokeUrl) => { });
//   });
//   return props.map((pokeProps) => {
//     Pokemon(pokeProps);
//   });
// }

export default function Index() {
  const getFromAPI = async (url: string) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json.results;
    } catch (error) {
      console.log(error);
    }
  };

  // const [urlList, setUrlList] = useState<string[]>([]);

  // const getUrlList = async (limit: number, offset: number) => {
  //   try {
  //     const response = await fetch(
  //       "https://pokeapi.co/api/v2/pokemon?limit=" +
  //         encodeURIComponent(limit) +
  //         "&offset=" +
  //         encodeURIComponent(offset)
  //     );
  //     const json = await response.json();
  //     const results: { url: string }[] = json.results;
  //     const urls = results.map((result) => result.url);
  //     setUrlList(urls);
  //     // const nameUrlList: [any] = json.results
  //     // return nameUrlList.map((record) => {return getPokemon(record.url)})
  //     // return nameUrlList
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };



  // getPokemonList(100, 0).then((data) => {
  //   return data;
  // });

  return (
    <View style={styles.scroll}>
      <Text style={styles.text}>
        Edit infiniteScroll.tsx to edit this screen. Or don&apos;t.
      </Text>
      <PokemonList limit={200} offset={0}/>
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
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
    marginBottom: 16,
    textAlign: "center",
  },
  flatList: {
    flex: 1,
    marginVertical: 8,
  },
  listItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 6,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  listItemText: {
    fontSize: 16,
    color: "#333",
  },
});
