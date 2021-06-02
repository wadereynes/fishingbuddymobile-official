import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../constants';
import * as Icon from "@expo/vector-icons";
import { Header } from '../../components/common';
import Axios from 'axios';
import { CreatePost } from '../../components/profile/CreatePost';


export const CreatePostScreen = props => {
    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Header name={'Create Post'} fontSize={16} icon={'keyboard-backspace'} navigation={props.navigation}/>
                    {/* Posts */}
                    <ScrollView style={{ paddingHorizontal: 10 }}>
                        <CreatePost navigation={props.navigation} />
                    </ScrollView>
                    
            </View>
            
        </View>

    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'flex-start',
        backgroundColor:theme.colors.white
    },
    wrapper:{
        paddingHorizontal:10,
        marginTop:30,
    }
});