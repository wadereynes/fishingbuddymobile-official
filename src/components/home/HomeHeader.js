import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Platform, Dimensions, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Icon from "@expo/vector-icons";

import { theme } from "../../constants";
import { firebase } from '../../config/firebase';


export const HomeHeader = props => {    
    const [greeting, setGreeting] = useState('Hapon');
    
    return (
        <View style={{...styles.header}}>
            <TouchableOpacity style={styles.drawerButton} onPress={() => props.navigation.toggleDrawer()}>
                {/* <Icon.Foundation style={{ height:20, width:20, marginRight:5 }} name={'list'} size={18} color={theme.colors.white} /> */}
            </TouchableOpacity>
            
            <View style={styles.headerContents}>
                <View style={{width:"50%"}}>
                    <Text style={styles.headerGreeting}>Maayong {greeting} </Text>

                    { props.user ? <Text style={styles.headerName}>{props.user.firstName}</Text> : <Text style={styles.headerName}>{user.firstName}</Text>}
                    
                </View>
                <View style={{width:"50%",alignItems:"flex-end"}}>
                    <TouchableOpacity
                        onPress={()=>props.navigation.navigate('Profile')}>
                        { props.user ? <Image source={{ uri: props.user.profilePicture}} style={styles.headerAvatar} /> : <Image source={require('../../assets/images/avatar.png')} style={styles.headerAvatar} /> }
                        
                    </TouchableOpacity>
                    
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
    header:{
        backgroundColor: theme.colors.primary,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        paddingHorizontal:20,
        paddingTop: 10,
    },
    headerContents: {
        flexDirection:"row",
        alignItems:"center",
        marginBottom:10,
        width:"100%"
    },
    headerGreeting: {
        fontSize:theme.sizes.title,
        color: theme.colors.white,
        fontFamily:"Bold",
    },
    headerName: {
        fontSize:theme.sizes.h1,
        color: theme.colors.white,
        fontFamily:"Bold",
    },
    headerAvatar: {
        height:60,
        width:60,
        borderColor:theme.colors.white,
        borderWidth:2,
        borderRadius:60
    },
    drawerButton: {
        height:10,
        width:20,
        marginTop:20
    },
    location: {
        fontFamily:"Medium",
        fontSize:theme.sizes.body,
        color:theme.colors.white,
        alignSelf:"center"
    }
});