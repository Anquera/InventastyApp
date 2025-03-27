import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Modal, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { db } from './firebase.Config'; // Firestore initialization
import { collection, doc, getDocs, updateDoc, addDoc, deleteDoc, query, where } from 'firebase/firestore';

const GroceryListScreen = ({ userId }) => {
    const [groceryItems, setGroceryItems] = useState([]);
    const [search, setSearch] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGroceryList = async () => {
            try {
                const q = query(collection(db, 'users', userId, 'groceryList'));
                const snapshot = await getDocs(q);

                const groceryData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setGroceryItems(groceryData);
            } catch (error) {
                console.error('Error fetching grocery list:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGroceryList();
    }, [userId]);

    const handleAdd = async (item) => {
        try {
            const newItem = {
                name: item.name,
                quantity: 1,
            };
            await addDoc(collection(db, 'users', userId, 'groceryList'), newItem);
            setGroceryItems((prev) => [...prev, newItem]);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const handleRemove = async (id) => {
        try {
            await deleteDoc(doc(db, 'users', userId, 'groceryList', id));
            setGroceryItems((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const handleQuantityChange = async () => {
        if (selectedItem) {
            const docRef = doc(db, 'users', userId, 'groceryList', selectedItem.id);
            await updateDoc(docRef, { quantity });
            setGroceryItems((prev) =>
                prev.map((item) =>
                    item.id === selectedItem.id
                        ? { ...item, quantity }
                        : item
                )
            );
            setModalVisible(false);
        }
    };

    const filteredItems = groceryItems.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Grocery List</Text>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for Ingredients..."
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <FlatList
                data={filteredItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.itemRow}
                        onPress={() => {
                            setSelectedItem(item);
                            setQuantity(item.quantity);
                            setModalVisible(true);
                        }}
                    >
                        <Text style={styles.itemText}>
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
                            {selectedItem?.name}
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

export default GroceryListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8F5E9',  // Slightly different from Pantry
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontFamily: 'LifeSavers-Regular',
        color: '#2E7D32',  // Dark green for Grocery List title
        marginBottom: 10,
        textAlign: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#C8E6C9',  // Greenish background for search bar
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#A5D6A7',  // Lighter green rows
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    itemText: {
        fontSize: 18,
        color: '#1B5E20',  // Dark green for text
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    removeButton: {
        backgroundColor: '#D32F2F',  // Red button for remove
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
