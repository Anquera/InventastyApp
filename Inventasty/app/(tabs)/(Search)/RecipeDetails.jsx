import { View, Text } from 'react-native';

const RecipeDetails = ({ route }) => {
    const { recipe } = route.params;

    return (
        <View>
            <Text>{recipe.name}</Text>
            <Text>Details about the recipe...</Text>
        </View>
    );
};

export default RecipeDetails;
