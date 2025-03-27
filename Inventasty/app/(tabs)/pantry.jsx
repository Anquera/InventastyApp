import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const Pantry = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [pantry, setPantry] = useState([
        { id: '1', name: 'Salt', description: 'Table salt', category: 'Spices' },
        { id: '2', name: 'Olive Oil', description: 'Extra virgin olive oil', category: 'Oils' },
        { id: '3', name: 'Sugar', description: 'Granulated sugar', category: 'Sweeteners' },
        { id: '4', name: 'Flour', description: 'All-purpose flour', category: 'Baking' },
        { id: '5', name: 'Rice', description: 'White rice', category: 'Grains' },
        { id: '6', name: 'Tomato Sauce', description: 'Organic tomato sauce', category: 'Pantry' },
        { id: '7', name: 'Bread Crumbs', description: 'Breadcrumbs for cooking', category: 'Pantry' },
        { id: '8', name: 'Peanut Butter', description: 'Smooth peanut butter', category: 'Pantry' },
        { id: '9', name: 'Jelly', description: 'Strawberry jelly', category: 'Pantry' },
        { id: '10', name: 'Canned Beans', description: 'Black beans, canned', category: 'Canned Goods' },
        { id: '11', name: 'Ketchup', description: 'Tomato ketchup', category: 'Condiments' },
        { id: '12', name: 'Mustard', description: 'Yellow mustard', category: 'Condiments' },
        { id: '13', name: 'Mayo', description: 'Mayonnaise', category: 'Condiments' }
    ]);
    
    const [userPantry, setUserPantry] = useState([]);

    // Handle search query change
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // Add pantry item to user's list
    const handleAdd = (pantryItem) => {
        if (!userPantry.some(item => item.id === pantryItem.id)) {
            setUserPantry((prevPantry) => [
                ...prevPantry,
                pantryItem
            ]);
        }
    };

    // Remove pantry item from user's list
    const handleRemove = (id) => {
        setUserPantry((prevPantry) =>
            prevPantry.filter((pantryItem) => pantryItem.id !== id)
        );
    };

    // Filter pantry items based on the search query
    const filteredPantry = pantry.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !userPantry.some(userItem => userItem.id === item.id)  // Exclude already added items
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pantry</Text>

            {/* Search Bar */}
            <TextInput
                placeholder="Search for pantry items..."
                value={searchQuery}
                onChangeText={handleSearch}
                style={styles.searchInput}
            />

            {/* Search Results Dropdown */}
            {searchQuery && filteredPantry.length > 0 && (
                <View style={styles.searchResults}>
                    <FlatList
                        data={filteredPantry}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.searchResultCard}>
                                <Text style={styles.cardTitle}>{item.name}</Text>
                                <TouchableOpacity
                                    onPress={() => handleAdd(item)}
                                    style={styles.addButton}
                                >
                                    <Text style={styles.addButtonText}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            )}

            {/* User's Added Pantry Items */}
            <Text style={styles.sectionTitle}>Your Pantry</Text>
            <FlatList
                data={userPantry}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{item.name}</Text>
                            <Text style={styles.cardCategory}>{item.category}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.removeButton}>
                            <Text style={styles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyMessage}>No items in your pantry yet.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
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
        marginBottom: 10,
        backgroundColor: '#f8f8f8',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    searchResults: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        zIndex: 10,
    },
    searchResultCard: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    addButton: {
        backgroundColor: '#4caf50',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 12,
        color: '#333',
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 2,
    },
    cardContent: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    cardCategory: {
        fontSize: 14,
        color: '#999',
    },
    removeButton: {
        backgroundColor: '#ff5e5e',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    emptyMessage: {
        textAlign: 'center',
        color: '#888',
        fontSize: 16,
    },
});

export default Pantry;
