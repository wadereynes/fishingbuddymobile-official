import React, { useState, useEffect } from 'react'
import {
View,
Text,
ImageBackground,
Platform,
Dimensions,
StyleSheet,
ActivityIndicator,
} from 'react-native'
import { Image } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as Icon from '@expo/vector-icons'

import { theme } from '../../constants'
import { Search } from './Search'

export const HeaderSimple = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={{ width: '10%'}}>
                    
                    {
                        props.origin === 'Marketplace' ?
                        <TouchableOpacity  onPress={()=> props.navigation.goBack()}>
                            <Icon.Ionicons style={{paddingTop: 0}} name={'ios-arrow-back-outline'} size={25} color={theme.colors.white} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity  onPress={()=> props.navigation.toggleDrawer()}>
                            <Icon.Ionicons style={{paddingTop: 0}} name={'ios-menu'} size={25} color={theme.colors.white} />
                        </TouchableOpacity>

                    }

                    
                </View>
                <View style={{ width: '80%'}}>
                    <Text style={{ fontFamily: 'Bold', color: 'white', fontSize: 20, marginLeft: 10}}>{props.headerTitle}</Text>
                </View>
                <View style={{ width: '10%'}}>
                {
                    props.headerTitle === 'Products' ?
                        <TouchableOpacity  onPress={()=> props.navigation.navigate('EditProduct', { action: 'Add', origin: 'Marketplace', headerTitle:'Sell Catch' })}>
                            <Icon.MaterialIcons style={{paddingTop: 0}} name={'add-business'} size={25} color={theme.colors.white} />
                        </TouchableOpacity>
                    : null
                }
                    
                </View>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
container: {
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: 23,
    borderBottomRightRadius: 23,
    paddingHorizontal: 15,
    marginBottom: 10,
    flexDirection:'row'
},
wrapper: {
    marginTop: 40,
    marginBottom: 15,
    flexDirection:'row'
},
avatarImage: {
    height: 55,
    width: 55,
    borderColor: theme.colors.white,
    borderWidth: 2,
    borderRadius: 60,
},
name: {
    fontSize: theme.sizes.title,
    color: theme.colors.white,
    fontFamily: 'Bold',
},
viewOrdersTxt: {
    fontSize: theme.sizes.caption,
    color: theme.colors.white,
    fontFamily: 'Medium',
},
sellProductBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.accent2,
    padding: 10,
    borderRadius: 23,
    flexDirection: 'row',
},
sellProductTxt: {
    color: theme.colors.primary,
    fontFamily: 'Bold',
},
})
