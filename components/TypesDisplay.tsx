import { Type } from "@/interfaces/PokemonInterface"
import { StyleSheet, Text, View } from "react-native"

export const TypesDisplay = ({types} : {types : Type[]}) => {
  return (<View style={styles.typesContainer}>
          {types.map((typeObj, _idx) => (
            <View key={typeObj.type.name} style={styles.typesBox}>
              <Text style={styles.typesText}>{typeObj.type.name}</Text>
            </View>
          ))}
        </View>)
}
// TODO: style the types individually

const styles = StyleSheet.create({
  typesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  typesBox: {
    backgroundColor: "#c9ada7",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginHorizontal: 4,
  },
  typesText: {
    fontSize: 17,
    color: "#4a4e69",
    marginBottom: 4,
    fontWeight: "600",
    textTransform: "capitalize",
    textAlign: "center",
    letterSpacing: 0.3,
  },
})