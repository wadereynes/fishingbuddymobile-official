import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { theme } from '../../constants';

export const DiscoverCard = props => {
    return(
        <TouchableOpacity 
            onPress={props.onPress}
            style={{
                marginTop:10,
                backgroundColor:theme.colors.white,
                width:200,
                borderRadius:10,
                padding:15,
                marginRight:0,
                marginLeft:2,
                marginBottom:5
            }}
        >
            <Image
                source={props.src}
                style={{
                    width:170,
                    height:200,
                    borderRadius:10
                }}
            />
            <View style={{
                flexDirection:"row",
                alignItems:"center",
                marginVertical:10
            }}>
                <Text style={{
                    fontFamily:"Bold",
                    color:"#4f4a4a",
                    fontSize:14
                }}>
                    {props.name}
                </Text>

            </View>
            <Text style={{
                fontSize:12,
                color:"#4f4a4a",
                fontFamily:"Regular"
            }}>
                { props.description }
            </Text>
        </TouchableOpacity>
    );
}