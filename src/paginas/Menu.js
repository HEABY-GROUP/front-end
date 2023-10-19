import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
  Platform,
  Animated,
  Easing,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../navegacion/UserContext";
function Menu({ onClose }) {
  const { correo, setCorreo } = useUser();
  const { setContrasena } = useUser();
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState(null);

  AsyncStorage.setItem("sesionIniciada", "true");
  const [animation] = useState(new Animated.Value(0));

  const slideIn = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: false,
    }).start(() => {
      onClose();
    });
  };

  useEffect(() => {
    slideIn();
  }, []);

  useEffect(() => {
    if (Platform.OS === "android") {
      const backAction = () => {
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", backAction);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
      };
    }
  }, []);

  useEffect(() => {
    async function cargarUsuario() {
      try {
        const usuariosJSON = await AsyncStorage.getItem("usuarios");
        if (usuariosJSON) {
          const usuarios = JSON.parse(usuariosJSON);
          const usuarioEncontrado = usuarios.find((u) => u.correo === correo);

          if (usuarioEncontrado) {
            setUsuario(usuarioEncontrado);
          } else {
            console.log(
              "No se encontró un usuario con el correo proporcionado."
            );
          }
        } else {
          console.log("No hay usuarios registrados.");
        }
      } catch (error) {
        console.error("Error al obtener datos de usuarios:", error);
      }
    }
    cargarUsuario();
  }, [correo]);

  const handleCerrarSesion = async () => {
    await AsyncStorage.removeItem("sesionIniciada");
    console.log("Cierre de sesión exitoso");
    setCorreo("");
    setContrasena("");
    navigation.navigate("InicioSesion");
  };

  const handleBorrar = async () => {
    AsyncStorage.removeItem("usuarios")
      .then(() => {
        console.log("Datos eliminados correctamente");
      })
      .catch((error) => {
        console.error("Error al eliminar datos:", error);
      });
  };
  return (
    <Animated.View
      style={{
        height: "100%",
        position: "absolute",
        left: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [-250, 0],
        }),
        backgroundColor: "white",
        zIndex: 999,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
      }}
    >
      {usuario ? (
        <View style={{ margin: 20, marginTop: 50 }}>
          <Text>Nombre: {usuario.nombre}</Text>
          <Text>Correo: {usuario.correo}</Text>
        </View>
      ) : (
        <Text>No se encontró un usuario con el correo proporcionado.</Text>
      )}
      <TouchableOpacity
        style={{
          width: 50,
          margin: 20,
          backgroundColor: "#FFC107",
          borderRadius: 12,
        }}
        onPress={handleBorrar}
      >
        <Text
          style={{
            fontSize: 10,
            lineHeight: 28,
            fontWeight: "700",
            textAlign: "center",
            color: "rgba(55, 65, 81, 1)",
          }}
        >
          Borrar
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 80,
          margin: 20,
          padding: 0,
          backgroundColor: "#FFC107",
          borderRadius: 12,
        }}
        onPress={handleCerrarSesion}
      >
        <Text
          style={{
            fontSize: 10,
            lineHeight: 28,
            fontWeight: "700",
            textAlign: "center",
            color: "rgba(55, 65, 81, 1)",
          }}
        >
          Cerrar sesion
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={slideOut}
        style={{
          width: 80,
          margin: 20,
          padding: 0,
          backgroundColor: "#FFC107",
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            fontSize: 10,
            lineHeight: 28,
            fontWeight: "700",
            textAlign: "center",
            color: "rgba(55, 65, 81, 1)",
          }}
        >
          Cerrar Menú
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({});

export default Menu;
