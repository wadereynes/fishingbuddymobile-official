import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { theme } from '../../constants';

export const Saving = props => {
    return (
        <View style={styles.loading}>
            <View style={styles.container}>
                <ActivityIndicator size='large' color={theme.colors.white} />
                <Text style={styles.subText}>Loading</Text>
            </View>
        </View> 
    );
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width:100,
        height:100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    subText:{
        color:theme.colors.white,
        fontFamily: 'Bold',
    }
});