import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ChatScreen, {
  screenOptions as chatScreenOptions,
} from '../screens/chat/ChatScreen'
import MessageScreen, {
  screenOptions as messageScreenOptions,
} from '../screens/chat/MessageScreen'
import Colors from '../constants/Colors'

const defaultNavOptions = {
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

const ChatStackNavigator = createStackNavigator()

export const ChatNavigator = () => {
  return (
    <ChatStackNavigator.Navigator
      //   headerMode='none'
      screenOptions={defaultNavOptions}
    >
      <ChatStackNavigator.Screen
        name='Chat'
        component={ChatScreen}
        options={chatScreenOptions}
      />
      <ChatStackNavigator.Screen
        name='Message'
        component={MessageScreen}
        options={messageScreenOptions}
      />
    </ChatStackNavigator.Navigator>
  )
}
