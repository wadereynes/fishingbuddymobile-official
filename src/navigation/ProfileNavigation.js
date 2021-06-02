import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

// Screens
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { ProfileSettingsScreen } from '../screens/profile/ProfileSettingsScreen';
import { FollowersScreen } from '../screens/profile/FollowersScreen';
import { ManageGearScreen } from '../screens/profile/ManageGearScreen';
import { ViewPostScreen } from '../screens/home/ViewPostScreen';
import { ViewProfileScreen } from '../screens/home/ViewProfileScreen';
import { RecommendGearScreen } from '../screens/recommender/RecommendGearScreen';
import { RecommendResultsScreen } from '../screens/recommender/RecommendResultsScreen';
import { CreatePostScreen } from '../screens/profile/CreatePostScreen';
import { RecommendCatchScreen } from '../screens/recommender/RecommendCatchScreen';
import { ChatNavigator } from './ChatNavigation';
import { MarketplaceGearResultScreen } from '../screens/recommender/MarketplaceGearResultScreen';

const slideFromRight = {
    ...TransitionPresets.SlideFromRightIOS,
};

const fadeFromBottom = {
    ...TransitionPresets.RevealFromBottomAndroid,
};

const ProfileStack = createStackNavigator();

const ProfileNavigator = props => {

    return(
        <ProfileStack.Navigator headerMode='none' initialRouteName='Profile' screenOptions={slideFromRight}>
            <ProfileStack.Screen name="Profile" component={ ProfileScreen } />
            <ProfileStack.Screen name="ProfileSettings" component={ ProfileSettingsScreen } />
            <ProfileStack.Screen name="ChatProfile" component={ ChatNavigator } />
            <ProfileStack.Screen name="Followers" component={ FollowersScreen } />
            <ProfileStack.Screen name="ManageGear" component={ ManageGearScreen } options={fadeFromBottom}/>
            <ProfileStack.Screen name="ViewPost" component={ ViewPostScreen } />
            <ProfileStack.Screen name="ViewProfile" component={ ViewProfileScreen } />
            <ProfileStack.Screen name="RecommendGear" component= { RecommendGearScreen } />
            <ProfileStack.Screen name="RecommendCatch" component= { RecommendCatchScreen } />
            <ProfileStack.Screen name="RecommendResults" component={ RecommendResultsScreen } />
            <ProfileStack.Screen name="CreatePost" component={ CreatePostScreen } options={fadeFromBottom}/>
            <ProfileStack.Screen name="MarketplaceGearResults" component={ MarketplaceGearResultScreen } />
        </ProfileStack.Navigator>
    );
}

export { ProfileNavigator };
