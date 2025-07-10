import { Pokemon } from "@/components/Pokemon";
import { useUrlList } from "@/hooks/useUrlList";
import { PokemonSimpleProps } from "@/interfaces/PokemonInterface";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";


export const PokemonList = (props: {limit: number}) => {
  const [offset, setOffset] = useState<number>(0)
  
  const newUrls = useUrlList(props.limit, offset);
  const [urlList, setUrlList] = useState<PokemonSimpleProps[]>([])

  useEffect(() => {setUrlList((prevList) => [...prevList, ...newUrls])}, [newUrls])

  const extendList = () => {
    setOffset((prevOffset) => prevOffset + props.limit)
  }

  return <FlatList data={urlList} renderItem={({item})=> <Pokemon item={item}/>} onEndReached={extendList} onEndReachedThreshold={1.1}/>;
};
