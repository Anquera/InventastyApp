import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const Groceries = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [groceries, setGroceries] = useState([
        { id: '1', name: 'Milk', description: 'Whole milk', category: 'Dairy' },
        { id: '2', name: 'Bread', description: 'Whole wheat bread', category: 'Bakery' },
        { id: '3', name: 'Eggs', description: 'Organic eggs', category: 'Dairy' },
        { id: '4', name: 'Banana', description: 'Fresh bananas', category: 'Fruit' },
        { id: '5', name: 'Chicken', description: 'Boneless chicken breasts', category: 'Meat' },
        { id: '6', name: 'Cheese', description: 'Cheddar cheese', category: 'Dairy' },
        { id: '7', name: 'Apple', description: 'Fresh red apples', category: 'Fruit' },
        { id: '8', name: 'Tomato', description: 'Ripe red tomatoes', category: 'Vegetable' },
        { id: '9', name: 'Lettuce', description: 'Crisp iceberg lettuce', category: 'Vegetable' },
        { id: '10', name: 'Orange', description: 'Fresh navel oranges', category: 'Fruit' },
        { id: '11', name: 'Yogurt', description: 'Greek yogurt', category: 'Dairy' },
        { id: '12', name: 'Cucumber', description: 'Fresh cucumbers', category: 'Vegetable' },
        { id: '13', name: 'Carrot', description: 'Organic carrots', category: 'Vegetable' },
        { id: '14', name: 'Beef', description: 'Ground beef', category: 'Meat' },
        { id: '15', name: 'Salmon', description: 'Fresh salmon fillets', category: 'Fish' },
        { id: '16', name: 'Rice', description: 'White rice', category: 'Grain' },
        { id: '17', name: 'Pasta', description: 'Spaghetti pasta', category: 'Grain' },
        { id: '18', name: 'Garlic', description: 'Fresh garlic cloves', category: 'Vegetable' },
        { id: '19', name: 'Onion', description: 'Yellow onions', category: 'Vegetable' },
        { id: '20', name: 'Potato', description: 'Russet potatoes', category: 'Vegetable' },
        { id: '21', name: 'Olive Oil', description: 'Extra virgin olive oil', category: 'Condiments' },
        { id: '22', name: 'Salt', description: 'Sea salt', category: 'Condiments' },
        { id: '23', name: 'Pepper', description: 'Black pepper', category: 'Condiments' },
        { id: '24', name: 'Cereal', description: 'Oats cereal', category: 'Breakfast' },
        { id: '25', name: 'Coffee', description: 'Ground coffee beans', category: 'Beverage' },
        { id: '26', name: 'Tea', description: 'Green tea bags', category: 'Beverage' },
        { id: '27', name: 'Butter', description: 'Unsalted butter', category: 'Dairy' },
        { id: '28', name: 'Chocolate', description: 'Dark chocolate bars', category: 'Snack' },
        { id: '29', name: 'Cookies', description: 'Chocolate chip cookies', category: 'Snack' },
        { id: '30', name: 'Ice Cream', description: 'Vanilla ice cream', category: 'Dessert' },
        { id: '31', name: 'Frozen Peas', description: 'Frozen peas', category: 'Frozen Food' },
        { id: '32', name: 'Frozen Pizza', description: 'Pepperoni frozen pizza', category: 'Frozen Food' },
        { id: '33', name: 'Bread Crumbs', description: 'Breadcrumbs for cooking', category: 'Pantry' },
        { id: '34', name: 'Tomato Sauce', description: 'Organic tomato sauce', category: 'Pantry' },
        { id: '35', name: 'Ketchup', description: 'Tomato ketchup', category: 'Condiments' },
        { id: '36', name: 'Mustard', description: 'Yellow mustard', category: 'Condiments' },
        { id: '37', name: 'Mayo', description: 'Mayonnaise', category: 'Condiments' },
        { id: '38', name: 'Peanut Butter', description: 'Smooth peanut butter', category: 'Pantry' },
        { id: '39', name: 'Jelly', description: 'Strawberry jelly', category: 'Pantry' },
        { id: '40', name: 'Canned Beans', description: 'Black beans, canned', category: 'Canned Goods' }
    ]);
    
    const [userGroceries, setUserGroceries] = useState([]);

    // Handle search query change
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // Add grocery to user's list
    const handleAdd = (grocery) => {
        if (!userGroceries.some(item => item.id === grocery.id)) {
            setUserGroceries((prevGroceries) => [
                ...prevGroceries,
                grocery
            ]);
        }
    };

    // Remove grocery from user's list
    const handleRemove = (id) => {
        setUserGroceries((prevGroceries) =>
            prevGroceries.filter((grocery) => grocery.id !== id)
        );
    };

    // Filter groceries based on the search query
    const filteredGroceries = groceries.filter((grocery) =>
        grocery.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !userGroceries.some(item => item.id === grocery.id)  // Exclude already added items
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Groceries</Text>

            {/* Search Bar */}
            <TextInput
                placeholder="Search for groceries..."
                value={searchQuery}
                onChangeText={handleSearch}
                style={styles.searchInput}
            />

            {/* Search Results Dropdown */}
            {searchQuery && filteredGroceries.length > 0 && (
                <View style={styles.searchResults}>
                    <FlatList
                        data={filteredGroceries}
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

            {/* User's Added Groceries */}
            <Text style={styles.sectionTitle}>Your Groceries</Text>
            <FlatList
                data={userGroceries}
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
                ListEmptyComponent={<Text style={styles.emptyMessage}>No groceries added yet.</Text>}
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

export default Groceries;
