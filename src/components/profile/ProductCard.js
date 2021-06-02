import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native'
import { theme } from '../../constants'

import Card from '../UI/Card'

export const ProductCard = (props) => {
  let TouchableCmp = TouchableOpacity

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <View style={styles.container}>
      <Card style={styles.product}>
        <View style={styles.touchable}>
          <TouchableCmp onPress={props.onSelect}>
            <View style={{flexWrap:'wrap'}}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: props.product.urlPhoto }} />
              </View>
              <View style={styles.details}>
                <Text style={styles.title}>{props.product.title}</Text>
                <Text style={styles.category}>{props.product.category}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{...styles.price, fontSize: 12, paddingTop: 2}}>₱</Text>
                  <Text style={styles.price}>{numberWithCommas(parseFloat(props.product.price).toFixed(2))}</Text>
                </View>
              </View>
            </View>
          </TouchableCmp>
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: theme.dimensions.width * 0.5, 
  },
  product: {
    height: 200,
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
  price: {
    fontFamily: 'Bold',
    fontSize: 14,
    color: theme.colors.primary,
    paddingBottom: 10,
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

