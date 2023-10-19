import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicio from "../paginas/Inicio";
import Bienvenida from "../paginas/Bienvenida";
import Registrarse from "../paginas/Registro";
import InicioSesion from "../paginas/InicioSesion";
import MiCarrito from "../paginas/MiCarrito";
import ProductInfo from "../paginas/ProductInfo";
import { UserProvider } from "./UserContext";

export default function AppNavegacion() {
  const Stack = createNativeStackNavigator();

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Bienvenida"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Inicio" component={Inicio} />
          <Stack.Screen name="Bienvenida" component={Bienvenida} />
          <Stack.Screen name="Registro" component={Registrarse} />
          <Stack.Screen name="InicioSesion" component={InicioSesion} />
          <Stack.Screen name="MiCarrito" component={MiCarrito} />
          <Stack.Screen name="ProductInfo" component={ProductInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
