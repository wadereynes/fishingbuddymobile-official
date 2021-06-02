import React from 'react';
import { TouchableOpacity } from 'react-native';
import * as Icon from "@expo/vector-icons";

import { theme } from '../../constants';

const FloatingButton = props => {
    return (
        <TouchableOpacity 
            style={{
                position:"absolute",
                backgroundColor:theme.colors.primary,
                height:50,
                width:50,
                bottom:20,
                right:20,
                alignItems:"center",
                justifyContent:'center',
                alignSelf:'flex-end',
                borderRadius:25,
                shadowColor: 'rgba(0,0,0, .4)', // IOS
                shadowOffset: { height: 1, width: 1 }, // IOS
                shadowOpacity: 1, // IOS
                shadowRadius: 1, //IOS
                elevation: 2, // Android
            }}
            onPress={()=> props.navigation.navigate(props.navigateTo)}
        >
            <Icon.Feather
                name="thumbs-up"
                size={24}
                color={theme.colors.white}
            />
        </TouchableOpacity>
    );
}

export { FloatingButton };