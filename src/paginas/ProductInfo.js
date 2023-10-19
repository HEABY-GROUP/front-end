import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Animated,
  ToastAndroid,
} from "react-native";
import { COLOURS, Items } from "../database/Database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

const ProductInfo = ({ route }) => {
  const navigation = useNavigation();
  const { productID } = route.params;

  const [product, setProduct] = useState({});
  const width = Dimensions.get("window").width;

  const scrollX = new Animated.Value(0);

  let position = Animated.divide(scrollX, width);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  const getDataFromDB = async () => {
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].id == productID) {
        await setProduct(Items[index]);
        return;
      }
    }
  };

  const addToCart = async (id) => {
    let itemArray = await AsyncStorage.getItem("cartItems");
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);

      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show(
          "Artículo agregado exitosamente al carrito",
          ToastAndroid.SHORT
        );
        navigation.navigate("Inicio");
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show(
          "Artículo agregado exitosamente al carrito",
          ToastAndroid.SHORT
        );
        navigation.navigate("Inicio");
      } catch (error) {
        return error;
      }
    }
  };

  const renderProduct = ({ item, index }) => {
    return (
      <View
        style={{
          width: width,
          height: 240,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={item}
          style={{
            borderRadius: 20,
            width: "80%",
            height: "90%",
            resizeMode: "contain",
          }}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        top: 37,
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
        position: "relative",
      }}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <View
          style={{
            width: "100%",
            backgroundColor: COLOURS.backgroundLight,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 16,
              paddingLeft: 16,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack("Inicio")}
              style={{
                backgroundColor: themeColors.bg,
                padding: 8,
                borderTopRightRadius: 16,
                borderBottomLeftRadius: 16,
              }}
            >
              <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={product.productImageList ? product.productImageList : null}
            horizontal
            renderItem={renderProduct}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapToInterval={width}
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              marginTop: 32,
            }}
          >
            {product.productImageList
              ? product.productImageList.map((data, index) => {
                  let opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: "clamp",
                  });
                  return (
                    <Animated.View
                      key={index}
                      style={{
                        width: "16%",
                        height: 2.4,
                        backgroundColor: COLOURS.black,
                        opacity,
                        marginHorizontal: 4,
                        borderRadius: 100,
                      }}
                    ></Animated.View>
                  );
                })
              : null}
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 6,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 14,
            }}
          >
            <Entypo
              name="shopping-cart"
              style={{
                fontSize: 18,
                color: themeColors.bg,
                marginRight: 6,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: COLOURS.black,
              }}
            >
              Compras
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 4,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "600",
                letterSpacing: 0.5,
                marginVertical: 4,
                color: COLOURS.black,
                maxWidth: "84%",
              }}
            >
              {product.productName}
            </Text>
            <Ionicons
              name="link-outline"
              style={{
                fontSize: 24,
                color: themeColors.bg,
                backgroundColor: COLOURS.backgroundLight,
                padding: 8,
                borderRadius: 100,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 12,
              color: COLOURS.black,
              fontWeight: "400",
              letterSpacing: 1,
              opacity: 0.5,
              lineHeight: 20,
              maxWidth: "85%",
              maxHeight: 44,
              marginBottom: 18,
            }}
          >
            {product.description}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 14,
              borderBottomColor: COLOURS.backgroundLight,
              borderBottomWidth: 1,
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "80%",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  color: COLOURS.blue,
                  backgroundColor: COLOURS.backgroundLight,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 12,
                  borderRadius: 100,
                  marginRight: 10,
                }}
              >
                <Entypo
                  name="location-pin"
                  style={{
                    fontSize: 16,
                    color: themeColors.bg,
                  }}
                />
              </View>
              <Text>Km 10 carretera Masaya,{"\n"}Distrito I, Managua</Text>
            </View>
            <Entypo
              name="chevron-right"
              style={{
                fontSize: 22,
                color: COLOURS.backgroundDark,
              }}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                maxWidth: "85%",
                color: COLOURS.black,
                marginBottom: 4,
              }}
            >
              C$ {product.productPrice}.00
            </Text>
            <Text>
              Tasa de impuesto 2%~ C${product.productPrice / 20} (C$;
              {product.productPrice + product.productPrice / 20})
            </Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 10,
          height: "8%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => (product.isAvailable ? addToCart(product.id) : null)}
          style={{
            bottom: 40,
            width: "86%",
            height: "90%",
            backgroundColor: themeColors.bg,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "500",
              letterSpacing: 1,
              color: COLOURS.white,
              textTransform: "uppercase",
            }}
          >
            {product.isAvailable ? "Añadir al carrito" : "No disponible"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductInfo;
