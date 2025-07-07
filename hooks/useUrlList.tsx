import { PokemonSimpleProps } from "@/interfaces/PokemonInterface";
import { useEffect, useState } from "react";

export const useUrlList = (limit: number, offset: number): PokemonSimpleProps[] => {
  const [urlList, setUrlList] = useState<PokemonSimpleProps[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=" +
          encodeURIComponent(limit) +
          "&offset=" +
          encodeURIComponent(offset)
      );
      const json = await response.json();
      const results: { url: string; name: string }[] = json.results;
      const urls = results.map((result) => ({
        name: result.name,
        url: result.url,
      }));
      setUrlList(urls);

    })();
  }, [limit, offset]);
  console.log(urlList);

  return urlList;
};
