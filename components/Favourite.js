import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Items } from "../db";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const Item = ({ item, handleDelete }) => {
  const navigation = useNavigation();

  const handleConfirmation = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete this flower?",
      [
        {
          text: "NO",
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => {
            handleDelete(item.id);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Details", { item, status: true })}
    >
      <View style={styles.cardContainer}>
        <View style={styles.leftContent}>
          <Image
            source={{ uri: item.image }}
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
        <Text style={styles.itemText}>{item.price}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleConfirmation()}
        >
          <Entypo name="trash" size={24} color="#d13f3f" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const Favourite = ({ navigation: { navigate } }) => {
  const [list, setList] = useState([]);
  const [keys, setKeys] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      getFavorite();
    }, [])
  );

  const handleDelete = async (id) => {
    const newList = list.filter((favorite) => favorite.id !== id);
    setList(newList);
    const newKeys = keys.filter((key) => key !== id);
    setKeys(newKeys);
    await AsyncStorage.setItem("favoriteList", JSON.stringify(newKeys));
  };

  const handleDeleteAll = async () => {
    await AsyncStorage.clear();
    setKeys([]);
    setList([]);
  };

  const getFavorite = async () => {
    let keys = await AsyncStorage.getItem("favoriteList");
    keys = JSON.parse(keys);
    if (!keys) keys = [];
    setKeys(keys);
    const favoriteList = keys.map((key) => {
      return Items.find((item) => item.id === key);
    });
    setList(favoriteList);
  };

  if (list.length === 0) {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Text>Have no favorite</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    return <Item item={item} handleDelete={handleDelete} />;
  };

  const handleConfirmation = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete all flowers?",
      [
        {
          text: "NO",
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => {
            handleDeleteAll();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={{ paddingVertical: 20, paddingHorizontal: 100 }}>
          <Button
            title="DELETE ALL"
            onPress={handleConfirmation}
            color="#d13f3f"
          />
        </View>
        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  cardContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#ccc",
    backgroundColor: "#eee",
    alignItems: "center",
    marginTop: 10,
    elevation: 6,
    shadowColor: "rgba(93, 10, 10, 0.9)",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 2,
    shadowRadius: 4,
  },
  itemText: {
    color: "#333",
    fontSize: 16,
  },
  logo: {
    height: 80,
    width: 120,
    marginRight: 12,
    borderRadius: 4,
  },
  leftContent: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 12,
  },
  textDelete: {
    color: "#fff",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff", // Customize your footer background color
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#ccc", // Customize your border color
  },
  navItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconNavItem: {
    color: "#666",
  },
});
