import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../constants';

export const ActionButton = props => {
    if(props.outline) {
        return(
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => props.onPress()}
                    style={{...styles.buttonWithIcon, backgroundColor:theme.colors.white, borderWidth: 2, borderColor: theme.colors.primary, paddingVertical:8,}}
                >
                    <Text style={{...styles.buttonText, color: theme.colors.primary, fontFamily: 'Bold' }}>{props.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    else {
        return(
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => props.onPress()}
                    style={{...styles.buttonWithIcon, backgroundColor:theme.colors.primary}}
                >
                    <Text style={{...styles.buttonText}}>{props.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    footer:{
        justifyContent: 'flex-end',
        marginVertical:5,
    },
    buttonWithIcon:{
        display:'flex',
        marginHorizontal:7,
        marginVertical:5,
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:23,
        flexDirection:'row',
        justifyContent: "center",
    },
    buttonText:{
        color:theme.colors.white,
        fontFamily:"Medium",
        fontSize:16,
    },
});