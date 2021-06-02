import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '../../constants'

const CartItem = (props) => {
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <View style={{ width: '25%'}}>
          <Image
              style={styles.Image}
              source={{
                uri: props.urlPhoto,
              }}
            />
        </View>
        <View style={{ flexDirection: 'column'}}>
          <Text numberOfLines={1} style={{...styles.mainText, marginLeft: 5}}>{props.title}</Text>
          <Text style={styles.quantity}>x{props.quantity} </Text>
          <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 5}}>
            <Text styles={{ fontSize: 10, paddingTop: 10 }}>₱</Text>
            <Text style={{...styles.mainText, fontFamily: 'Bold'}}>
              {/* {numberWithCommas(props.amount.toFixed(2))} */}
              {numberWithCommas(parseFloat(props.amount).toFixed(2))}
            </Text>
          </View>
          
        </View>
      </View>
      <View >
        
        {props.deletable && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={{...styles.deleteButton, marginVertical: 20}}
          >
            <Ionicons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={23}
              color='red'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
    width: theme.dimensions.width *0.6
  },
  quantity: {
    fontFamily: 'Regular',
    color: theme.colors.primary,
    fontSize: 16,
    marginLeft: 5,
    paddingTop: 2
  },
  mainText: {
    fontFamily:'Medium',
    fontSize: 14,
  },
  deleteButton: {
    marginLeft: 20,
  },
  Image: {
    width: 55,
    height: 55,
    marginRight: 5,
  },
})

export default CartItem
