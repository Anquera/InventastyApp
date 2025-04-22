const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

admin.initializeApp();
const db = admin.firestore();

const API_KEY = functions.config().gemini.key; // You'll set this with: firebase functions:config:set gemini.key="YOUR_KEY"
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

const jsonOutputSchema = `{
  "name": "Recipe Name",
  "image_prompt": "A descriptive prompt for an AI image generator",
  "ingredients": [{"item": "Ingredient", "amount": Number, "unit": "unit"}],
  "instructions": ["Step 1...", "Step 2..."]
}`;

function parseGeminiResponse(responseText) {
  if (!responseText) return null;
  try {
    const jsonMatch = responseText.match(/```json\\s*([\\s\\S]*?)\\s*```/);
    const potentialJson = jsonMatch ? jsonMatch[1] : responseText;
    return JSON.parse(potentialJson);
  } catch (err) {
    console.error("Parse error:", err);
    return null;
  }
}

// 🧠 Generate recipe from name or pantry
exports.generateRecipeAI = functions
  .region("us-central1")
  .runWith({ memory: "1GB", timeoutSeconds: 60 })
  .https.onCall(async (data, context) => {
    const { recipeName, pantryIngredients } = data;

    if (!recipeName && (!pantryIngredients || pantryIngredients.length === 0)) {
      throw new functions.https.HttpsError("invalid-argument", "Please provide either a recipe name or pantry ingredients.");
    }

    const prompt = recipeName
      ? `Generate a recipe for "${recipeName}". Return only JSON: ${jsonOutputSchema}`
      : `Generate a recipe using: ${pantryIngredients.join(", ")}. Return only JSON: ${jsonOutputSchema}`;

    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        safetySettings,
      });

      const responseText = result.response.text();
      const parsed = parseGeminiResponse(responseText);

      if (!parsed || !parsed.name || !parsed.ingredients || !parsed.instructions) {
        throw new functions.https.HttpsError("internal", "Failed to parse recipe from Gemini.");
      }

      return { recipe: parsed };
    } catch (error) {
      console.error("Gemini error:", error);
      throw new functions.https.HttpsError("internal", "An error occurred while generating the recipe.");
    }
  });

// 💾 Save recipe to Firestore
exports.saveRecipeAI = functions
  .region("us-central1")
  .runWith({ memory: "1GB", timeoutSeconds: 60 })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError("unauthenticated", "You must be signed in.");
    }

    const userId = context.auth.uid;
    const { recipeData, generatedBy, sourcePrompt } = data;

    if (!recipeData?.name || !recipeData?.ingredients || !recipeData?.instructions) {
      throw new functions.https.HttpsError("invalid-argument", "Invalid recipe data provided.");
    }

    const docRef = await db.collection("users").doc(userId).collection("recipes").add({
      ...recipeData,
      userId,
      generatedBy,
      sourcePrompt,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      image_url: null,
    });

    return { success: true, recipeId: docRef.id };
  });

  exports.helloWorld = functions.https.onCall((data, context) => {
    return { message: "Hello from Firebase!" };
  });
