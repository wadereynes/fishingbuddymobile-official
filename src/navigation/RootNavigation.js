import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import { BottomTabNavigator } from '../navigation/BottomNavigation';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';


const RootStack = createStackNavigator();

const RootNavigator = props => {
    return(
        <RootStack.Navigator headerMode='none' initialRouteName='Home' >
            <RootStack.Screen name="Bottom" component={ BottomTabNavigator } />
            <RootStack.Screen name="Onboarding" component= { OnboardingScreen } />
        </RootStack.Navigator>
    );
}

export { RootNavigator };
