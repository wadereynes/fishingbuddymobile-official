import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { theme } from "../../constants";

const ShopCard = props => {
    return (
        <TouchableOpacity 
            onPress={props.onSelect}
            style={styles.smallContainer}
        >  
            <Image
                source={{ uri: props.shop.coverPhoto}}
                // source={require('../../assets/images/fish.png')}
                style={{
                    width: '100%',
                    height: 60,
                    resizeMode: 'center',

                }}
            />
            <Image
                source={{ uri: props.shop.profilePicture}}
                // source={require('../../assets/images/fish.png')}
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 23,
                    marginTop: -30,
                    resizeMode: 'center',

                }}
            />
            <View 
                style={{
                    flexDirection:"row",
                    paddingTop:5,
                    paddingHorizontal:10,
                    
                }}>
                    <Text 
                        style={{
                            fontFamily:"Bold",
                            fontSize:13,
                            textAlign:'center',
                        }}>{props.shop.firstName}
                    </Text>
            </View>
            <View
                style={{
                    backgroundColor: theme.colors.primary,
                    borderRadius: 15,
                    marginTop: 5,
                }}
            >
                <Text
                    style={{
                        fontFamily: 'Medium',
                        fontSize: 10,
                        color: theme.colors.white,
                        marginHorizontal: 10,
                        marginVertical: 5,
                    }}
                >
                    SHOP NOW
                </Text>
            </View>
        </TouchableOpacity>
    )
    
}

const styles = StyleSheet.create({
    smallContainer:{
        height:150,
        elevation:2,
        backgroundColor:theme.colors.white,
        marginLeft:10,
        marginTop:10,
        width:theme.dimensions.width * .35,
        justifyContent:'center',
        flex: 1,
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 20,
    }
});

export { ShopCard };