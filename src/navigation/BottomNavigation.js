import React, { useState, useEffect } from 'react'
import { Image, StyleSheet } from 'react-native'
import { firebase } from '../config/firebase'
import * as Icon from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// navigators
import { ProfileNavigator } from '../navigation/ProfileNavigation'
import { MarketplaceNavigator } from '../navigation/MarketplaceNavigation'
import { HomeNavigator } from '../navigation/HomeNavigation'
import { DiscoverNavigator } from '../navigation/DiscoverNavigation'
//screens
import { HotspotDrawerNavigation } from './HotspotDrawerNavigation'

//constants
import { theme } from '../constants'
import { MarketplaceDrawerNavigation } from './MarketplaceDrawerNavigation'

const BottomTab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    getUserDetails()
  }, [])

  const getUserDetails = async () => {
    var currentUser = firebase.auth().currentUser
    return new Promise(function (resolve, reject) {
      try {
        firebase
          .database()
          .ref('user/' + currentUser.uid)
          .once('value', (snapshot) => {
            if (snapshot.exists()) {
              resolve(snapshot.val())
              setUser(snapshot.val())
            }
          })
      } catch (e) {
        reject(e)
      }
    })
  }

  return (
    <BottomTab.Navigator
      shifting={false}
      initialRouteName='Home'
      tabBarOptions={{
        style: {
          height: 50,
          justifyContent: 'center',
          paddingVertical: 15,
          backgroundColor: theme.colors.primary,
          elevation: 2,
        },
      }}
    >
      <BottomTab.Screen
        name='Profile'
        component={ProfileNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, size }) => {
            {
              let color
              focused
                ? (color = theme.colors.accent2)
                : (color = theme.colors.white)
              if (user) {
                return (
                  <Image
                    source={{ uri: user.profilePicture }}
                    style={{ ...styles.avatarIcon, borderColor: color }}
                  />
                )
              } else {
                return (
                  <Image
                    source={require('../assets/images/avatar.png')}
                    style={{ ...styles.avatarIcon, borderColor: color }}
                  />
                )
              }
            }
          },
        }}
      />
      <BottomTab.Screen
        name='Marketplace'
        component={MarketplaceDrawerNavigation}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, size }) => {
            {
              let color
              focused
                ? (color = theme.colors.accent2)
                : (color = theme.colors.white)
              return (
                <Icon.MaterialIcons
                  style={{ height: 24, width: 29 }}
                  name={'store-mall-directory'}
                  size={24}
                  color={color}
                />
              )
            }
          },
        }}
      />
      <BottomTab.Screen
        name='Home'
        component={HomeNavigator}
        options={(navigation) => ({
          tabBarLabel: '',
          tabBarIcon: ({ focused, size }) => {
            {
              let color
              focused
                ? (color = theme.colors.accent2)
                : (color = theme.colors.white)
              return (
                <Icon.MaterialCommunityIcons
                  style={{ height: 24, width: 29 }}
                  name={'home'}
                  size={24}
                  color={color}
                />
              )
            }
          },
        })}
      />
      <BottomTab.Screen
        name='Discover'
        component={DiscoverNavigator}
        options={(navigation) => ({
          tabBarLabel: '',
          tabBarIcon: ({ focused, size }) => {
            {
              let color
              focused
                ? (color = theme.colors.accent2)
                : (color = theme.colors.white)
              return (
                <Icon.MaterialCommunityIcons
                  style={{ height: 24, width: 24 }}
                  name={'fish'}
                  size={24}
                  color={color}
                />
              )
            }
          },
        })}
      />
      <BottomTab.Screen
        name='Hotspot'
        component={HotspotDrawerNavigation}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, size }) => {
            {
              let color
              focused
                ? (color = theme.colors.accent2)
                : (color = theme.colors.white)
              return (
                <Icon.MaterialIcons
                  style={{ height: 24, width: 24 }}
                  name={'directions-boat'}
                  size={24}
                  color={color}
                />
              )
            }
          },
        }}
      />
    </BottomTab.Navigator>
  )
}

const styles = StyleSheet.create({
  avatarIcon: {
    width: 22,
    height: 22,
    borderRadius: 60,
    borderWidth: 1.5,
  },
})

export { BottomTabNavigator }
