import { Text, View } from "react-native";




// function FetchApi(url: string): PokemonProps | undefined {
//   const [data, setData] = useState<PokemonProps>();

//   useEffect(() => {
//     (async () => {
//       const response = await fetch(url);
//       const json = await response.json();
//       setData(json);
//     })();
//   }, [url]);

// return data

// }

// const Element = (props: {limit: number, urel: number}) => {
//     const urls = useUrlList(props.limit, props.urel)
//     if (urls.length > 0) {
//         console.log(urls)
//         const data = FetchApi(urls[0].url)
//         if (data === undefined) {
//         return <Text>undefined</Text>
//         } else {
//             console.log(data)
//             return <Text>nieundefined</Text>
//         }
//     } else {

//         return <Text>pusty</Text>
//     }
// }





export default function Favourite() {
    
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>Ulubiony pokedemon</Text>
            {/* <Element limit={10} urel={10}/> */}
        </View>
    )
}