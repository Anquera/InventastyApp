const admin = require('firebase-admin');

// Path to your service account key JSON file
const serviceAccount = require("C:/Users/savan/OneDrive/src/InventastyApp/inventastyfirebase-firebase-adminsdk-fbsvc-d960f2ecd8.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'inventastyfirebase',
});

console.log("Using credentials from:", serviceAccount);

// Firestore reference
const db = admin.firestore();

// Sample data
const data = {
    ingredients: [
        { id: 'ing1', name: 'Tomato', category: 'Vegetable', description: 'Fresh red vegetable used in salads and sauces.' },
        { id: 'ing2', name: 'Cheese', category: 'Dairy', description: 'Dairy product made from milk, available in various types.' },
        { id: 'ing3', name: 'Bacon', category: 'Meat', description: 'Cured and smoked pork used in breakfast dishes or sandwiches.' },
        { id: 'ing4', name: 'Lettuce', category: 'Vegetable', description: 'Leafy green vegetable often used in salads.' },
        { id: 'ing5', name: 'Chicken', category: 'Meat', description: 'Poultry meat commonly used in various dishes.' },
        { id: 'ing6', name: 'Avocado', category: 'Fruit', description: 'Creamy fruit often used in salads or guacamole.' },
        { id: 'ing7', name: 'Olives', category: 'Fruit', description: 'Small, bitter fruit used in salads or as a garnish.' },
        { id: 'ing8', name: 'Egg', category: 'Dairy', description: 'Product from chickens used in various dishes such as omelets or cakes.' },
        { id: 'ing9', name: 'Mushroom', category: 'Vegetable', description: 'Fungi used in soups, salads, and pizzas.' },
        { id: 'ing10', name: 'Garlic', category: 'Vegetable', description: 'Strong-flavored vegetable used as a spice in cooking.' }
    ],
    items: [
        { id: 'item1', name: 'Pizza', type: 'Main', description: 'Dish made of dough, sauce, cheese, and various toppings.' },
        { id: 'item2', name: 'Salad', type: 'Side', description: 'Dish made with a variety of vegetables and fruits, often served as a side.' },
        { id: 'item3', name: 'Burger', type: 'Main', description: 'Sandwich consisting of a patty of ground meat, usually served with cheese, vegetables, and condiments.' },
        { id: 'item4', name: 'Sandwich', type: 'Main', description: 'Food made by placing various ingredients between slices of bread.' },
        { id: 'item5', name: 'Omelette', type: 'Main', description: 'Egg-based dish, usually made with cheese, vegetables, or meats.' },
        { id: 'item6', name: 'Pasta', type: 'Main', description: 'Dish made from wheat-based dough, typically served with sauce and other ingredients.' },
        { id: 'item7', name: 'Smoothie', type: 'Drink', description: 'Beverage made by blending fruits, yogurt, or other ingredients.' },
        { id: 'item8', name: 'Soup', type: 'Side', description: 'Liquid dish made by boiling ingredients like vegetables, meats, and spices in water.' }
    ],
    itemRecipes: [
        { itemId: 'item1', ingredientIds: ['ing1', 'ing2', 'ing3', 'ing4', 'ing5'], instructions: ['Preheat oven...', 'Roll out dough...', 'Bake pizza...'] },
        { itemId: 'item2', ingredientIds: ['ing4', 'ing6', 'ing7'], instructions: ['Wash and dry lettuce...', 'Slice avocado...', 'Mix ingredients...'] },
        { itemId: 'item3', ingredientIds: ['ing5', 'ing2', 'ing3'], instructions: ['Grill chicken...', 'Toast bun...', 'Assemble burger...'] },
        { itemId: 'item4', ingredientIds: ['ing6', 'ing1', 'ing5'], instructions: ['Toast bread...', 'Mash avocado...', 'Make sandwich...'] },
        { itemId: 'item5', ingredientIds: ['ing8', 'ing4', 'ing2'], instructions: ['Whisk eggs...', 'Cook in pan...', 'Add cheese...'] },
        { itemId: 'item6', ingredientIds: ['ing5', 'ing2', 'ing9'], instructions: ['Cook pasta...', 'Grill chicken...', 'Mix ingredients...'] },
        { itemId: 'item7', ingredientIds: ['ing6', 'ing7', 'ing10'], instructions: ['Blend avocado...', 'Chop olives...', 'Serve smoothie...'] },
        { itemId: 'item8', ingredientIds: ['ing4', 'ing10', 'ing9'], instructions: ['Saute garlic...', 'Add mushrooms...', 'Simmer soup...'] }
    ]
};

// Function to batch write documents
async function batchWriteData(collectionName, documents) {
    if (documents.length === 0) {
        console.log(`No documents to import into ${collectionName}.`);
        return;
    }

    const batch = db.batch();
    const collectionRef = db.collection(collectionName);

    documents.forEach((doc) => {
        try {
            if (!doc.id && !doc.itemId) {
                throw new Error(`Document has no 'id' or 'itemId' field: ${JSON.stringify(doc)}`);
            }
            const docId = doc.id || doc.itemId;
            batch.set(collectionRef.doc(docId), doc);
        } catch (error) {
            console.error(`Error processing document: ${JSON.stringify(doc)} - ${error.message}`);
            throw error; // Re-throw to stop the batch if a document fails
        }
    });

    try {
        await batch.commit();
        console.log(`${collectionName} imported successfully.`);
    } catch (error) {
        console.error(`Error committing batch for ${collectionName}:`, error);
        throw error; // Re-throw to stop the import process
    }
}

// Function to import data into Firestore
async function importData() {
    try {
        await Promise.all([
            batchWriteData('ingredients', data.ingredients),
            batchWriteData('items', data.items),
            batchWriteData('itemRecipes', data.itemRecipes)
        ]);
        console.log('All data imported successfully.');
    } catch (error) {
        console.error('Error importing data:', error);
    }
}

// Run the import function
importData();
