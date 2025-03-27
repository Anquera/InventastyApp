import { useEffect } from "react";
import { useRouter } from "expo-router";
import { auth } from "../config/firebase.Config";
import { onAuthStateChanged } from "firebase/auth";

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.replace("./(tabs)/search/AllRecipesScreen");  // Ensure this matches your first screen
            } else {
                router.replace("./(auth)/signin");
            }
        });

        return () => unsubscribe();
    }, [router]);

    return null;  
}
