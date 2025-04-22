import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase.Config";

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
            // Navigate to AllRecipesScreen under the search tab
            router.replace("/(tabs)/search/AllRecipesScreen");
        } catch (error) {
            Alert.alert("Sign In Failed", error.message);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Inventasty</Text>
            <Text style={styles.subHeader}>Sign In</Text>

            {/* Email Input */}
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            {/* Password Input */}
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />

            {/* Sign In Button */}
            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSignIn}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Sign In</Text>
                )}
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => router.push("/auth/signup")}>
                    <Text style={styles.signupLink}>Go to Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 30,
        backgroundColor: "#f5f5f5",
    },
    header: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 24,
        fontWeight: "600",
        color: "#555",
        textAlign: "center",
        marginBottom: 40,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: "#fff",
        fontSize: 16,
        color: "#333",
    },
    button: {
        backgroundColor: "#4CAF50",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonDisabled: {
        backgroundColor: "#ddd",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    footer: {
        marginTop: 30,
        alignItems: "center",
    },
    footerText: {
        color: "#888",
        fontSize: 16,
    },
    signupLink: {
        color: "#4CAF50",
        fontSize: 16,
        fontWeight: "600",
        marginTop: 5,
    },
});

export default SignIn;
