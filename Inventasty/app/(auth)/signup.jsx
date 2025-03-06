import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase.Config"; // Adjust path if needed

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password.");
            return;
        }

        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert("Success", "Account created successfully!");
            // Optionally, redirect to sign-in or dashboard page
        } catch (error) {
            Alert.alert("Sign Up Failed", error.message);
        }
        setLoading(false);
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
            <Text>Create Account</Text>

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

            <Button title={loading ? "Creating account..." : "Sign Up"} onPress={handleSignUp} disabled={loading} />
        </View>
    );
};

export default SignUp;
