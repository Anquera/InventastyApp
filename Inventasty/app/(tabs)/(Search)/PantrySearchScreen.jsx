// export default function PantrySearchScreen() {
//     return (
//         <View>
//             <Text>Pantry Search Screen</Text>
//         </View>
//     );
// }

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Modal, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { db } from './firebase.Config'; // Firestore initialization file
import { collection, doc, getDocs, updateDoc, addDoc, deleteDoc, query, where } from 'firebase/firestore';

const PantryScreen = ({ userId }) => {
    const [ingredients, setIngredients] = useState([]);
    const [search, setSearch] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPantry = async () => {
            try {
                const q = query(collection(db, 'users', userId, 'pantry'));
                const snapshot = await getDocs(q);

                const pantryItems = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setIngredients(pantryItems);
            } catch (error) {
                console.error('Error fetching pantry:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPantry();
    }, [userId]);

    const handleAdd = async (ingredient) => {
        try {
            const newIngredient = {
                name: ingredient.name,
                quantity: 1,
            };
            await addDoc(collection(db, 'users', userId, 'pantry'), newIngredient);
            setIngredients((prev) => [...prev, newIngredient]);
        } catch (error) {
            console.error('Error adding ingredient:', error);
        }
    };

    const handleRemove = async (id) => {
        try {
            await deleteDoc(doc(db, 'users', userId, 'pantry', id));
            setIngredients((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Error removing ingredient:', error);
        }
    };

    const handleQuantityChange = async () => {
        if (selectedIngredient) {
            const docRef = doc(db, 'users', userId, 'pantry', selectedIngredient.id);
            await updateDoc(docRef, { quantity });
            setIngredients((prev) =>
                prev.map((item) =>
                    item.id === selectedIngredient.id
                        ? { ...item, quantity }
                        : item
                )
            );
            setModalVisible(false);
        }
    };

    const filteredIngredients = ingredients.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pantry</Text>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for Ingredients..."
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <FlatList
                data={filteredIngredients}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.ingredientRow}
                        onPress={() => {
                            setSelectedIngredient(item);
                            setQuantity(item.quantity);
                            setModalVisible(true);
                        }}
                    >
                        <Text style={styles.ingredientText}>
                            {item.name} ({item.quantity})
                        </Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => handleRemove(item.id)}>
                                <View style={styles.removeButton}>
                                    <Text style={styles.buttonText}>Remove</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {selectedIngredient?.name}
                        </Text>

                        <TextInput
                            style={styles.quantityInput}
                            keyboardType="numeric"
                            value={quantity.toString()}
                            onChangeText={(text) => setQuantity(parseInt(text) || 1)}
                        />

                        <Button title="Save" onPress={handleQuantityChange} />
                        <Button title="Cancel" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default PantryScreen;

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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0E5D8',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    ingredientRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E0E0E0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    ingredientText: {
        fontSize: 18,
        color: '#4C3A32',
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    removeButton: {
        backgroundColor: '#8B5C67',
        padding: 8,
        borderRadius: 5,
        marginLeft: 5,
    },
    buttonText: {
        color: '#FFF',
    },
    loader: {
        marginTop: 50,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        marginBottom: 10,
    },
    quantityInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        width: '100%',
        padding: 10,
        marginBottom: 15,
        fontSize: 18,
    },
});

