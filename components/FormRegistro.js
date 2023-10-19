import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { InputRegistro } from "./CustomInput";

export function FormRegistro() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  function handleRegistro() {}

  return (
    <View
      style={styles.container}
    >
      <InputRegistro text="Nombre Completo" placeholder="Ingresa tu Nombre" />
      <InputRegistro
        text="Correo Electronico"
        placeholder="Ingresa Correo Electronico"
      />
      <InputRegistro text="Contraseña" placeholder="Ingresa Contraseña" />
    </View>
  );
}

const styles = StyleSheet.create({
 container:{
    width: 350,
    marginTop: 0.5 * (1 - 0) * 8,
    marginBottom: 0.5 * 0 * 8,
  }
});
