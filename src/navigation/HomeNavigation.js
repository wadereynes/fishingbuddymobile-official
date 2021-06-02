import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { HomeScreen } from '../screens/home/HomeScreen'
import { ViewPostScreen } from '../screens/home/ViewPostScreen'
import { ViewProfileScreen } from '../screens/home/ViewProfileScreen'
import { ChatNavigator } from './ChatNavigation'

const HomeStack = createStackNavigator()

const HomeNavigator = (props) => {
  return (
    <HomeStack.Navigator headerMode='none' initialRouteName='Home'>
      <HomeStack.Screen name='Home' component={HomeScreen} />
      <HomeStack.Screen name='ViewPostHome' component={ViewPostScreen} />
      <HomeStack.Screen name='ViewProfileHome' component={ViewProfileScreen} />
      <HomeStack.Screen name='ChatProfile' component={ChatNavigator} />
    </HomeStack.Navigator>
  )
}

export { HomeNavigator }
