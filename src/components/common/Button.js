import React from 'react'
import { View, Text, Image, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'

import { theme } from "../../constants";

const Button = props => {
    return (
        <TouchableOpacity 
            onPress={()=>props.onPress}
        >
            <View style={{
                backgroundColor:theme.colors.primary,
                paddingHorizontal:20,
                paddingVertical:5,
                borderRadius:15,
            }}>
                <Text style={{
                    fontFamily:"Bold",
                    fontSize:13,
                    color: theme.colors.white
                }}>{props.button.buttonName}</Text>
            </View>
        </TouchableOpacity>
    )
}

export { Button };