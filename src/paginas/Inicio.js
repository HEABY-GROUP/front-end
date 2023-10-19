import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Bars3Icon } from "react-native-heroicons/solid";
import Menu from "./Menu";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { themeColors } from "../theme";
import { COLOURS, Items } from "../database/Database";

export default function Inicio() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState("");
  const [barro, setBarro] = useState([]);
  const [pintura, setPintura] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  const getDataFromDB = () => {
    let barroList = [];
    let pinturaList = [];
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].category == "barro") {
        barroList.push(Items[index]);
      } else if (Items[index].category == "pinturas") {
        pinturaList.push(Items[index]);
      }
    }

    setBarro(barroList);
    setPintura(pinturaList);
  };
  const BarroPost = ({ data }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductInfo", { productID: data.id })
        }
        style={{
          width: "48%",
          marginVertical: 14,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 100,
            borderRadius: 10,
            backgroundColor: themeColors.bg,
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          {data.isOff ? (
            <View
              style={{
                position: "absolute",
                width: "20%",
                height: "24%",
                backgroundColor: COLOURS.green,
                top: 0,
                left: 0,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.white,
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                {data.offPercentage}%
              </Text>
            </View>
          ) : null}
          <Image
            source={data.productImage}
            style={{
              width: "100%",
              height: "90%",
              resizeMode: "contain",
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 12,
            color: COLOURS.black,
            fontWeight: "600",
            marginBottom: 2,
          }}
        >
          {data.productName}
        </Text>
        {data.category == "accessory" ? (
          data.isAvailable ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLOURS.green,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.green,
                }}
              >
                Available
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLOURS.red,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.red,
                }}
              >
                Unavailable
              </Text>
            </View>
          )
        ) : null}
        <Text>C$ {data.productPrice}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
      }}
    >
      <StatusBar backgroundColor={themeColors.bg} barStyle="dark-content" />
      <View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 16,
            marginTop: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => setMenuVisible(true)}
            style={{
              fontSize: 18,
              color: COLOURS.backgroundMedium,
              padding: 12,
              borderRadius: 10,
              backgroundColor: COLOURS.backgroundLight,
            }}
          >
            <Bars3Icon size="20" color="black" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Entypo
              name="shopping-bag"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                backgroundColor: COLOURS.backgroundLight,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("MiCarrito")}>
            <MaterialCommunityIcons
              name="cart"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLOURS.backgroundLight,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom: 10,
            padding: 16,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              color: themeColors.bg,
              fontWeight: "500",
              letterSpacing: 1,
            }}
          >
            Artisan-Nic
          </Text>
          <Text
            style={{
              fontSize: 26,
              color: COLOURS.black,
              fontWeight: "500",
              letterSpacing: 1,
              marginBottom: 10,
            }}
          >
            Tienda de Nicaragua con alta fidelidad
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.black,
              fontWeight: "400",
              letterSpacing: 1,
              lineHeight: 24,
            }}
          >
            Tienda de pura Cultura
            {"\n"}Esta tienda ofrece productos auténticos y de origen
            nicaragüense.
          </Text>
        </View>
        <View
          style={{
            padding: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  fontWeight: "500",
                  letterSpacing: 1,
                }}
              >
                Barros
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLOURS.black,
                  fontWeight: "400",
                  opacity: 0.5,
                  marginLeft: 10,
                }}
              >
                41
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.blue,
                fontWeight: "400",
              }}
            >
              Ver Todo
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {barro.map((data) => {
              return <BarroPost data={data} key={data.id} />;
            })}
          </View>
        </View>

        <View
          style={{
            padding: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  fontWeight: "500",
                  letterSpacing: 1,
                }}
              >
                Pinturas
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLOURS.black,
                  fontWeight: "400",
                  opacity: 0.5,
                  marginLeft: 10,
                }}
              >
                78
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.blue,
                fontWeight: "400",
              }}
            >
              Ver Todo
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {pintura.map((data) => {
              return <BarroPost data={data} key={data.id} />;
            })}
          </View>
        </View>
      </View>
      {menuVisible && <Menu onClose={() => setMenuVisible(false)} />}
    </ScrollView>
  );
}
