// RecipeDetails.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const RecipeDetails = ({ route }) => {
  const { recipe } = route.params;  // Get the recipe data passed from AllRecipesScreen

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <Text style={styles.description}>{recipe.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 250,
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default RecipeDetails;
