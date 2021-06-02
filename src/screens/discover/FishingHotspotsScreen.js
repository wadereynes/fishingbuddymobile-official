import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../constants';
import * as Icon from "@expo/vector-icons";
import { Header } from '../../components/common';
import { ScrollView } from 'react-native-gesture-handler';

export const FishingHotspotsScreen = props => {
    
    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Header name={'Fishing Hotposts'} fontSize={18} icon={'keyboard-backspace'} navigation={props.navigation}/>
                <ScrollView>

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