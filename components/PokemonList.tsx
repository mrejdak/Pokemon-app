import { Pokemon } from "@/components/Pokemon";
import { useUrlList } from "@/hooks/useUrlList";
import { useState } from "react";
import { FlatList } from "react-native";


export const PokemonList = (props: {limit: number}) => {
  const [limit, setLimit] = useState<number>(props.limit)
  const urlList = useUrlList(limit, 0);
  
  const extendList = () => {
    setLimit(limit + props.limit)
  }

  return <FlatList data={urlList} renderItem={({item})=> <Pokemon item={item}/>} onEndReached={extendList} onEndReachedThreshold={1.1}/>;
};
