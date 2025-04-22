// geminiService.js
import { getFunctions, httpsCallable } from "firebase/functions";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "./firebaseConfig"; // adjust if needed

const functions = getFunctions(firebaseApp);
const auth = getAuth(firebaseApp);

export const generateRecipe = async (mode, searchQuery, pantryItems = []) => {
  const generateRecipeFn = httpsCallable(functions, "generateRecipeAI");

  const payload =
    mode === "search"
      ? { recipeName: searchQuery }
      : { pantryIngredients: pantryItems };

  const result = await generateRecipeFn(payload);
  return result.data.recipe;
};

export const saveRecipe = async (recipe, mode, sourcePrompt) => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("User not authenticated");

  const saveRecipeFn = httpsCallable(functions, "saveRecipeAI");

  const result = await saveRecipeFn({
    recipeData: recipe,
    generatedBy: mode,
    sourcePrompt: sourcePrompt,
  });

  return result.data;
};
