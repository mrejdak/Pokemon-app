import { PokemonProps } from "@/components/Pokemon";
import { useEffect, useState } from "react";

export const useUrlList = (limit: number, offset: number): PokemonProps[] => {
  const [urlList, setUrlList] = useState<PokemonProps[]>([]);

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

      // .then((response) => )
      // .then((json) => {
      //   const results: { url: string }[] = json.results;
      //   const urls = results.map((result) => result.url);
      //   setUrlList(urls);
      //   console.log(urls);
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
    })();
  }, [limit, offset]);
  console.log(urlList);

  return urlList;
};
