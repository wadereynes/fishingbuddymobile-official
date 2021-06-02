import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import * as Icon from '@expo/vector-icons'
import { theme } from '../constants/'
import Colors from '../constants/Colors'
import { firebase } from '../config/firebase'
import { ActivityIndicator } from 'react-native'

import { MarketplaceNavigator } from './MarketplaceNavigation'
import HotspotScreen, {
  screenOptions as hotspotScreenOptions,
} from '../screens/map/HotspotScreen'
import EditHotspotScreen, {
  screenOptions as edithotspotScreenOptions,
} from '../screens/map/EditHotspotScreen'

const defaultNavOptions = {
  //   headerShown: false,
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

export const HotspotDrawerNavigation = (props) => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: theme.colors.primary,
        itemStyle: { marginVertical: 5 },
        labelStyle: styles.drawer,
      }}
    >
      <Drawer.Screen
        name='Hotspot'
        component={HotspotNavigator}
        options={{
          drawerLabel: 'Hotspot',
        }}
      />
      <Drawer.Screen
        name='EditHotspot'
        component={EditHotspotNavigator}
        options={{
          drawerLabel: 'Add Hotspot',
        }}
      />
    </Drawer.Navigator>
  )
}

const HotspotStackNavigator = createStackNavigator()

export const HotspotNavigator = () => {
  return (
    <HotspotStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <HotspotStackNavigator.Screen
        name='Hotspot'
        component={HotspotScreen}
        options={hotspotScreenOptions}
      />
    </HotspotStackNavigator.Navigator>
  )
}

const EditHotspotStackNavigator = createStackNavigator()

export const EditHotspotNavigator = () => {
  return (
    <EditHotspotStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <EditHotspotStackNavigator.Screen
        name='EditHotspot'
        component={EditHotspotScreen}
        options={edithotspotScreenOptions}
      />
    </EditHotspotStackNavigator.Navigator>
  )
}

const styles = StyleSheet.create({
  drawer: {
    fontFamily: 'Bold',
  },
})
