import React from 'react';
import { View } from 'react-native';
import { theme } from '../../constants';

export const Divider = () => {
    return(
        <View
            style={{
                borderBottomColor: theme.colors.gray2,
                borderBottomWidth: 1,
                marginVertical: 10,
            }}
        />
    )
}