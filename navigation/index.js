import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import ProductInfo from "../components/ProductInfo";
import CardItem from "../components/CardItem";
import MyTabs from "../components/MyTabs";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={MyTabs} />
      <Stack.Screen
        name="Details"
        options={{
          headerShown: true,
        }}
        component={ProductInfo}
      />
      <Stack.Screen name="CardItem" component={CardItem} />
    </Stack.Navigator>
  );
}
