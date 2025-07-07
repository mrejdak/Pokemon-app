import { Pokemon } from "@/components/Pokemon";
import { useUrlList } from "@/hooks/useUrlList";
import { FlatList } from "react-native";

// const renderer = ({ item }: { item: PokemonProps }) => <Pokemon id={item.id} name={item.name}/>;

export const PokemonList = (props: {limit: number, offset: number}) => {

  const urlList = useUrlList(props.limit, props.offset);
  console.log(urlList)
  // const [list, setList] = useState<PokemonProps[]>([]);

  
  // useEffect(() => {
  //   urlList.forEach((url) => {
  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((json) => {
  //         setList([...list, { id: json.id, name: json.name }]);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   });
  // }, []);

  return <FlatList data={urlList} renderItem={Pokemon} />;
  // return <Text>Pokemon</Text>
};
