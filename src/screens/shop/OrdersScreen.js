import React, { useEffect, useState } from 'react'
import {
  View,
  FlatList,
  Text,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/marketplace/OrderItem'
import * as ordersActions from '../../store/actions/orders'
import Colors from '../../constants/Colors'
import { HeaderSimple } from '../../components/marketplace/HeaderSimple'
import { theme } from '../../constants'

const OrdersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false)

  const orders = useSelector((state) => state.orders.orders)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsLoading(true)
    dispatch(ordersActions.fetchOrders()).then(() => {
      setIsLoading(false)
    })
  }, [dispatch])

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  if (orders.length === 0) {
    return (
      <View>
        <HeaderSimple
          headerTitle={'Purchases'}
          navigation={props.navigation}
          origin={
            props.route.params
              ? props.route.params.origin
                ? props.route.params.origin
                : null
              : null
          }
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: theme.dimensions.height / 5,
          }}
        >
          <View style={{ alignItems: 'center', marginTop: 40, width: '100%' }}>
            <Image
              source={require('../../assets/icons/groceries.png')}
              style={{ width: 100, height: 100, marginHorizontal: 50 }}
              transition={false}
            />
            <Text
              style={{
                fontFamily: 'Bold',
                fontSize: 14,
                marginVertical: 10,
                marginHorizontal: 20,
              }}
            >
              You have no purchases
            </Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View>
      <ScrollView>
        <HeaderSimple
          headerTitle={'Purchases'}
          navigation={props.navigation}
          origin={
            props.route.params
              ? props.route.params.origin
                ? props.route.params.origin
                : null
              : null
          }
        />
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <OrderItem
              amount={itemData.item.totalAmount}
              date={itemData.item.readableDate}
              items={itemData.item.items}
              urlPhoto={itemData.item.urlPhoto}
              sellerName={itemData.item.sellerName}
              sellerImage={itemData.item.sellerImage}
              sellerAddress={itemData.item.sellerAddress}
            />
          )}
        />
      </ScrollView>
    </View>
  )
}

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer()
          }}
        />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default OrdersScreen
