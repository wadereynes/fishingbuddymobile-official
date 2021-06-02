import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground, Platform, Dimensions, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Icon from "@expo/vector-icons";

import { theme } from "../../constants";

export const Header = props => {
    return(
        <View style={{ ...styles.row }}>
            <TouchableOpacity style={styles.smallButton} onPress={()=> props.navigation.goBack()}>
                <Icon.MaterialCommunityIcons style={styles.headerIcon} name={props.icon} size={16} color={theme.colors.primary} />
            </TouchableOpacity>
            <Text style={{...styles.title, fontSize: props.fontSize }}>{props.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        marginBottom:10,
    },
    smallButton: {
        alignItems:"center",
        justifyContent:'center',
        padding:10,
        flexDirection:'row',
        backgroundColor:theme.colors.gray4,
        borderRadius:23,
        shadowColor: 'black',
        shadowOpacity: 0.19,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 10,
        elevation: 3,
    },
    title:{
        fontFamily:'Bold',
        marginLeft:10,
        marginTop:10,
    },
});