import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PantrySearchScreen = () => {
  const navigation = useNavigation();
  
  // Example pantry items (this can come from the user's saved pantry)
  const pantryItems = ['spaghetti', 'tomato', 'beef', 'garlic', 'lettuce', 'parmesan', 'chicken', 'cream', 'taco shells'];

  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Sample data of recipes and their ingredients
  const recipes = [
    { id: '1', name: 'Spaghetti Bolognese', ingredients: ['spaghetti', 'tomato', 'beef', 'garlic'], description: 'A classic Italian pasta dish with rich meat sauce.' },
    { id: '2', name: 'Chicken Alfredo', ingredients: ['chicken', 'garlic', 'cream', 'parmesan'], description: 'A creamy pasta dish with grilled chicken.' },
    { id: '3', name: 'Caesar Salad', ingredients: ['lettuce', 'croutons', 'parmesan', 'caesar dressing'], description: 'A fresh salad with romaine lettuce and Caesar dressing.' },
    { id: '4', name: 'Vegetable Stir Fry', ingredients: ['broccoli', 'carrot', 'soy sauce', 'ginger'], description: 'A healthy stir fry with a variety of vegetables.' },
    { id: '5', name: 'Tacos', ingredients: ['taco shells', 'ground beef', 'cheese', 'lettuce', 'tomato'], description: 'Delicious tacos with your choice of filling.' },
  ];

  // Filter recipes based on pantry items
  useEffect(() => {
    const matchedRecipes = recipes.filter(recipe => 
      recipe.ingredients.every(ingredient => pantryItems.includes(ingredient))
    );
    setFilteredRecipes(matchedRecipes);
  }, [pantryItems]);

  // Navigate to RecipeDetails screen
  const handleViewRecipe = (recipe) => {
    navigation.navigate('RecipeDetails', { recipe });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes You Can Make</Text>
      
      {/* Display matching recipes */}
      <FlatList
        data={filteredRecipes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <TouchableOpacity style={styles.viewButton} onPress={() => handleViewRecipe(item)}>
              <Text style={styles.viewButtonText}>View Recipe</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No recipes found with your current pantry items.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  viewButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
  },
});

export default PantrySearchScreen;
