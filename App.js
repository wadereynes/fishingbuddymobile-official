import React, { useEffect, useState } from 'react'
import { StyleSheet, ActivityIndicator, View, LogBox } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

import { NavigationContainer } from '@react-navigation/native'

import { AuthNavigator } from './src/navigation/AuthNavigation'

import * as Font from 'expo-font'
import ReduxThunk from 'redux-thunk'
import * as Notifications from 'expo-notifications'
import { Asset } from 'expo-asset'
import { Loading } from './src/components/common/Loading'

import { firebase } from './src/config/firebase'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import usersReducer from './src/store/reducers/users'
import productsReducer from './src/store/reducers/products'
import cartReducer from './src/store/reducers/cart'
import ordersReducer from './src/store/reducers/orders'
import authReducer from './src/store/reducers/auth'
import { RootNavigator } from './src/navigation/RootNavigation'

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true, shouldSetBadge: true }
  },
})

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
  users: usersReducer,
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

LogBox.ignoreLogs(['Setting a timer for a long period of time'])
LogBox.ignoreAllLogs()

export default function App() {
  const [isAssetsReady, setIsAssetsReady] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      firebase.auth().onAuthStateChanged((user) => {
        user
          ? !user.emailVerified
            ? firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: false,
                url: 'https://fishingbuddy-web.firebaseapp.com/__/auth/action',
              })
            : setUser(user)
          : setUser(null)
        console.log('user in App.js', user)
      })
    }

    const cacheResourcesAsync = async () => {
      await Font.loadAsync({
        Bold: require('./src/assets/fonts/Montserrat-ExtraBold.otf'),
        Medium: require('./src/assets/fonts/Montserrat-Medium.otf'),
        Regular: require('./src/assets/fonts/Montserrat-Regular.otf'),
        Italic: require('./src/assets/fonts/Montserrat-Italic.otf'),
      })

      const images = [
        require('./src/assets/images/illustration_1.png'),
        require('./src/assets/images/login.png'),
        require('./src/assets/icons/outline/bait.png'),
        require('./src/assets/icons/outline/big-fish.png'),
        require('./src/assets/icons/outline/boat.png'),
        require('./src/assets/icons/outline/fishing-line-outline.png'),
        require('./src/assets/icons/outline/fishing-line2-outline.png'),
        require('./src/assets/icons/outline/fishing-lure-outline.png'),
        require('./src/assets/icons/outline/fishing-reel-outline.png'),
        require('./src/assets/icons/outline/fishing-rod-outline.png'),
        require('./src/assets/icons/outline/jigging.png'),
        require('./src/assets/icons/outline/medium-fish.png'),
        require('./src/assets/icons/outline/shorecasting.png'),
        require('./src/assets/icons/outline/small-fish.png'),
        require('./src/assets/icons/boat.png'),
        require('./src/assets/icons/fishing-rod.png'),
        require('./src/assets/icons/fishing.png'),
        require('./src/assets/icons/categories/bait.png'),
        require('./src/assets/icons/categories/lure.png'),
        require('./src/assets/icons/categories/net.png'),
        require('./src/assets/icons/categories/reel.png'),
        require('./src/assets/icons/categories/rod.png'),
        require('./src/assets/icons/categories/shirt.png'),
        require('./src/assets/images/discover-fishing-hotspots.jpg'),
        require('./src/assets/images/discover-fishing-laws.jpg'),
        require('./src/assets/images/discover-fishing-techniques.jpg'),
        require('./src/assets/images/discover-marine-life.jpg'),
        require('./src/assets/icons/ribbon-consumer.png'),
        require('./src/assets/icons/ribbon-fisherman.png'),
        require('./src/assets/icons/ribbon-hobbyist.png'),
        require('./src/assets/icons/ribbon-tackleshop.png'),
      ]

      const cacheImages = images.map((image) => {
        return Asset.fromModule(image).downloadAsync()
      })
      setIsAssetsReady(true)
      return Promise.all(cacheImages)
    }

    cacheResourcesAsync()
    checkIfLoggedIn()
  }, [])

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {!isAssetsReady ? (
          <Loading />
        ) : user ? (
          <Provider store={store}>
            <RootNavigator />
          </Provider>
        ) : (
          <AuthNavigator />
        )}
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
})
