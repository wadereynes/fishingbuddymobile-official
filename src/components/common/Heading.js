import React from 'react'
import { View, Text, Image, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'

import { theme } from "../../constants";

import Button from "./Button";

const Heading = ({heading}) => {
    return (
        <View style={{width:"50%"}}>
            <Text style={{
                fontFamily:"Bold",
                fontSize:theme.sizes.header,
                color:theme.colors.gray3,
                paddingBottom:5
            }}>
                {heading.headingTitle}
            </Text>
            <View style={{
                height:4,
                backgroundColor:theme.colors.accent2,
                width:115,
                marginTop:-5
            }}>
            </View>
        </View>
    )
}
export { Heading };