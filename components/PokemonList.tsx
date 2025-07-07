import { Pokemon } from "@/components/Pokemon";
import { useUrlList } from "@/hooks/useUrlList";
import { FlatList } from "react-native";


export const PokemonList = (props: {limit: number, offset: number}) => {

  const urlList = useUrlList(props.limit, props.offset);
  console.log(urlList)

  return <FlatList data={urlList} renderItem={({item})=> <Pokemon item={item}/>} />;
};
