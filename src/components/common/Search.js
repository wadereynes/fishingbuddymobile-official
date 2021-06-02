import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, Platform } from 'react-native';
import { TextInput, ScrollView,TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from "../../constants";

const Search = ({navigation, search}) => {
    return (
        <View style={styles.container}>
            <LinearGradient
            colors={["rgba(0,93,160,0.3)", "transparent"]}
            style={styles.gradient}
            />
            <View style={styles.searchField}>
                <TextInput
                    placeholder="Search"
                    placeholderTextColor={theme.colors.primary}
                    style={styles.textInput}
                />
                <Image
                    source={require('../../assets/images/search.png')}
                    style={styles.image}
                />
                <TouchableOpacity >
                    <Text style={styles.filter}>FILTERS</Text>
                </TouchableOpacity>
            </View>
                
            
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 30,
    },
    searchField:{
        backgroundColor: theme.colors.white,
        paddingVertical:7,
        paddingHorizontal:10,
        marginHorizontal:20,
        borderRadius:15,
        flexDirection:"row",
        alignItems:'flex-start',
        shadowColor: theme.colors.gray,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation:2,
        width:theme.dimensions.width * 0.75,
        marginLeft:10
    },
    image: {
        height:20,
        width:20,
        position:'absolute',
        right:0,
        marginRight:15,
        marginTop:10
    },
    textInput: {
        fontFamily:"Medium",
        fontSize:16,
        width:250
    },
    gradient: {
        left:0,
        right:0,
        height:40,
        marginTop:-22
    },
    filter: {
        fontFamily:'Medium',
        fontSize:theme.sizes.caption,
        color:theme.colors.accent2,
        marginRight:10,
        marginLeft:60,
        marginTop:5,
    }
})

export { Search };