// functions/dietBotService.js
import { getFirestore, collection, addDoc, query, orderBy, getDocs } from "firebase/firestore";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig"; // update path if needed

initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function getChatHistory() {
  const user = auth.currentUser;
  if (!user) return [];

  const q = query(collection(db, "users", user.uid, "dietChat"), orderBy("timestamp", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
}

export async function sendUserMessage(userMessage) {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  // Store user message
  await addDoc(collection(db, "users", user.uid, "dietChat"), {
    sender: "user",
    message: userMessage,
    timestamp: new Date(),
  });

  const prompt = `
You are a friendly but focused dietary assistant named Vita. Stay on topic and help users with:
- Meal planning
- Keto or other diets
- Replacements for food allergies
- Nutrition for fitness
Keep it friendly and warm, but redirect if conversation drifts.

User: "${userMessage}"
`;

  const result = await model.generateContent(prompt);
  const botResponse = result.response.text();

  // Store bot response
  await addDoc(collection(db, "users", user.uid, "dietChat"), {
    sender: "Vita",
    message: botResponse,
    timestamp: new Date(),
  });

  return botResponse;
}
