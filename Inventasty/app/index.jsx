import { useEffect } from "react";
import { useRouter } from "expo-router";
import { auth } from "../config/firebase.Config";  // Adjust the path to your Firebase config
import { onAuthStateChanged } from "firebase/auth";

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.replace("/(tabs)/home");  // Navigate to the tabs layout after sign-in
            } else {
                router.replace("/(auth)/signin");  // Redirect to sign-in if not authenticated
            }
        });

        return () => unsubscribe();
    }, [router]);

    return null;  // No UI is rendered, just redirects
}
