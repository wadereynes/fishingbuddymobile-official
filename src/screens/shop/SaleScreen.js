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
import { firebase } from '../../config/firebase'
import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/marketplace/OrderItem'
import * as ordersActions from '../../store/actions/orders'
import Colors from '../../constants/Colors'
import { HeaderSimple } from '../../components/marketplace/HeaderSimple'
import { theme } from '../../constants'
import SalesItem from '../../components/marketplace/SalesItem'
import moment from 'moment'

const SaleScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [allSales, setAllSales] = useState([])

  const orders = useSelector((state) => state.orders.orders)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchSales()
  }, [fetchSales])

  useEffect(() => {
    setIsLoading(true)
    fetchSales().then(() => {
      setIsLoading(false)
    })
  }, [dispatch, fetchSales])

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', fetchSales)

    return () => {
      unsubscribe()
    }
  }, [fetchSales])

  // useEffect(() => {
  //   setIsLoading(true)
  //   dispatch(ordersActions.fetchSales()).then(() => {
  //     setIsLoading(false)
  //   })
  // }, [dispatch])

  const fetchSales = async () => {
    const currentUid = firebase.auth().currentUser.uid

    try {
      await firebase
        .database()
        .ref('sales')
        .child(currentUid)
        .on('value', (dataSnapshot) => {
          let sales = []
          dataSnapshot.forEach((data) => {
            sales.push({
              id: data.key,
              buyerAddress: data.val().buyerAddress,
              buyerImage: data.val().buyerImage,
              buyerName: data.val().buyerName,
              items: data.val().cartItems,
              date: data.val().date,
              totalAmount: data.val().totalAmount,
            })
          })

          setAllSales(sales)
        })
    } catch (error) {
      alert(error)
    }
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  if (allSales.length === 0) {
    return (
      <View>
        <HeaderSimple
          headerTitle={'Sales'}
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
              You have no sales
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
          headerTitle={'Sales'}
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
          data={allSales}
          onRefresh={fetchSales}
          refreshing={isLoading}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <SalesItem
              amount={itemData.item.totalAmount}
              date={moment(itemData.item.date).format('MMMM Do, YYYY')}
              items={itemData.item.items}
              buyerName={itemData.item.buyerName}
              buyerImage={itemData.item.buyerImage}
              buyerAddress={itemData.item.buyerAddress}
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

export default SaleScreen
