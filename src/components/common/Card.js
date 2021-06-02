import React from 'react';
import { View, Text, Image, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from "../../constants";

const Card = ({navigation, card, type}) => {
    if (type==='large'){
        return (
            <View>
                <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{height:230}}
                >
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate("Detail")}
                        style={{
                            height:100,
                            elevation:3,
                            backgroundColor:theme.colors.white,
                            marginLeft:20,
                            marginTop:20,
                            borderRadius:15,
                            marginBottom:10,
                            width:theme.dimensions.width*0.91,
                            shadowColor: theme.colors.gray,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                            elevation: 2,
                        }}
                    >
                        <View 
                            style={{
                                flexDirection:"row",
                                paddingTop:10,
                                paddingHorizontal:10,
                            }}>
                                <Text 
                                    style={{
                                        fontWeight:"bold"
                                    }}>{card.productName}
                                </Text>
                                <Text style={{
                                    fontWeight:"bold",
                                    color:theme.colors.primary,
                                    paddingTop:10,
                                    paddingRight:10,
                                    position:'absolute',
                                    right:0
                                    
                                }}>₱{card.productPrice}
                                </Text>
            
                        </View>
                        <Text style={{
                            paddingHorizontal:10,
                            fontWeight:"bold",
                            color:theme.colors.secondary,
                            paddingTop:3
                        }}>
                            {card.productCategory}
                        </Text>
                    </TouchableOpacity>
                    
                </ScrollView>   
            </View>
        )
    }
    else if(type==='xsmall'){
        return (
            <TouchableOpacity 
                onPress={()=>navigation.navigate("Login")}
                style={styles.extraSmallCardContainer}
            > 
                <Image
                    source={card.productImage}
                    style={styles.extraSmallCardImage}
                />
                <View 
                    style={{
                        flexDirection:"row",
                        paddingHorizontal:10,
                    }}>
                        <Text 
                            style={{
                                fontFamily:"Bold",
                                fontSize:theme.sizes.category
                            }}>{card.productCategory}
                        </Text>
                </View>
            
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    smallContainer:{
        height:220,
        elevation:2,
        backgroundColor:theme.colors.white,
        marginLeft:20,
        marginTop:20,
        borderRadius:15,
        marginBottom:10,
        width:theme.dimensions.width * .42,
        shadowColor: theme.colors.gray,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    extraSmallCardContainer: {
        height:60,
        width:60,
        elevation:2,
        backgroundColor:theme.colors.white,
        marginLeft:5,
        borderRadius:15,
        marginBottom:10,
        alignItems:'center',
        alignContent:'center'
    },
    extraSmallCardImage: {
        padding:10,
        marginTop: 10
    }
});

export { Card };