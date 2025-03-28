import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
            }}
        >
            <Tabs.Screen
                name="search/AllRecipesScreen"
                options={{
                    title: "Search",
                    tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="pantry"
                options={{
                    title: "Pantry",
                    tabBarIcon: ({ color }) => <Ionicons name="fast-food-outline" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="groceries"
                options={{
                    title: "Groceries",
                    tabBarIcon: ({ color }) => <Ionicons name="cart-sharp" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => <Ionicons name="person-sharp" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
