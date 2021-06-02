import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import { DiscoverScreen } from '../screens/discover/DiscoverScreen';
import { MarineLifeScreen } from '../screens/discover/MarineLifeScreen';
import { FishingHotspotsScreen } from '../screens/discover/FishingHotspotsScreen';
import { FishingLawsScreen } from '../screens/discover/FishingLawsScreen';
import { FishingTechniquesScreen } from '../screens/discover/FishingTechniquesScreen';

const DiscoverStack = createStackNavigator();

const DiscoverNavigator = props => {
    return(
        <DiscoverStack.Navigator headerMode='none' initialRouteName='Discover'>
            <DiscoverStack.Screen name="Discover" component={ DiscoverScreen } />
            <DiscoverStack.Screen name="MarineLife" component={ MarineLifeScreen } />
            <DiscoverStack.Screen name="FishingHotspots" component={ FishingHotspotsScreen } />
            <DiscoverStack.Screen name="FishingLaws" component={ FishingLawsScreen } />
            <DiscoverStack.Screen name="FishingTechniques" component={ FishingTechniquesScreen } />
        </DiscoverStack.Navigator>
    );
}

export { DiscoverNavigator };
