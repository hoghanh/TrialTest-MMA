import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import CardItem from "./CardItem";
import { Items, Categories } from "../db";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

const Home = ({ navigate }) => {
  const [list, setList] = useState([]);
  const [keys, setKeys] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    getDataFromDB("all");
  }, []);

  const getDataFromDB = async (category) => {
    let flowers = [];
    for (let index = 0; index < Items.length; index++) {
      if (category === "all" || Items[index].category === category)
        flowers.push(Items[index]);
    }
    setList(flowers);
    setCategory(category);
  };

  useFocusEffect(
    React.useCallback(() => {
      getFavorite();
    }, [])
  );

  const getFavorite = async () => {
    let newKeys = await AsyncStorage.getItem("favoriteList");
    newKeys = JSON.parse(newKeys);
    if (!newKeys) newKeys = [];
    setKeys(newKeys);
  };

  const renderItem = (item) => {
    return (
      <CardItem
        item={item}
        favorite={keys.includes(item.item.id)}
        setKeys={setKeys}
      />
    );
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
      }}
    >
      <ScrollView
        horizontal
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          style={
            category === "all"
              ? styles.categoryButtonActive
              : styles.categoryButton
          }
          onPress={() => {
            getDataFromDB("all");
          }}
        >
          <Text style={styles.categoryButtonText}>ALL</Text>
        </TouchableOpacity>
        {Categories.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={
                category === item
                  ? styles.categoryButtonActive
                  : styles.categoryButton
              }
              onPress={() => {
                getDataFromDB(item);
              }}
            >
              <Text style={styles.categoryButtonText}>
                {item.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        key={2}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 16,
    justifyContent: "center",
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#aaa",
    borderRadius: 4,
    marginHorizontal: 4,
    fontWeight: "100",
  },
  categoryButtonActive: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#19de7c",
    borderRadius: 4,
    marginHorizontal: 4,
    fontWeight: "100",
  },
  categoryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
