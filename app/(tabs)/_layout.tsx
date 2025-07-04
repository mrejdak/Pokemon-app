import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#e91e63",
                tabBarInactiveTintColor: "#000",
            }}>
            <Tabs.Screen
                name="favourite"
                options={{
                    title: "Favourite",
                    tabBarLabel: "Favourite",
                }}
            />
            <Tabs.Screen
                name="infiniteScroll"
                options={{
                    title: "Pokémon List",
                    tabBarLabel: "Pokémon",
                }}
            />
            <Tabs.Screen
                name="visionCamera"
                options={{
                    title: "Camera",
                    tabBarLabel: "Camera",
                }}
            />
            <Tabs.Screen
                name="map"
                options={{
                    title: "Map",
                    tabBarLabel: "Map",
                }}
            />
        </Tabs>
    )
}