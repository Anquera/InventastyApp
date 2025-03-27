import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { db } from './firebaseConfig'; // Firestore initialization file
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

const RecipeScreen = ({ route }) => {
    const { itemId } = route.params;
    const [recipe, setRecipe] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const itemRef = doc(db, 'item', itemId);
                const itemSnap = await getDoc(itemRef);

                if (itemSnap.exists()) {
                    const itemData = itemSnap.data();

                    const ingredientsQuery = query(
                        collection(db, 'item_ingredient'),
                        where('ItemID', '==', itemId)
                    );

                    const ingredientsSnap = await getDocs(ingredientsQuery);
                    const ingredientsList = await Promise.all(
                        ingredientsSnap.docs.map(async (docSnap) => {
                            const ingData = docSnap.data();

                            const ingredientRef = doc(db, 'ingredients', ingData.IngredientID);
                            const ingredientSnap = await getDoc(ingredientRef);
                            const ingredientName = ingredientSnap.exists() ? ingredientSnap.data().name : 'Unknown';

                            const measurementRef = doc(db, 'measurement', ingData.Measurement);
                            const measurementSnap = await getDoc(measurementRef);
                            const measurementType = measurementSnap.exists() ? measurementSnap.data().MeasurementType : '';

                            return {
                                id: docSnap.id,
                                name: ingredientName,
                                quantity: ingData.IngredientQuantity,
                                measurement: measurementType,
                            };
                        })
                    );

                    setRecipe(itemData);
                    setIngredients(ingredientsList);
                }
            } catch (error) {
                console.error('Error loading recipe:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [itemId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />;
    }

    if (!recipe) {
        return <Text style={styles.error}>Recipe not found</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{recipe.ItemName}</Text>
            <Image source={{ uri: recipe.ImageURL }} style={styles.image} />

            <Text style={styles.sectionTitle}>Ingredients</Text>
            <FlatList
                data={ingredients}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.ingredientRow}>
                        <Text style={styles.ingredientText}>
                            {item.quantity} {item.measurement} {item.name}
                        </Text>
                    </View>
                )}
            />

            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text style={styles.instructions}>{recipe.Instructions}</Text>
        </ScrollView>
    );
};

export default RecipeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF7E6',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontFamily: 'LifeSavers-Regular',
        color: '#4C3A32',
        marginBottom: 10,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'LifeSavers-Regular',
        color: '#6C584C',
        marginBottom: 8,
    },
    ingredientRow: {
        backgroundColor: '#F0E5D8',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    ingredientText: {
        fontSize: 16,
        color: '#4C3A32',
    },
    instructions: {
        fontSize: 16,
        color: '#4C3A32',
        lineHeight: 24,
        marginTop: 10,
    },
    loader: {
        marginTop: 50,
    },
    error: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 50,
    },
});
