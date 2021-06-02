import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
  Linking,
  Platform,
} from 'react-native'
import { Rating, Divider } from 'react-native-elements'
import Toast from 'react-native-toast-message'
import { useSelector, useDispatch } from 'react-redux'
import * as Icon from '@expo/vector-icons'
import { theme } from '../../constants'
import axios from 'axios'

import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'
import { FishInfoCard } from '../../components/discover/FishInfoCard'
import { ShopCard } from '../../components/marketplace/ShopCard'
import { Map } from '../../components/common'

const ProductDetailScreen = (props) => {
  console.log('productDetailsScreen', props)
  console.log('selectedProduct', selectedProduct)
  const cartOwnerId = useSelector((state) => state.cart.sellerId)
  const productId = props.route.params.productId
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  )

  const dispatch = useDispatch()

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const [shopsNearby, setShopsNearby] = useState([])
  useEffect(() => {
    if (selectedProduct.category === 'fish') {
      axios
        .get(
          'https://us-central1-fishingbuddy-web.cloudfunctions.net/app/api/shopsNearby/' +
            selectedProduct.ownerId.toString() +
            '/fisherman' +
            '/' +
            selectedProduct.storeLocation.city.toString() +
            '/' +
            selectedProduct.storeLocation.lat.toString() +
            '/' +
            selectedProduct.storeLocation.lng.toString()
        )
        .then(({ data }) => {
          setShopsNearby(data)
        })
    } else {
      axios
        .get(
          'https://us-central1-fishingbuddy-web.cloudfunctions.net/app/api/shopsNearby/' +
            selectedProduct.ownerId.toString() +
            '/tackle shop owner' +
            '/' +
            selectedProduct.storeLocation.city.toString() +
            '/' +
            selectedProduct.storeLocation.lat.toString() +
            '/' +
            selectedProduct.storeLocation.lng.toString()
        )
        .then(({ data }) => {
          setShopsNearby(data)
        })
    }
  }, [])

  const Spacer = (props) => {
    return <Text style={{ backgroundColor: theme.colors.gray4 }}></Text>
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.white }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        <Image
          style={styles.image}
          source={{ uri: selectedProduct.urlPhoto }}
        />
        <TouchableOpacity
          style={{
            ...styles.smallButton,
            position: 'absolute',
            marginLeft: 10,
            marginTop: 40,
          }}
          onPress={() => props.navigation.goBack()}
        >
          <Icon.Ionicons
            style={styles.headerIcon}
            name={'ios-arrow-back-outline'}
            size={24}
            color={theme.colors.white}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...styles.text,
            fontSize: 16,
            paddingTop: 15,
            paddingBottom: 5,
            marginHorizontal: 20,
          }}
        >
          {selectedProduct.title}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              ...styles.price,
              fontSize: 12,
              paddingTop: 2,
              color: theme.colors.primary,
            }}
          >
            {selectedProduct.category.toUpperCase()}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              ...styles.price,
              fontSize: 12,
              paddingTop: 2,
              color: theme.colors.primary,
            }}
          >
            ₱
          </Text>
          <Text style={{ fontFamily: 'Bold', color: theme.colors.primary }}>
            {numberWithCommas(parseFloat(selectedProduct.price).toFixed(2))}
          </Text>
        </View>
        <Divider />
        <Text style={styles.description}>{selectedProduct.description}</Text>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            marginVertical: 10,
          }}
        >
          {selectedProduct.fishSelected ? (
            <View>
              <FishInfoCard fish={selectedProduct.fishSelected} />
            </View>
          ) : null}
        </View>

        <Spacer />

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            marginVertical: 10,
          }}
        >
          <Image
            // source={require('../../assets/images/avatar.png')}
            source={{ uri: selectedProduct.ownerPicture }}
            style={styles.avatarImage}
          />
          <View style={{ paddingVertical: 10, width: '50%' }}>
            <Text style={{ ...styles.text }}>{selectedProduct.ownerName}</Text>
            <Text style={{ ...styles.text, fontSize: 10 }}>
              {selectedProduct.storeLocation.city}
            </Text>
          </View>
          <View style={{ paddingVertical: 10, width: '40%' }}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('ViewProfileMarketplace', {
                  userId: selectedProduct.ownerId,
                  origin: 'Marketplace',
                })
              }
            >
              <View
                style={{
                  backgroundColor: theme.colors.primary,
                  paddingVertical: 5,
                  borderRadius: 15,
                  marginHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Bold',
                    fontSize: 13,
                    color: theme.colors.white,
                    marginHorizontal: 20,
                  }}
                >
                  View Shop
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Map
          ownerName={selectedProduct.ownerName}
          location={selectedProduct.storeLocation}
        />
        <View style={{ paddingHorizontal: 10 }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              backgroundColor: '#005da0',
              padding: 10,
              borderRadius: 30,
              marginVertical: 20,
            }}
            onPress={() => {
              let lat = selectedProduct.storeLocation.lat
              let lon = selectedProduct.storeLocation.lng
              if (Platform.OS === 'android' || 'web') {
                Linking.openURL(
                  `https://www.google.com/maps/dir/?api=1&origin=` +
                    10.240399 +
                    `,` +
                    123.837338 +
                    `&destination=` +
                    lat +
                    `,` +
                    lon +
                    `&travelmode=driving`
                )
              } else {
                console.log('Something Went Wrong?')
              }
            }}
          >
            <Text
              style={{
                marginTop: 5,
                marginBottom: 5,
                alignItems: 'center',
                color: '#fff',
                fontFamily: 'Bold',
              }}
            >
              Get Directions
            </Text>
          </TouchableOpacity>
        </View>
        <Spacer />
        {shopsNearby ? (
          <View>
            <Text
              style={{
                fontFamily: 'Medium',
                fontSize: 14,
                marginLeft: 10,
                marginTop: 15,
              }}
            >
              {' '}
              Similar{' '}
              {selectedProduct.category === 'fish' ? 'Fishermen' : 'Shops'}{' '}
              nearby
            </Text>
            <FlatList
              data={shopsNearby}
              horizontal={true}
              renderItem={({ item }) => (
                <ShopCard
                  shop={item}
                  navigation={props.navigation}
                  onSelect={() =>
                    props.navigation.navigate('ViewProfileMarketplace', {
                      userId: item.uuid,
                      origin: 'Marketplace',
                    })
                  }
                />
              )}
            />
          </View>
        ) : null}
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row' }}>
        <TouchableOpacity
          style={styles.actionButtonContainer}
          onPress={() =>
            props.navigation.navigate('Message', {
              guestUid: selectedProduct.ownerId,
              UserName: selectedProduct.ownerName,
              profilePic: selectedProduct.ownerPicture,
            })
          }
        >
          <Icon.MaterialCommunityIcons
            style={styles.headerIcon}
            name={'message-text-outline'}
            size={18}
            color={theme.colors.white}
          />
          <Text style={{ fontFamily: 'Medium', fontSize: 10, color: 'white' }}>
            Chat seller
          </Text>
        </TouchableOpacity>
        <View
          style={{
            borderColor: theme.colors.gray4,
            borderWidth: 0.4,
            marginVertical: 5,
          }}
        ></View>
        <TouchableOpacity
          style={styles.actionButtonContainer}
          onPress={() => {
            if (
              cartOwnerId !== undefined &&
              cartOwnerId !== selectedProduct.ownerId
            ) {
              Alert.alert(
                'Warning',
                'Cart will be replaced with another seller',
                [
                  { text: 'Cancel' },
                  {
                    text: 'OK',
                    onPress: () => {
                      dispatch(cartActions.addToCart(selectedProduct))
                      Toast.show({
                        text1: 'Added to cart',
                        position: 'bottom',
                        bottomOffset: theme.dimensions.height * 0.1,
                        type: 'success',
                      })
                    },
                  },
                ],
                { cancelable: false }
              )
            } else {
              dispatch(cartActions.addToCart(selectedProduct))
              Toast.show({
                text1: 'Added to cart',
                position: 'bottom',
                bottomOffset: theme.dimensions.height * 0.1,
                type: 'success',
              })
            }
          }}
        >
          <Icon.MaterialCommunityIcons
            style={styles.headerIcon}
            name={'cart-plus'}
            size={18}
            color={theme.colors.white}
          />
          <Text style={{ fontFamily: 'Medium', fontSize: 10, color: 'white' }}>
            Add to Cart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.actionButtonContainer,
            width: '50%',
            backgroundColor: theme.colors.accent2,
          }}
          onPress={() => {
            cartOwnerId !== undefined && cartOwnerId !== selectedProduct.ownerId
              ? Alert.alert(
                  'Warning',
                  'Cart will be replaced with another seller',
                  [
                    { text: 'Cancel' },
                    {
                      text: 'OK',
                      onPress: () => {
                        dispatch(cartActions.addToCart(selectedProduct))
                        props.navigation.navigate('Cart', {
                          origin: 'Marketplace',
                          ownerId: selectedProduct.ownerId,
                        })
                      },
                    },
                  ],
                  { cancelable: false }
                )
              : dispatch(cartActions.addToCart(selectedProduct))
            props.navigation.navigate('Cart', {
              origin: 'Marketplace',
              ownerId: selectedProduct.ownerId,
            })
          }}
        >
          <Text
            style={{
              fontFamily: 'Bold',
              fontSize: 14,
              color: theme.colors.primary,
              paddingVertical: 12,
            }}
          >
            Buy Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.productTitle,
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: theme.dimensions.height * 0.55,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  price: {
    fontSize: 16,
    marginLeft: 20,
    paddingBottom: 10,
    fontFamily: 'Regular',
  },
  description: {
    fontFamily: 'Regular',
    fontSize: 14,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  bold: {
    fontFamily: 'Bold',
    marginHorizontal: 20,
  },
  fishtype: {
    fontFamily: 'Bold',
    marginRight: 10,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Regular',
  },
  smallButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 93, 160, 0.2)',
    borderRadius: 23,
  },
  smallButtonText: {
    color: theme.colors.primary,
    fontFamily: 'Bold',
  },
  headerIcon: {
    height: 25,
    width: 25,
  },
  actionButtonContainer: {
    width: '25%',
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 93, 160, 0.9)',
  },
  avatarImage: {
    height: 50,
    width: 50,
    borderColor: theme.colors.white,
    borderWidth: 2,
    borderRadius: 60,
    marginRight: 5,
  },
})

export default ProductDetailScreen
