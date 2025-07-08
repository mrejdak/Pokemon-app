import { PokemonProps } from "@/interfaces/PokemonInterface";
import { useFetchApi } from "./useFetchAPI";

export const usePokemonDetails = (url: string) => {

  const data : PokemonProps | null = useFetchApi(url)

  return data;
};