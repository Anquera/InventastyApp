import { View, TextInput, FlatList, Text } from 'react-native';
import { useState } from 'react';

const AllRecipesScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [recipes, setRecipes] = useState([
        { id: '1', name: 'Spaghetti' },
        { id: '2', name: 'Chicken Stir Fry' },
        { id: '3', name: 'Avocado Toast' }
    ]);

    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View>
            <TextInput
                placeholder="Search recipes..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={{ borderWidth: 1, padding: 8, margin: 10 }}
            />
            <FlatList
                data={filteredRecipes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Text>{item.name}</Text>}
            />
        </View>
    );
};

export default AllRecipesScreen;
