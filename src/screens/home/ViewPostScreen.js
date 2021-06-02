import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../constants';
import * as Icon from "@expo/vector-icons";
import { Header } from '../../components/common';
import { ScrollView } from 'react-native-gesture-handler';
import { ViewPost } from '../../components/profile/ViewPost';

export const ViewPostScreen = props => {
    const [post, setPost] = useState(props.route.params.post);
    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Header name={'View Post'} fontSize={16} icon={'keyboard-backspace'} navigation={props.navigation}/>
                <ScrollView>
                    <View style={{ paddingHorizontal: 10 }}>
                        { post ? <ViewPost post={props.route.params.post}/> : null }
                    </View>
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