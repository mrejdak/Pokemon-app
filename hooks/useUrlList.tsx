import { PokemonSimpleProps } from "@/interfaces/PokemonInterface";
import { useEffect, useMemo, useState } from "react";
import { useFetchApi } from "./useFetchAPI";

interface UrlListProps {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonSimpleProps[];
}

export const useUrlList = (
  limit: number,
  offset: number
): PokemonSimpleProps[] => {
  const [urlList, setUrlList] = useState<PokemonSimpleProps[]>([]);

  const url = useMemo(() => {
    return (
      "https://pokeapi.co/api/v2/pokemon?limit=" +
      encodeURIComponent(limit) +
      "&offset=" +
      encodeURIComponent(offset)
    );
  }, [limit, offset]);

  const json: UrlListProps = useFetchApi(url) as UrlListProps;
  // TODO: validate same as in usePokemonDetails

  useEffect(() => {
    if (json !== null) {
      const urls: { url: string; name: string }[] = json.results;
      setUrlList(urls);
    } else {
      setUrlList([]);
    }
  }, [json]);

  return urlList;
};
