import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { theme } from '../../constants';

export const SpecieCard = props => {
    return(
        <TouchableOpacity 
            onPress={props.onPress}
            style={{
                backgroundColor:theme.colors.white,
                borderRadius:10,
                marginLeft:2,
                paddingRight: 5,
                paddingVertical: 10
            }}
        >
            <View >
                <Image
                    source={require('../../assets/images/parrotfish.jpeg')}
                    style={{
                        width:theme.dimensions.width * 0.29,
                        height:theme.dimensions.width * 0.29,
                        borderRadius:10
                    }}
                />
                <Text style={{
                    fontSize:12,
                    position:'absolute',
                    bottom: 0,
                    paddingHorizontal: 10,
                    marginBottom: 5,
                    color: theme.colors.white,
                    fontFamily:"Bold",
                    elevation: 2,
                    
                }}>
                    Parrot Fish 
                </Text>
            </View>
        </TouchableOpacity>
    );
}