import { PokemonProps } from "@/interfaces/PokemonInterface";
import { Image } from "expo-image";
import {
  ActivityIndicator,
  ImageProps,
  StyleProp,
  StyleSheet,
  View,
} from "react-native";

interface LoadIconDisplayProps {
  data: PokemonProps | null;
  size?: number;
  imageStyle?: StyleProp<ImageProps>;
}

export const LoadIconDisplay = ({
  data,
  size = 72,
  imageStyle = {},
}: LoadIconDisplayProps) => {
  return (
    <View style={[styles.imageContainer, { width: size, height: size }]}>
      {data === null ? (
        <ActivityIndicator size="large" color="#888" />
      ) : (
        <Image
          source={data.sprites.front_default}
          style={[imageStyle, { width: size * 0.9, height: size * 0.9 }]}
          contentFit="contain"
          transition={300}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 36,
    marginLeft: 16,
    borderWidth: 1,
    borderColor: "#eee",
  },
});
