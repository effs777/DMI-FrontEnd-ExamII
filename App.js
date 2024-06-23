import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import Products from "./src/Products";
import ListProducts from "./src/ListProducts";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Products"
          component={Products}
          options={{
            headerBackTitleVisible: true,
            headerBackTitle: "Salir",
            headerStyle: {
              backgroundColor: "#192a57",
            },
            title: "Ingreso de Productos",
            headerTitleStyle: {
              color: "#fff",
            },
          }}
        />
        <Stack.Screen
          name="ListProducts"
          component={ListProducts}
          options={{
            headerBackTitleVisible: true,
            headerBackTitle: "Salir",
            headerStyle: {
              backgroundColor: "#192a57",
            },
            title: "Detalle de Productos",
            headerTitleStyle: {
              color: "#fff",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
