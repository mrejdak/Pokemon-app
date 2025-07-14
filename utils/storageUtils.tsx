import { PokemonProps } from "@/interfaces/PokemonInterface";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const removeData = async (id: number) => {
  try {
    await AsyncStorage.removeItem(String(id));
  } catch (error) {
    console.error("Error removing data:", error);
  }
};

export const storeData = async (favPokemon: PokemonProps) => {
  try {
    const jsonValue = JSON.stringify(favPokemon);
    await AsyncStorage.setItem(String(favPokemon.id), jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (id: number) => {
  try {
    const value = await AsyncStorage.getItem(String(id))
    return value
  } catch (error) {
    console.log(error)
    return null
  }
}