import { useEffect, useState } from "react";
import { ListRenderItem, StyleSheet, Text, View } from "react-native";

export interface PokemonProps {
  name: string;
  url: string;
}

// export const Pokemon: ListRenderItem<PokemonProps> = ({ item }) => {
//   const [id, setId] = useState<number | null>(null);

//   useEffect(() => {
//     let isMounted = true;
//     (async () => {
//       try {
//         const response = await fetch(item.url);
//         const json = await response.json();
//         if (isMounted) setId(json.id);
//       } catch {
//         if (isMounted) setId(null);
//       }
//     })();
//     return () => {
//       isMounted = false;
//     };
//   }, [item.url]);

//   if (!item) return null;

//   return (
//     <View>
//       <Text>
//         Name: <Text style={styles.data}>{item.name}</Text>
//         {"\n"}
//         ID: <Text style={styles.data}>{id ?? " "}</Text>
//       </Text>
//     </View>
//   );
// };

const FetchApi = (url: string) =>  {
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
    })();
  }, [url]);

  return data;
}

export const Pokemon: ListRenderItem<PokemonProps> = ({ item }) => {
  // const [data, setData] = useState<any>()
  // // fetch
  // useEffect(() => {(async () => {
  //     const response = await fetch(item.url)
  //     const json = await response.json()
  //     setData(json.id)
  //         // .then((response) => response.json())
  //         // .then((json) => {
  //         // setList([...list, { id: json.id, name: json.name }]);
  //         // })
  //         // .catch((error) => {
  //         // console.log(error);
  //         // });
  // })()
  // }, [item.url])
  // const data = FetchApi(item.url)
  return (
    <View>
      <Text>
        Name: <Text style={styles.data}>{item.name}</Text>
        {/* ID: <Text style={styles.data}>{data?.id?? " "}</Text> */}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  data: {
    fontWeight: "bold",
  },
});
