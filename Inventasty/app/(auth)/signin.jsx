import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase.Config"; // Adjust the path if needed

const SignIn = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password.");
            return;
        }

        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert("Success", "Signed in successfully!");
            router.replace("/(tabs)/home"); // Redirect to tabs after sign-in
        } catch (error) {
            Alert.alert("Sign In Failed", error.message);
        }
        setLoading(false);
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
            <Text>Sign In</Text>

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    marginBottom: 10,
                    borderRadius: 5,
                }}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    marginBottom: 10,
                    borderRadius: 5,
                }}
                secureTextEntry
            />

            <Button title={loading ? "Signing in..." : "Sign In"} onPress={handleSignIn} disabled={loading} />

            <Text>Don't have an account?</Text>
            <Button
                title="Go to Sign Up"
                onPress={() => router.push("/(auth)/signup")} // Correct path to the sign-up page
            />
        </View>
    );
};

export default SignIn;
