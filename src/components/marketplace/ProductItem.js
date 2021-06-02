import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native'
import { Image } from 'react-native-elements'
import { theme } from '../../constants'

import Card from '../UI/Card'

const ProductItem = (props) => {
  let TouchableCmp = TouchableOpacity

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  console.log(props);
  return (
    <View style={styles.container}>
      <Card style={styles.product}>
        <View style={styles.touchable}>
          <TouchableCmp onPress={props.onSelect}>
            <View>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: props.image }} />
              </View>
              <View style={styles.details}>
                <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
                <Text style={styles.category}>{props.category}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{...styles.price, fontSize: 12, fontFamily:'Medium', paddingTop: 2}}>₱</Text>
                  <Text style={styles.price}>{numberWithCommas(parseFloat(props.price).toFixed(2))}</Text>
                </View>
                <Text style={{...styles.address }}>{props.location}</Text>
              </View>
              <View style={styles.actions}>{props.children}</View>
            </View>
          </TouchableCmp>
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: theme.dimensions.width * 0.49, 
  },
  product: {
    height: 280,
    margin: 5,
    overflow: 'hidden',
  },
  touchable: {
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    // alignItems: 'center',
    height: 55,
    padding: 10,
  },
  title: {
    fontFamily: 'Medium',
    fontSize: 14,
    marginVertical: 4,
    textTransform: 'capitalize',
  },
  category: {
    fontFamily: 'Regular',
    fontSize: 12,
    marginBottom: 5,
    textTransform: 'uppercase',
    color: theme.colors.primary,
  },
  address: {
    fontFamily: 'Regular',
    fontSize: 12,
    marginBottom: 5,
    color: theme.colors.black,
  },
  price: {
    fontFamily: 'Bold',
    fontSize: 14,
    color: theme.colors.primary,
    paddingBottom: 3,
  },
  
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // justifyContent: 'flex-end',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 125,
  },
})

export default ProductItem
