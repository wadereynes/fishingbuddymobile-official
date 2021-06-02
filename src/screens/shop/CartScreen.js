import React, { useState } from 'react'
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Toast from 'react-native-toast-message';
import Colors from '../../constants/Colors'
import CartItem from '../../components/marketplace/CartItem'
import Card from '../../components/UI/Card'
import * as cartActions from '../../store/actions/cart'
import * as ordersActions from '../../store/actions/orders'
import { HeaderSimple } from '../../components/marketplace/HeaderSimple'
import { theme } from '../../constants'

const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false)

  const ownerId = useSelector((state) => state.cart.sellerId)
  const sellerName = useSelector((state) => state.cart.sellerName)
  const sellerAddress = useSelector((state) => state.cart.sellerAddress)
  const sellerImage = useSelector((state) => state.cart.sellerImage)
  // console.log('sellerName: ', sellerName)
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount)
  const cartItems = useSelector((state) => {
    const transformedCartItems = []
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        urlPhoto: state.cart.items[key].urlPhoto,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
        sellerId: state.cart.items[key].ownerId,
        productPushToken: state.cart.items[key].pushToken,
      })
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    )
  })
  const dispatch = useDispatch()

  let filteredCartItems = cartItems.slice()
  filteredCartItems = cartItems.filter((item) => item.sellerId == ownerId)

  const countTotal = (items) =>
    items.reduce((acc, curr) => acc + curr.quantity * curr.productPrice, 0)

  const newTotal = countTotal(filteredCartItems)

  const sendOrderHandler = async () => {
    setIsLoading(true)
    await dispatch(
      ordersActions.addOrder(
        filteredCartItems,
        newTotal,
        sellerName,
        sellerAddress,
        sellerImage
      )
    )
    await dispatch(
      ordersActions.addOrderOwner(filteredCartItems, newTotal, ownerId)
    )
    setIsLoading(false)
    Toast.show({
      text1: 'Order is placed!',
      position: 'bottom',
      bottomOffset: theme.dimensions.height * 0.1,
      type: 'success',
    });
  }
  // console.log(props)
  return (
    <View style={styles.screen}>
      <HeaderSimple
        headerTitle={'Cart'}
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
        data={filteredCartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            urlPhoto={itemData.item.urlPhoto}
            amount={itemData.item.sum}
            deletable
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId))
            }}
          />
        )}
      />
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            {/* ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100} */}₱
            {Math.round(newTotal * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size='small' color={Colors.primary} />
        ) : (
          <Button
            color={Colors.accent}
            title='Order Now'
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
    </View>
  )
}

export const cartScreenOptions = (navData) => {
  return {
    headerTitle: 'My Cart',
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    position: 'absolute',
    bottom: 0,
    width: theme.dimensions.width * 0.95,
    marginLeft: 10,
  },
  summaryText: {
    fontFamily: 'Bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
})

export default CartScreen
