import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    Image,
    ToastAndroid,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import MyTabs from './MyTabs';

const ProductInfo = ({ route }) => {
    const { item, status } = route.params;

    const [like, setLike] = useState(status);

    useEffect(() => {
        setLike(status);
    }, [status]);

    const handleLike = async () => {
        try {
            ToastAndroid.show(
                !like ? 'Saved' : 'Unsaved',
                ToastAndroid.SHORT,
            );
            let favoriteList = await AsyncStorage.getItem("favoriteList");
            favoriteList = JSON.parse(favoriteList);
            if (!favoriteList) favoriteList = [];
            if (!like) {
                favoriteList.unshift(item.id);
                await AsyncStorage.setItem("favoriteList", JSON.stringify(favoriteList));
            } else {
                favoriteList = favoriteList.filter(favorite => favorite !== item.id);
                await AsyncStorage.setItem("favoriteList", JSON.stringify(favoriteList));
            }
            setLike(!like);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View
            style={ {
                width: '100%',
                height: '100%',
                backgroundColor: "white",
                position: 'relative',
            } }>
            <StatusBar
                backgroundColor={ "#ccc" }
                barStyle="dark-content"
            />
            <ScrollView>
                <View
                    style={ {
                        width: '100%',
                        backgroundColor: "#ccc",
                        borderRadius: 20,
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 4,
                    } }>
                    <View
                        style={ {
                            width: "100%",
                            height: 280,
                            alignItems: 'center',
                            justifyContent: 'center',
                        } }>
                        <Image
                            source={ { uri: item.image } }
                            style={ {
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain',
                            } }
                        />
                    </View>
                </View>
                <View
                    style={ {
                        paddingHorizontal: 16,
                        marginTop: 6,
                    } }>
                    <View
                        style={ {
                            flexDirection: 'row',
                            marginVertical: 4,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        } }>
                        <Text
                            style={ {
                                fontSize: 24,
                                fontWeight: '600',
                                letterSpacing: 0.5,
                                marginVertical: 4,
                                color: "black",
                                maxWidth: '84%',
                            } }>
                            { item.name }
                        </Text>

                        <TouchableOpacity onPress={ () => handleLike() }>
                            <View>
                                <AntDesign name="heart" size={ 30 } color={ like ? "#f52727" : "#ccc" } />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={ {
                        flexDirection: 'row',
                        marginVertical: 4,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    } }>
                        <Text
                            style={ {
                                fontSize: 20,
                                fontWeight: '500',
                                maxWidth: '85%',
                                color: "black",
                                marginBottom: 4,
                            } }>
                            ${ item.price }
                        </Text>
                        <Text
                            style={ {
                                fontSize: 16,
                                fontWeight: '300',
                                maxWidth: '85%',
                                color: "black",
                                marginBottom: 4,
                            } }>
                            Category: { item.category }
                        </Text>
                    </View>
                    <Text
                        style={ {
                            fontSize: 12,
                            color: "black",
                            fontWeight: '400',
                            letterSpacing: 1,
                            opacity: 0.5,
                            lineHeight: 20,
                            maxWidth: '100%',
                            maxHeight: 180,
                            marginBottom: 18,
                        } }>
                        { item.description }
                    </Text>

                </View>
            </ScrollView>
            <View
                style={ {
                    position: 'absolute',
                    bottom: 10,
                    height: '8%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                } }>
            </View>
        </View>
    );
};

export default ProductInfo;

