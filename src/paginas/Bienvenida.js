import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function Bienvenida() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  const navigation = useNavigation();
  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5))),
      100
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))),
      300
    );

    //setTimeout(() => navigation.navigate("Inicio"), 2500);
  }, []);
  return (
    <View style={styles.contenedor}>
      <StatusBar style="ligth" />

      {/* logo: imagen con anillos */}
      <Animated.View style={[styles.anillo01, { padding: ring2padding }]}>
        <Animated.View style={[styles.anillo01, { padding: ring1padding }]}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>

      {/* título y remate */}
      <View style={styles.contTexto}>
        <Text style={styles.titulo}>Nicaragua</Text>
        <Text style={styles.subtitulo}>
          El corazón artístico de Centroamérica,{"\n"}
          ¡Simpre Linda!.
        </Text>
      </View>

      <View style={styles.botones}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Registro")}
          style={styles.btnRegistro}
        >
          <Text style={styles.txtReistro}>Registrarse</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ color: "rgba(255, 255, 255, 1)", fontWeight: "600" }}>
            ¿Ya tienes una cuenta?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("InicioSesion")}>
            <Text style={{ fontWeight: "600", color: "blue" }}>
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2.5 * (1 - 0) * 2.5,
    marginBottom: 2.5 * 0,
    backgroundColor: "#FFC107",
  },
  anillo01: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 9999,
  },
  anillo02: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 9999,
  },
  contTexto: {
    alignItems: "center",
    marginTop: 0.5,
    marginBottom: 0.5,
  },
  titulo: {
    fontSize: hp(7),
    fontWeight: "700",
    letterSpacing: 0.1,
    color: "rgba(255, 255, 255, 1)",
  },
  subtitulo: {
    fontSize: hp(2),
    fontWeight: "500",
    letterSpacing: 0.1,
    color: "rgba(255, 255, 255, 1)",
  },
  botones: {
    marginTop: 1,
    marginBottom: 0,
  },
  btnRegistro: {
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "white",
    marginLeft: 28,
    marginRight: 28,
    marginTop: 100,
    marginBottom: 13,
    borderRadius: 12,
  },
  txtReistro: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    textAlign: "center",
  },
});
