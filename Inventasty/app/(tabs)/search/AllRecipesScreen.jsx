// AllRecipesScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const AllRecipesScreen = () => {
  const navigation = useNavigation();  // Hook to navigate between screens
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([
    { id: '1', name: 'Spaghetti Bolognese', description: 'A classic Italian pasta dish with rich meat sauce.', image: 'https://www.example.com/spaghetti.jpg' },
    { id: '2', name: 'Chicken Alfredo', description: 'A creamy pasta dish with grilled chicken.', image: 'https://www.example.com/chicken_alfredo.jpg' },
    { id: '3', name: 'Caesar Salad', description: 'A fresh salad with romaine lettuce and Caesar dressing.', image: 'https://www.example.com/caesar_salad.jpg' },
    { id: '4', name: 'Vegetable Stir Fry', description: 'A healthy stir fry with a variety of vegetables.', image: 'https://www.example.com/vegetable_stirfry.jpg' },
    { id: '5', name: 'Tacos', description: 'Delicious tacos with your choice of filling.', image: 'https://www.example.com/tacos.jpg' }
  ]);

  // Handle search query change
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Filter recipes based on the search query
  const filteredRecipes = recipes.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navigate to recipe details page
  const handleViewRecipe = (recipe) => {
    navigation.navigate('RecipeDetails', { recipe });  // Pass recipe data to the next screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Recipes</Text>

      {/* Search Bar */}
      <TextInput
        placeholder="Search for recipes..."
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />

      {/* Recipe Cards */}
      <FlatList
        data={filteredRecipes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
            <TouchableOpacity style={styles.viewButton} onPress={() => handleViewRecipe(item)}>
              <Text style={styles.viewButtonText}>View Recipe</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No recipes found.</Text>}
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
  searchInput: {
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  card: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    alignItems: 'center',
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
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

export default AllRecipesScreen;
