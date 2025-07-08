import { PokemonSimpleProps } from "@/interfaces/PokemonInterface";
import { useEffect, useState } from "react";
import { useFetchApi } from "./useFetchAPI";

export const useGetUrl = (limit: number, offset: number) => {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=0&offset=0")
  useEffect(() => {
    setUrl("https://pokeapi.co/api/v2/pokemon?limit=" +
          encodeURIComponent(limit) +
          "&offset=" +
          encodeURIComponent(offset))
  }, [limit, offset])
  return url
}

export const useUrlList = (limit: number, offset: number): PokemonSimpleProps[] => {
  const [urlList, setUrlList] = useState<PokemonSimpleProps[]>([]);

  const url = useGetUrl(limit, offset)

  const json = useFetchApi(url)

  useEffect(() => {
    if (json !== null) {
      const urls: { url: string; name: string }[] = json.results;
      setUrlList(urls);
    } else {
      setUrlList([])
    }
  }, [json]);

  return urlList;
};
