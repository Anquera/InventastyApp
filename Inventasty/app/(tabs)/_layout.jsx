import {View, Text} from 'react-native'
import React from 'react'
import {Tabs} from "expo-router";
// import {Colors} from "react-native/Libraries/NewAppScreen";
import Ionicons from '@expo/vector-icons/Ionicons';

const TabLayout = () => {
    return (
       <Tabs
           screenOptions={{
               headerShown: false ,
               tabBarLabelStyle: {fontSize: 12, fontWeight: 'bold'},
           }}>
           <Tabs.Screen
               name='home'
               options={{
                   title:"Home",
                   tabBarIcon:({color})=>(
                       <Ionicons name='home' size={24} color={color}/>
                   ),
               }} />
           <Tabs.Screen
               name='pantry'
               options={{
                   title:"Pantry",
                   tabBarIcon:({color})=>(
                       <Ionicons name="add-circle-outline" size={24} color="black" />
                   ),
               }} />
           <Tabs.Screen
               name='groceries'
               options={{
                   title:"Groceries",
                   tabBarIcon:({color})=>(
                       <Ionicons name="cart-sharp" size={24} color="black" />
                   ),
               }} />
           <Tabs.Screen
               name='profile'
               options={{
                   title:"Profile",
                   tabBarIcon:({color})=>(
                       <Ionicons name="person-sharp" size={24} color="black" />
                   ),
               }} />
       </Tabs>
    )
}
export default TabLayout
