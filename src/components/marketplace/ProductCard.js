import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { theme } from "../../constants";

const ProductCard = props => {
    
    return (
        <TouchableOpacity 
            onPress={()=>props.navigation.navigate('ProductDetail')}
            style={styles.smallContainer}
        > 
            <Image
                source={props.card.productImage}
                style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: 'center',
                }}
            />
            <View 
                style={{
                    flexDirection:"row",
                    paddingTop:10,
                    paddingHorizontal:10,
                }}>
                    <Text 
                        style={{
                            fontFamily:"Bold",
                            fontSize:theme.sizes.caption
                        }}>{props.card.productName}
                    </Text>
            </View>
            <Text style={{
                paddingHorizontal:10,
                fontFamily:"Medium",
                color:theme.colors.secondary,
                fontSize:theme.sizes.subcaption,
                paddingTop:3,
            }}>
                {props.card.productCategory}
            </Text>

            <Text style={{
                        fontFamily:"Bold",
                        fontSize:theme.sizes.caption,
                        color:theme.colors.primary,
                        paddingTop:10,
                        paddingLeft:10,
                        paddingBottom:10
                    }}>₱{props.card.productPrice}
            </Text>
        </TouchableOpacity>
    )
    
}

const styles = StyleSheet.create({
    smallContainer:{
        height:220,
        elevation:2,
        backgroundColor:theme.colors.white,
        marginLeft:10,
        marginTop:10,
        width:theme.dimensions.width * .47,
    }
});

export { ProductCard };