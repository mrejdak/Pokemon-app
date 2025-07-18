import { PokemonProps } from "@/interfaces/PokemonInterface";
import { useQueryApi } from "./useQueryAPI";

export const usePokemonDetails = (name: string) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}/`;

  // const data : PokemonProps | null = useFetchApi(url) as PokemonProps | null
  const data: PokemonProps | null = useQueryApi(url) as PokemonProps | null;
  // TODO: add json validation
  // may be helpful:
  // https://stackoverflow.com/questions/62854637/how-to-check-type-of-a-json-object-against-typescript-interface-in-react
  // https://stackoverflow.com/questions/33800497/check-if-an-object-implements-an-interface-at-runtime-with-typescript
  return data;
};
