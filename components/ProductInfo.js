import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import MyTabs from "./MyTabs";

const ProductInfo = ({ route }) => {
  const { item, status } = route.params;

  const [like, setLike] = useState(status);

  useEffect(() => {
    setLike(status);
  }, [status]);

  const handleLike = async () => {
    try {
      ToastAndroid.show(!like ? "Saved" : "Unsaved", ToastAndroid.SHORT);
      let favoriteList = await AsyncStorage.getItem("favoriteList");
      favoriteList = JSON.parse(favoriteList);
      if (!favoriteList) favoriteList = [];
      if (!like) {
        favoriteList.unshift(item.id);
        await AsyncStorage.setItem(
          "favoriteList",
          JSON.stringify(favoriteList)
        );
      } else {
        favoriteList = favoriteList.filter((favorite) => favorite !== item.id);
        await AsyncStorage.setItem(
          "favoriteList",
          JSON.stringify(favoriteList)
        );
      }
      setLike(!like);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <StatusBar backgroundColor={"#ccc"} barStyle="dark-content" />
      <ScrollView>
        <View
          style={{
            backgroundColor: "#ccc",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
            overflow: "hidden",
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{
              width: "100%",
              height: 300,
              resizeMode: "cover",
            }}
          />
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
                marginVertical: 2,
                color: "black",
                maxWidth: "84%",
              }}
            >
              {item.name}
            </Text>

            <TouchableOpacity onPress={() => handleLike()}>
              <View>
                <Ionicons
                  name="heart"
                  size={30}
                  color={like ? "red" : "black"}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "col",
              marginVertical: 2,
              alignItems: "left",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                color: "green",
                marginBottom: 4,
              }}
            >
              $ {item.price}
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: "black",
                marginBottom: 4,
              }}
            >
              {item.rating} / 5.0{" "}
              <Ionicons name="ios-star" size={16} color="black"></Ionicons>{" "}
              {item.isTopOfTheWeek ? (
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "400",
                    color: "white",
                    backgroundColor: "red",
                  }}
                >
                  {"  "}
                  TOP OF THE WEEK{"  "}
                </Text>
              ) : null}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: "black",
                marginBottom: 4,
              }}
            >
              Category: {item.category}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: "black",
                marginBottom: 4,
              }}
            >
              Color: {item.color}{" "}
              <Ionicons name="ios-square" size={16} color={item.color} />
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: "black",
                marginBottom: 4,
              }}
            >
              Weight: {item.weight}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: "black",
                marginBottom: 4,
              }}
            >
              Origin: {item.origin}
            </Text>
            {item.bonus !== "no" && item.bonus !== "No" ? (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "black",
                  marginBottom: 4,
                }}
              >
                Note: {item.bonus}
              </Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductInfo;
