import { Redirect } from "expo-router";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export default function SearchIndex() {
    return <Redirect href="/tabs/search/AllRecipesScreen" />;
}
