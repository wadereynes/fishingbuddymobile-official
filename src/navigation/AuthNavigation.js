import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import { BottomTabNavigator } from '../navigation/BottomNavigation';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { LoginEmailScreen } from '../screens/auth/LoginEmailScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name="Login" component={ LoginScreen } />
        <Stack.Screen name="LoginEmail" component={ LoginEmailScreen } />
        <Stack.Screen name="ForgotPassword" component={ ForgotPasswordScreen } />
        <Stack.Screen name="Register" component={ RegisterScreen } />
    </Stack.Navigator>
)

export { AuthNavigator };