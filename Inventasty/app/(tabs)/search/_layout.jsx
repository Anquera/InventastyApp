import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text } from "react-native";
import AllRecipesScreen from './AllRecipesScreen';
import PantrySearchScreen from './PantrySearchScreen';

const Tab = createMaterialTopTabNavigator();

export default function SearchLayout() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="All Recipes" component={AllRecipesScreen} />
            <Tab.Screen name="Pantry" component={PantrySearchScreen} />
        </Tab.Navigator>
    );
}
