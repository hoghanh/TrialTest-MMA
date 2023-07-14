import React, { useEffect, useState } from 'react';
import {
    Image,
    ToastAndroid,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardItem = ({ item: { item }, favorite, setKeys }) => {
    const [like, setLike] = useState(favorite);

    const navigation = useNavigation();

    useEffect(() => {
        if (like !== favorite)
            setLike(favorite);
    }, [favorite]);

    const handleLike = async () => {
        try {
            ToastAndroid.show(
                !like ? 'Saved' : 'Unsaved',
                ToastAndroid.SHORT,
            );

            let favoriteList = await AsyncStorage.getItem("favoriteList");
            favoriteList = JSON.parse(favoriteList);
            if (!favoriteList)
                favoriteList = [];

            if (!like) {
                favoriteList.unshift(item.id);
                await AsyncStorage.setItem("favoriteList", JSON.stringify(favoriteList));
                setKeys(favoriteList);
            } else {
                favoriteList = favoriteList.filter(favorite => favorite !== item.id);
                await AsyncStorage.setItem("favoriteList", JSON.stringify(favoriteList));
                setKeys(favoriteList);
            }
            setLike(!like);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TouchableOpacity
            onPress={ () => navigation.navigate('Details', { item, status: like }) }
            style={ {
                width: "46%",
                marginVertical: 12,
                marginHorizontal: "2%"
            } }>
            <View
                style={ {
                    width: '100%',
                    height: 100,
                    borderRadius: 2,
                    backgroundColor: "#F0F0F3",
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 8,
                } }>

                <Image
                    source={ { uri: item.image } }
                    style={ {
                        width: '80%',
                        height: '80%',
                        resizeMode: 'contain',
                    } }
                />
            </View>
            <View style={ {
                display: "flex",
                justifyContent: 'space-between',
                alignItems: "center",
                flexDirection: "row"
            } }>
                <View style={ {
                    maxWidth: 100
                } }>
                    <Text
                        style={ {
                            fontSize: 12,
                            color: "#333",
                            fontWeight: '600',
                            marginBottom: 2,
                        } }
                        numberOfLines={ 1 }
                        ellipsizeMode="tail"
                    >
                        { item.name }
                    </Text>
                    <Text>$ { item.price }</Text>
                </View>

                <TouchableOpacity onPress={ () => handleLike() }>
                    <View>
                        <Text style={ {
                            display: 'flex',
                            borderWidth: 1,
                            borderColor: "#ccc",
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 16,
                            lineHeight: 32,
                            borderRadius: 2,
                            backgroundColor: like ? "pink" : "#ccc"
                        } }>
                            { like ? "Liked" : "Like" }
                        </Text>
                    </View>
                </TouchableOpacity>
            </View >
        </TouchableOpacity >
    )
}

export default CardItem;