// GenerateRecipeScreen.jsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import { generateRecipe, saveRecipe } from "../geminiService";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

const GenerateRecipeScreen = () => {
  const [mode, setMode] = useState("search"); // "search" or "pantry"
  const [searchQuery, setSearchQuery] = useState("");
  const [pantryItems, setPantryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  const fetchPantryItems = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const pantryRef = collection(db, "users", currentUser.uid, "pantry");
    const pantrySnapshot = await getDocs(pantryRef);
    const items = pantrySnapshot.docs.map(doc => doc.data().name);
    setPantryItems(items);
  };

  useEffect(() => {
    if (mode === "pantry") fetchPantryItems();
  }, [mode]);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const data = await generateRecipe(mode, searchQuery, pantryItems);
      setRecipe(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!recipe) return;
    try {
      await saveRecipe(recipe, mode, mode === "search" ? searchQuery : pantryItems.join(", "));
      Alert.alert("Success", "Recipe saved!");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", err.message || "Could not save recipe.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate a Recipe with Gemini</Text>

      <View style={styles.toggleContainer}>
        <TouchableOpacity onPress={() => setMode("search")} style={[styles.toggleButton, mode === "search" && styles.toggleActive]}>
          <Text style={styles.toggleText}>Search by Name</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode("pantry")} style={[styles.toggleButton, mode === "pantry" && styles.toggleActive]}>
          <Text style={styles.toggleText}>Use Pantry</Text>
        </TouchableOpacity>
      </View>

      {mode === "search" ? (
        <TextInput
          style={styles.input}
          placeholder="e.g. Apple Pie"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      ) : (
        <>
          <Text style={styles.pantryList}>{pantryItems.join(", ") || "(Loading pantry...)"}</Text>
        </>
      )}

      <Button title="Generate Recipe" onPress={handleGenerate} disabled={loading} />

      {loading && <ActivityIndicator size="large" color="green" style={styles.loader} />}
      {error && <Text style={styles.error}>{error}</Text>}

      {recipe && (
        <View style={styles.recipeContainer}>
          <Text style={styles.recipeTitle}>{recipe.name}</Text>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePrompt}>🖼️ {recipe.image_prompt}</Text>
          </View>

          <Text style={styles.sectionTitle}>Ingredients</Text>
          <FlatList
            data={recipe.ingredients}
            keyExtractor={(_, i) => `ing-${i}`}
            renderItem={({ item }) => (
              <Text style={styles.item}>• {item.amount} {item.unit} {item.item}</Text>
            )}
          />

          <Text style={styles.sectionTitle}>Instructions</Text>
          <FlatList
            data={recipe.instructions}
            keyExtractor={(_, i) => `step-${i}`}
            renderItem={({ item, index }) => (
              <Text style={styles.item}>{index + 1}. {item}</Text>
            )}
          />

          <Button title="Save Recipe" onPress={handleSave} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 15 },
  input: {
    borderWidth: 1, borderColor: "#ccc", padding: 10,
    borderRadius: 5, marginBottom: 10
  },
  pantryList: { fontStyle: "italic", marginBottom: 10 },
  loader: { marginTop: 10 },
  error: { color: "red", textAlign: "center", marginTop: 10 },
  recipeContainer: {
    marginTop: 20, padding: 15,
    borderWidth: 1, borderColor: "#eee", borderRadius: 8
  },
  recipeTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginTop: 10 },
  item: { fontSize: 14, marginVertical: 2 },
  imagePlaceholder: {
    height: 100, justifyContent: "center", alignItems: "center",
    backgroundColor: "#f2f2f2", borderRadius: 5, marginBottom: 10
  },
  imagePrompt: { fontSize: 12, fontStyle: "italic", color: "#555" },
  toggleContainer: {
    flexDirection: "row", justifyContent: "space-around",
    marginVertical: 10,
  },
  toggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
  toggleActive: {
    backgroundColor: "green",
  },
  toggleText: {
    color: "#fff",
  },
});

export default GenerateRecipeScreen;
