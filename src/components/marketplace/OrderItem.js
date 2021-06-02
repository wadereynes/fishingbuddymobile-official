import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Image } from 'react-native'

import CartItem from './CartItem'
import Colors from '../../constants/Colors'
import Card from '../UI/Card'

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false)
  console.log('props.sellerName: ', props.sellerName)
  console.log('props.image: ', props.sellerImage)
  console.log('props.address: ', props.sellerAddress)
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>P{props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <View style={styles.summary}>
        <Image
          style={styles.Image}
          source={{
            uri: props.sellerImage,
          }}
        />
        <Text style={styles.buyerName}>{props.sellerName}</Text>
      </View>
      <View style={styles.summary}>
        <Text>Seller Address: </Text>
        <Text style={styles.buyerAddress}>{props.sellerAddress}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={() => {
          setShowDetails((prevState) => !prevState)
        }}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
              urlPhoto={cartItem.urlPhoto}
            />
          ))}
        </View>
      )}
    </Card>
  )
}

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: 'Bold',
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: 'Regular',
    color: '#888',
  },
  detailItems: {
    width: '100%',
  },
  buyerName: {},
  Image: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: 'gray',
    marginRight: 5,
    borderRadius: 50,
  },
})

export default OrderItem
