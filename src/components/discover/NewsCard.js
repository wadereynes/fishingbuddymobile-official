import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { theme } from '../../constants';
import * as Linking from 'expo-linking';


export const NewsCard = props => {
    const _handlePress = () => {
        Linking.openURL(props.news.newsSource);
        props.onPress && props.onPress();
    };

    return(
        <TouchableOpacity 
            style={{
                flexDirection:"row",
                height:60,
                width:theme.dimensions.width,
                backgroundColor:"#fff",
                padding:6,
                marginVertical:5,
                marginLeft:2,
                borderRadius:10
            }}
            onPress={_handlePress}
        > 
            <View>
                <Image
                    source={{ uri: props.news.newsImage }}
                    style={{
                        height:60,
                        width:100,
                        borderRadius:10
                    }}
                />
            </View>

            <View style={{
                width:"65%",
                justifyContent:"flex-end",
                paddingHorizontal:10,
                height:"100%"
            }}>
                <Text style={{
                    fontSize:13,
                    fontFamily:"Medium",

                }}>
                    { props.news.newsTitle }
                </Text>

            </View>
        </TouchableOpacity>
    )
}