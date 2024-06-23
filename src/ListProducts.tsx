import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, Alert, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { API_URL } from "@env";
import { styles } from "../styles/GeneralStyles";

export default function ListProducts() {
  const [productos, setProductos] = useState([]);
  const [productoID, setProductoID] = useState([]);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await fetch(`${API_URL}api/producto`, {
        method: "GET",
      });
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlerProductoByID = async (id) => {
    try {
      const response = await fetch(`${API_URL}api/producto/${id}`);
      const data = await response.json();
      setProductoID(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProductoByID = async (id) => {
    try {
      const response = await fetch(`${API_URL}api/producto/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProductos(productos.filter((item) => item.id !== id));
        setProductoID([]);
        Alert.alert("", "Producto Eliminado.");
      } else {
        Alert.alert("", "Error al borrar producto.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{`${item.nombre} | ${item.descripcion} | ${item.precio}`}</Text>
              <TouchableOpacity
                style={styles.findButton}
                onPress={() => handlerProductoByID(item.id.toString())}
              >
                <Ionicons name="search-circle" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Text style={styles.title}>Detalle</Text>
        <View style={styles.inputContainer}>
          <FlatList
            data={productoID}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>{`${item.nombre} | ${item.descripcion}`}</Text>
                <Text>{`${item.precio} | ${
                  item.estado ? "Desponible" : "No Disponible"
                } | ${item.categoria}`}</Text>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteProductoByID(item.id)}
                >
                  <Ionicons name="close-circle" size={24} color="white" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}
