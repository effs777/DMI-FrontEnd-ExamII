import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  // Text,
  FlatList,
  // Button,
  // TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {
  Card,
  Button,
  TextInput,
  Modal,
  Portal,
  Provider,
  Text,
  IconButton,
  List,
} from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
import { API_URL } from "@env";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/GeneralStyles";

export default function Products() {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [estado, setEstado] = useState(true);
  const [idCategoria, setIDCategoria] = useState(0);
  const [fotografia, setFotografia] = useState("");

  const [estadoDescripcion, setEstadoDescripcion] = useState("");
  const [estadoExpanded, setEstadoExpanded] = useState(false);
  const [categoriaDescripcion, setCategoriaDescripcion] = useState("");
  const [categoriaExpanded, setCategoriaExpanded] = useState(false);
  const [optionsCategorias, setOptionsCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputNombre = useRef(null);

  const obtenerCategorias = async () => {
    try {
      const response = await axios.get(`${API_URL}api/categoria`);
      setOptionsCategorias(response.data);
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };
  useEffect(() => {
    obtenerCategorias();
  }, []);

  const handleEstado = (estado, descripcion) => {
    setEstado(estado);
    setEstadoDescripcion(descripcion);
    setEstadoExpanded(!estadoExpanded);
  };

  const handleCategoria = (id, descripcion) => {
    setIDCategoria(id);
    setCategoriaDescripcion(descripcion);
    setCategoriaExpanded(!categoriaExpanded);
  };

  const handleInitField = () => {
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setEstado(true);
    setEstadoDescripcion("");
    setIDCategoria(0);
    setCategoriaDescripcion("");
  };

  const handleSubmit = async () => {
    if (!nombre || !descripcion || !precio || !idCategoria) {
      Alert.alert(
        "Error",
        "Por favor asegurese de ingresar los campos solicitados."
      );
      return;
    }
    try {
      setLoading(true);
      const url = `${API_URL}api/producto`;
      await axios.post(url, {
        nombre: nombre,
        descripcion: descripcion,
        estado: estado ? 1 : 0,
        precio: precio,
        id_categoria: idCategoria,
      });
      Alert.alert("", "Producto Registrado.");
      handleInitField();
      inputNombre.current.focus();
    } catch (error) {
      Alert.alert("Error", "No se registró ningún producto.");
      handleInitField();
      setLoading(false);
    } finally {
      handleInitField();
      setLoading(false);
    }
  };

  return (
    <Provider>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputNombre}
              style={styles.input}
              placeholder="Nombre Producto"
              placeholderTextColor={"#455366"}
              value={nombre}
              onChangeText={setNombre}
              keyboardType="default"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              placeholderTextColor={"#455366"}
              value={descripcion}
              onChangeText={setDescripcion}
              keyboardType="default"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Precio"
              placeholderTextColor={"#455366"}
              value={precio}
              onChangeText={setPrecio}
              keyboardType="decimal-pad"
              autoCapitalize="none"
            />

            <List.Accordion
              title="Estado"
              expanded={estadoExpanded}
              onPress={() => setEstadoExpanded(!estadoExpanded)}
              style={styles.acordion}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={() => (
                    <AntDesign
                      name={estadoExpanded ? "upcircle" : "downcircle"}
                      size={24}
                      color="black"
                    />
                  )}
                />
              )}
            >
              <List.Item
                style={styles.item}
                onPress={() => handleEstado(true, "Disponible")}
                title="Disponible"
              />
              <List.Item
                style={styles.item}
                onPress={() => handleEstado(false, "No Disponible")}
                title="No Disponible"
              />
            </List.Accordion>
            <TextInput
              style={styles.inputAcordion}
              placeholder={`Estado: ${estadoDescripcion}`}
              placeholderTextColor={"#455366"}
              disabled
            />

            <List.Accordion
              title="Categoria"
              expanded={categoriaExpanded}
              onPress={() => setCategoriaExpanded(!categoriaExpanded)}
              style={styles.acordion}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={() => (
                    <AntDesign
                      name={categoriaExpanded ? "upcircle" : "downcircle"}
                      size={24}
                      color="black"
                    />
                  )}
                />
              )}
            >
              {optionsCategorias.map((option) => (
                <List.Item
                  style={styles.item}
                  key={option.id}
                  onPress={() => handleCategoria(option.id, option.descripcion)}
                  title={option.descripcion}
                />
              ))}
            </List.Accordion>
            <TextInput
              style={styles.inputAcordion}
              placeholder={`Categoria: ${categoriaDescripcion}`}
              placeholderTextColor={"#455366"}
              disabled
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonSalvar}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Guardar</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonDetalle}
              onPress={() => navigation.navigate("ListProducts")}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Detalle Items</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Provider>
  );
}
