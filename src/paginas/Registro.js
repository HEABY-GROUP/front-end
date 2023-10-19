import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormRegistro } from "../../components/FormRegistro";

export default function Registrarse() {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleRegistro = async () => {
    const nuevoUsuario = {
      nombre,
      correo,
      contrasena,
    };
    try {
      const usuariosJSON = await AsyncStorage.getItem("usuarios");
      const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
      usuarios.push(nuevoUsuario);
      await AsyncStorage.setItem("usuarios", JSON.stringify(usuarios));
      ToastAndroid.show("Usuario agregado exitosamente", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Error al registrar el usuario", ToastAndroid.SHORT);
    }
    setNombre("");
    setCorreo("");
    setContrasena("");
    AsyncStorage.getItem("usuarios")
      .then((usuariosJSON) => {
        if (usuariosJSON) {
          const usuarios = JSON.parse(usuariosJSON);
          console.log("Lista de usuarios:", usuarios);
        } else {
          console.log("No hay usuarios registrados.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
    navigation.navigate("InicioSesion");
  };

  let isWideScreen = false;
  const windowWidth = Dimensions.get("window").width;
  if (windowWidth > 550) {
    isWideScreen = true;
  }

  const { maxWidth, maxHeight } = useWindowDimensions;
  // ejemplo: width: maxWidth > 500 ? 100 : 200
  const spaceYReverse = 0;
  return (
    <View
      style={[
        styles.contenedor,
        { backgroundColor: themeColors.bg },
        isWideScreen && styles.rowLayout,
      ]}
    >
      {!isWideScreen ? (
        <SafeAreaView
          style={{
            marginBottom: 20,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                backgroundColor: "rgba(255, 255, 255, 1)",
                padding: 8,
                borderTopRightRadius: 16,
                borderBottomLeftRadius: 16,
                marginLeft: 16,
              }}
            >
              <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/images/logo.png")}
              style={{ width: 200, height: 200 }}
            />
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView
          style={{
            marginBottom: 20,
            marginTop: 35,
            borderTopLeftRadius: 50,
            borderBottomLeftRadius: 50,
            width: 500,
            height: 550,
            backgroundColor: "rgba(255, 255, 255, 1)",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 20,
          }}
        >
          <Image
            source={require("../../assets/images/form01.jpg")}
            style={{
              width: "100%",
              height: "100%",
              borderTopLeftRadius: 50,
              borderBottomLeftRadius: 50,
            }}
          ></Image>
          <View
            style={{
              position: "absolute",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              width: "100%",
              height: "100%",
              borderTopLeftRadius: 50,
              borderBottomLeftRadius: 50,
            }}
          />
          <View
            style={{
              position: "absolute",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                borderTopLeftRadius: 50,
                backgroundColor: "black",
                padding: 20,
              }}
            >
              <ArrowLeftIcon size="20" color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(255, 255, 255, 1)",
          paddingLeft: 32,
          paddingRight: 32,
          paddingTop: 32,
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 1)",
          ...(isWideScreen
            ? {
                flex: 0.5,
                borderBottomRightRadius: 50,
                borderTopLeftRadius: 0,
                height: 550,
                marginTop: 35,
                shadowColor: "black",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 20,
              }
            : {}),
        }}
      >
     <FormRegistro/>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <TouchableOpacity style={styles.icon}>
            <Image
              source={require("../../assets/icons/google.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Image
              source={require("../../assets/icons/apple.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Image
              source={require("../../assets/icons/facebook.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 28,
          }}
        >
          <Text>¿Ya tienes una cuenta?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("InicioSesion")}
            style={{ color: "rgba(107, 114, 128,1)", fontWeight: "600" }}
          >
            <Text style={{ fontWeight: "600", color: "blue" }}>
              {" "}
              Iniciar sesion
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  TextForm: {
    color: "rgba(55, 65, 81,1)",
    marginLeft: 16,
    marginBottom: 8,
  },
  InputForm: {
    padding: 16,
    width: "100%",
    backgroundColor: "rgba(243, 244, 246, 1)",
    color: "rgba(55, 65, 81,1)",
    borderRadius: 16,
    marginBottom: 12,
  },
  icon: {
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    backgroundColor: "rgba(243, 244, 246, 1)",
    borderRadius: 16,
  },
  iconImage: {
    width: 40,
    height: 40,
  },
  rowLayout: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
