import { View, Text, Button, Alert } from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase.Config"; // Adjust the path to your Firebase config
import { useRouter } from "expo-router";

const Profile = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            Alert.alert("Signed Out", "You have successfully signed out.");
            router.replace("/(auth)/signin"); // Navigate to sign-in page after signing out
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Profile</Text>
            <Button title="Sign Out" onPress={handleSignOut} />
        </View>
    );
};

export default Profile;
