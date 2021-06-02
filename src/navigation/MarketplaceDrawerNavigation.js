import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import * as Icon from '@expo/vector-icons'
import { theme } from '../constants/'

import { MarketplaceNavigator } from './MarketplaceNavigation'
import CartScreen from '../screens/shop/CartScreen'
import EditProductScreen, {
  screenOptions as editProductScreenOptions,
} from '../screens/user/EditProductScreen'
import UserProductsScreen, {
  screenOptions as UserProductsScreenOptions,
} from '../screens/user/UserProductsScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import ChatScreen, {
  screenOptions as chatScreenOptions,
} from '../screens/chat/ChatScreen'
import MessageScreen, {
  screenOptions as messageScreenOptions,
} from '../screens/chat/MessageScreen'
import Colors from '../constants/Colors'
import { firebase } from '../config/firebase'
import { ActivityIndicator } from 'react-native'
import SaleScreen from '../screens/shop/SaleScreen'

const defaultNavOptions = {
  headerShown: false,
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'Bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'Regular',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
}

const Drawer = createDrawerNavigator()

export const MarketplaceDrawerNavigation = (props) => {
  const [userProfile, setUserProfile] = useState()

  useEffect(() => {
    getUserDetails()
  }, [])

  const getUserDetails = async () => {
    var currentUser = firebase.auth().currentUser
    if (currentUser) {
      await firebase
        .database()
        .ref('user/' + currentUser.uid)
        .once('value', (snapshot) => {
          setUserProfile(snapshot.val())
        })
    }
  }

  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: theme.colors.primary,
        itemStyle: { marginVertical: 5 },
        labelStyle: styles.drawer,
      }}
    >
      <Drawer.Screen
        name='Marketplace'
        component={MarketplaceNavigator}
        options={{
          drawerLabel: 'Marketplace',
          drawerIcon: ({ focused, size }) => (
            <Icon.MaterialIcons
              name={'store-mall-directory'}
              size={20}
              color={focused ? theme.colors.primary : theme.colors.black}
            />
          ),
        }}
      />
      <Drawer.Screen
        name='Cart'
        options={{
          drawerLabel: 'Cart',
          drawerIcon: ({ focused, size }) => (
            <Icon.Ionicons
              name={'cart'}
              size={20}
              color={focused ? theme.colors.primary : theme.colors.black}
            />
          ),
        }}
        component={CartScreen}
      />
      <Drawer.Screen
        name='My Orders'
        options={{
          drawerLabel: 'Purchases',
          drawerIcon: ({ focused, size }) => (
            <Icon.MaterialCommunityIcons
              name={'truck'}
              size={20}
              color={focused ? theme.colors.primary : theme.colors.black}
            />
          ),
        }}
        component={OrdersScreen}
      />

      {userProfile ? (
        ['Fisherman', 'Tackle shop Owner'].includes(userProfile.type) ? (
          <Drawer.Screen
            name='Sales'
            options={{
              drawerLabel: 'Sales',
              drawerIcon: ({ focused, size }) => (
                <Icon.MaterialCommunityIcons
                  name={'cash-usd'}
                  size={20}
                  color={focused ? theme.colors.primary : theme.colors.black}
                />
              ),
            }}
            component={SaleScreen}
          />
        ) : null
      ) : null}

      {userProfile ? (
        ['Fisherman', 'Tackle shop Owner'].includes(userProfile.type) ? (
          <Drawer.Screen
            name='My Products'
            options={{
              drawerLabel: 'Products',
              drawerIcon: ({ focused, size }) => (
                <Icon.MaterialCommunityIcons
                  name={'shopping'}
                  size={20}
                  color={focused ? theme.colors.primary : theme.colors.black}
                />
              ),
            }}
            component={AdminNavigator}
          />
        ) : null
      ) : null}
    </Drawer.Navigator>
  )
}

const AdminStackNavigator = createStackNavigator()

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name='UserProducts'
        component={UserProductsScreen}
        options={UserProductsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name='EditProduct'
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  )
}

const styles = StyleSheet.create({
  drawer: {
    fontFamily: 'Bold',
  },
})

// export { MarketplaceDrawerNavigation }
