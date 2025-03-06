import {SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import {useRouter} from "expo-router";
//import logo from "../assets/images/react-logo.png";

//const logo = require("../assets/images/react-logo.png");

export default function Index() {
    const router = useRouter();
  return (
   <SafeAreaView>
       <StatusBar barStyle="light-content" />
       <ScrollView contentContainerStyle={{height: "100%"}}>
           <View className='m-2 flex justify-center items-center' >
               <Text>Welcome to InvenTasty!</Text>
               <View>
                   <TouchableOpacity onPress={()=>router.push("/home")} className="p-2 my-2">
                       <Text className="text-lg font-semibold text-center">Sign In as guest user</Text>
                   </TouchableOpacity>
               </View>
           </View>
       </ScrollView>
   </SafeAreaView>
  );
}
