import { PokemonProps } from "@/interfaces/PokemonInterface";
import { useFetchApi } from "./useFetchAPI";

export const usePokemonDetails = (url: string) => {

  const data : PokemonProps | null = useFetchApi(url) as PokemonProps
  // TODO: add json validation (maybe: https://stackoverflow.com/questions/62854637/how-to-check-type-of-a-json-object-against-typescript-interface-in-react)
  console.log(data)
  return data;
};