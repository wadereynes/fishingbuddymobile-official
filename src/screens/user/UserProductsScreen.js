import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  Alert,
  StyleSheet,
  Image,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { HeaderSimple } from '../../components/marketplace/HeaderSimple'

import HeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/marketplace/ProductItem'
import Colors from '../../constants/Colors'
import * as productsActions from '../../store/actions/products'
import { theme } from '../../constants'

const UserProductsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState()
  const userProducts = useSelector((state) => state.products.userProducts)
  const dispatch = useDispatch()

  const loadProducts = useCallback(async () => {
    setError(null)
    setIsRefreshing(true)
    try {
      await dispatch(productsActions.fetchProducts())
    } catch (err) {
      setError(err.message)
    }
    setIsRefreshing(false)
  }, [dispatch, setIsLoading, setError])

  const editProductHandler = (id) => {
    props.navigation.navigate('EditProduct', { productId: id, origin: 'Marketplace', headerTitle:'Edit Product' })
  }

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productsActions.deleteProduct(id))
        },
      },
    ])
  }

  if (userProducts.length === 0) {
    return (
      <View>
        <HeaderSimple headerTitle={'Products'} navigation={props.navigation} origin={props.route.params ? props.route.params.origin ? props.route.params.origin  : null : null}/>
        <View style={{ width: '100%', marginTop: theme.dimensions.height * 0.2 }}>
            <View style={{ alignItems:'center', marginTop: 40,  width:'100%'}}>
              <Image 
                  source={require('../../assets/icons/groceries.png')} 
                  style={{ width: 100, height: 100, marginHorizontal: 50}}
                  transition={false}
              />
            </View>
        </View>
        <View style={{ alignItems:'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: 'Bold', fontSize: 14, marginVertical: 10, justifyContent:'center' }}>No products listed</Text>
        </View>
    </View>
    )
  }

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', loadProducts)

    return () => {
      unsubscribe()
    }
  }, [loadProducts])

  useEffect(() => {
    setIsLoading(true)
    loadProducts().then(() => {
      setIsLoading(false)
    })
  }, [dispatch, loadProducts])

  // if (isLoading) {
  //   return (
  //     <View style={styles.centered}>
  //       <ActivityIndicator size='large' color={Colors.primary} />
  //     </View>
  //   )
  // }

  return (
      <View>
        <HeaderSimple headerTitle={'Products'} navigation={props.navigation} origin={props.route.params ? props.route.params.origin ? props.route.params.origin  : null : null}/>
        {/* <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: 'row'}}>
          <View style={{ paddingRight: 10}}>
            <Image source={require('../../assets/icons/goods.png')} style={{ width: 30, height: 30}} />
          </View>
          <Text style={{ fontFamily:'Medium', fontSize: 16, paddingTop: 5 }}>My Products</Text>
        </View> */}
        <FlatList
          contentContainerStyle={{paddingBottom: theme.dimensions.height * 0.2}}
          numColumns={2}
          onRefresh={loadProducts}
          refreshing={isRefreshing}
          style={styles.item}
          data={userProducts}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
              <ProductItem
              // image={itemData.item.imageUrl}
              image={itemData.item.urlPhoto}
              title={itemData.item.title}
              category={itemData.item.category}
              price={itemData.item.price}
              onSelect={() => {
                editProductHandler(itemData.item.id)
              }}
            >
              <Button
                color={Colors.primary}
                title='Edit'
                onPress={() => {
                  editProductHandler(itemData.item.id)
                }}
              />
              <Button
                color={Colors.primary}
                title='Delete'
                onPress={deleteHandler.bind(this, itemData.item.id)}
              />
            </ProductItem>
            
          )}
        />
    </View>
    
    
  )
}

export const screenOptions = (navData) => {
  return {
    // headerTitle: 'My Product',

    // headerLeft: () => (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title='Menu'
    //       iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
    //       onPress={() => {
    //         navData.navigation.toggleDrawer()
    //       }}
    //     />
    //   </HeaderButtons>
    // ),
    // headerRight: () => (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title='Add'
    //       iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
    //       onPress={() => {
    //         navData.navigation.navigate('EditProduct')
    //       }}
    //     />
    //   </HeaderButtons>
    // ),
  }
}

const styles = StyleSheet.create({
  item: { width: '200%' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})

export default UserProductsScreen
