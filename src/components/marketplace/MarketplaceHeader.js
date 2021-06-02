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

export const MarketplaceHeader = (props) => {
  return (
    <View style={styles.container}>
      <Search navigation={props.navigation} />
      <View style={styles.wrapper}>
        <View style={{ width: '20%', alignItems: 'flex-start', marginLeft: 5 }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Profile')}
          >
            {props.user ? (
              <Image
                source={{ uri: props.user.profilePicture }}
                style={styles.avatarImage}
                PlaceholderContent={<ActivityIndicator />}
              />
            ) : (
              <Image
                source={require('../../assets/images/avatar.png')}
                style={styles.avatarImage}
                PlaceholderContent={<ActivityIndicator />}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={{ width: '30%' }}>
          {props.user ? (
            <Text style={styles.name}>{props.user.firstName}</Text>
          ) : (
            <Text style={styles.name}>user.firstName</Text>
          )}
          <TouchableOpacity onPress={()=>props.navigation.navigate('OrdersMarketplace', { origin: 'Marketplace'})}>
            <Text style={styles.viewOrdersTxt}>View Orders</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '50%' }}>
          { props.user ? props.user.type==='Hobbyist' ? 
            <TouchableOpacity
                style={styles.sellProductBtn}
                onPress={() =>
                  props.navigation.navigate('RecommendGearMarketplace', { origin: 'Marketplace' })
                }
              >
                <Text style={styles.sellProductTxt}>Recommend Gear</Text>
              </TouchableOpacity>
            :  props.user.type==='Fisherman' ? 
              <TouchableOpacity
                style={styles.sellProductBtn}
                onPress={() =>
                  props.navigation.navigate('EditProduct', { action: 'Add', origin: 'Marketplace', headerTitle:'Sell Catch' })
                }
              >
                <Icon.Feather
                  style={{ height: 20, width: 20, marginRight: 5 }}
                  name={'plus'}
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={styles.sellProductTxt}>Sell Catch</Text>
              </TouchableOpacity>
            : props.user.type==='Tackle shop Owner' ? 
              <TouchableOpacity
                style={styles.sellProductBtn}
                onPress={() =>
                  props.navigation.navigate('EditProduct', { action: 'Add', origin: 'Marketplace', headerTitle: 'Sell Gear' })
                }
              >
                <Icon.Feather
                  style={{ height: 20, width: 20, marginRight: 5 }}
                  name={'plus'}
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={styles.sellProductTxt}>Sell Gear</Text>
              </TouchableOpacity>
            : props.user.type==='Consumer' ? 
              <TouchableOpacity
                  style={styles.sellProductBtn}
                  onPress={() =>
                    props.navigation.navigate('RecommendCatchMarketplace', { origin: 'Marketplace' })
                  }
                >
                  <Text style={styles.sellProductTxt}>Recommend Catch</Text>
              </TouchableOpacity>
            : null
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
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 15,
    marginTop: 0,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
    paddingBottom: 10,
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
