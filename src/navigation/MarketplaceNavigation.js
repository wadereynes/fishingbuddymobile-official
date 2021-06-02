import React from 'react'
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'
//import ProductDetailScreen from '../screens/ProductDetailScreen'
//import { MarketplaceScreen } from '../screens/MarketplaceScreen';
import { MarketplaceFiltersScreen } from '../screens/shop/MarketplaceFiltersScreen'
import { RecommendedGear } from '../components/profile/RecommendedGear'
import ProductsOverviewScreen, {
  screenOptions as productsOverviewScreenOptions,
} from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen, {
  screenOptions as productDetailScreenOptions,
} from '../screens/shop/ProductDetailScreen'
import CartScreen, { cartScreenOptions } from '../screens/shop/CartScreen'
import EditProductScreen, {
  screenOptions as editProductScreenOptions,
} from '../screens/user/EditProductScreen'
import UserProductsScreen, {
  screenOptions as UserProductsScreenOptions,
} from '../screens/user/UserProductsScreen'
import Colors from '../constants/Colors'
import { ViewProfileScreen } from '../screens/home/ViewProfileScreen'
import { RecommendGearScreen } from '../screens/recommender/RecommendGearScreen'
import { RecommendResultsScreen } from '../screens/recommender/RecommendResultsScreen'
import { RecommendCatchScreen } from '../screens/recommender/RecommendCatchScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import MessageScreen, {
  screenOptions as messageScreenOptions,
} from '../screens/chat/MessageScreen'
import ChatScreen from '../screens/chat/ChatScreen'
import SaleScreen from '../screens/shop/SaleScreen'
import { MarketplaceGearResultScreen } from '../screens/recommender/MarketplaceGearResultScreen';


const slideFromRight = {
  ...TransitionPresets.SlideFromRightIOS,
}

const fadeFromBottom = {
  ...TransitionPresets.RevealFromBottomAndroid,
}

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

const MarketplaceStack = createStackNavigator()

const MarketplaceNavigator = () => {
  return (
    <MarketplaceStack.Navigator
      // headerMode='none'
      headerMode='float'
      initialRouteName='Marketplace'
      screenOptions={defaultNavOptions}
    >
      <MarketplaceStack.Screen
        name='Marketplace'
        component={ProductsOverviewScreen}
        // options={productsOverviewScreenOptions}
        options={{
          headerShown: false,
        }}
      />
      <MarketplaceStack.Screen
        name='ProductDetail'
        component={ProductDetailScreen}
        // options={productDetailScreenOptions}
        options={{
          headerShown: false,
        }}
      />
      <MarketplaceStack.Screen
        name='Cart'
        component={CartScreen}
        // options={cartScreenOptions}
        options={{
          headerShown: false,
        }}
      />
      <MarketplaceStack.Screen
        name='UserProducts'
        component={UserProductsScreen}
        // options={UserProductsScreenOptions}
        options={{
          headerShown: false,
        }}
      />
      <MarketplaceStack.Screen
        name='EditProduct'
        component={EditProductScreen}
        // options={editProductScreenOptions}
        options={{
          headerShown: false,
        }}
      />

      <MarketplaceStack.Screen
        name='MarketplaceFilter'
        component={MarketplaceFiltersScreen}
        options={fadeFromBottom}
        options={{
          headerShown: false,
        }}
      />
      <MarketplaceStack.Screen
        name='ViewProfileMarketplace'
        component={ViewProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <MarketplaceStack.Screen
        name='RecommendGearMarketplace'
        component={RecommendGearScreen}
        options={{
          headerShown: false,
        }}
      />
      <MarketplaceStack.Screen
        name='RecommendResultsMarketplace'
        component={RecommendResultsScreen}
        options={{
          headerShown: false,
        }}
      />
      <MarketplaceStack.Screen
        name='OrdersMarketplace'
        component={OrdersScreen}
        options={{
          headerShown: false,
        }}
      />
      <MarketplaceStack.Screen
        name='RecommendCatchMarketplace'
        component={RecommendCatchScreen}
        options={{
          headerShown: false,
        }}
      />
      <MarketplaceStack.Screen
        name='Message'
        component={MessageScreen}
        options={messageScreenOptions}
      />
      <MarketplaceStack.Screen
        name='Sales'
        component={SaleScreen}
        options={{
          headerShown: false,
        }}
      />
      <MarketplaceStack.Screen 
        name="MarketplaceGearResults" 
        component={ MarketplaceGearResultScreen } 
        options={{
          headerShown: false,
        }}
      />
    </MarketplaceStack.Navigator>
  )
}

export { MarketplaceNavigator }
