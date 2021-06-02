import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/marketplace/ProductItem'
import * as cartActions from '../../store/actions/cart'
import * as productsActions from '../../store/actions/products'
import Colors from '../../constants/Colors'
import { MarketplaceHeader } from '../../components/marketplace/MarketplaceHeader'
import { theme } from '../../constants'
import { firebase } from '../../config/firebase'
import { Categories } from '../../components/marketplace/Categories'
import { Loading } from '../../components/common/Loading'

const ProductsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState()
  const products = useSelector((state) => state.products.availableProducts)
  const dispatch = useDispatch()
  const [userProfile, setUserProfile] = useState()

  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [categoryText, setCategoryText] = useState('all')
  const [locationText, setLocationText] = useState('all')
  const [filteredProducts, setFilteredProducts] = useState()

  let SearchText
  let Category
  let LocationText
  async function SearchProd() {
    SearchText = (await props.route.params.searchTextWade)
      ? await props.route.params.searchTextWade
      : ''
    Category = (await props.route.params.categoryText)
      ? await props.route.params.categoryText
      : 'all'
    LocationText = (await props.route.params.locationText)
      ? await props.route.params.locationText
      : 'all'

    setSearchText(SearchText)
    setCategoryText(Category.toLowerCase())
    setLocationText(LocationText.toLowerCase())
  }
  SearchProd()

  console.log('searchText: ', searchText)
  console.log('categoryText: ', categoryText)
  console.log('locationText: ', locationText)

  const loadProducts = useCallback(async () => {
    setError(null)
    setIsRefreshing(true)
    try {
      await dispatch(productsActions.fetchProducts())
      await getUserDetails()
    } catch (err) {
      setError(err.message)
    }
    setIsRefreshing(false)
    getUserDetails()
  }, [dispatch, setIsLoading, setError])

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

  useEffect(() => {
    getUserDetails()
  }, [])

  const getUserDetails = async () => {
    var currentUser = firebase.auth().currentUser
    if (currentUser) {
      return new Promise(function (resolve, reject) {
        try {
          firebase
            .database()
            .ref('user/' + currentUser.uid)
            .once('value', (snapshot) => {
              if (snapshot.exists()) {
                resolve(snapshot.val())
                setUserProfile(snapshot.val())
              }
            })
        } catch (e) {
          reject(e)
        }
      })
    }
  }

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    })
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error ocurred!</Text>
        <Button
          title='Try again'
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Loading name={'Loading...'} />
      </View>
    )
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    )
  }

  let friends = products.slice()
  if (searchText !== '' && categoryText === 'all' && locationText === 'all') {
    if (searchText !== '' && categoryText === 'all' && locationText === 'all') {
      friends = products
        .filter((item) =>
          item.title.toLowerCase().includes(searchText.toLowerCase())
        )
        .reverse()
    } else {
    }
  }

  if (searchText === '' && categoryText !== 'all' && locationText === 'all') {
    if (searchText === '' && categoryText !== 'all' && locationText === 'all') {
      friends = products
        .filter((item) =>
          item.category.toLowerCase().includes(categoryText.toLowerCase())
        )
        .reverse()
    } else {
    }
  }

  if (searchText === '' && categoryText === 'all' && locationText !== 'all') {
    if (searchText === '' && categoryText === 'all' && locationText !== 'all') {
      friends = products
        .filter((item) =>
          item.address.toLowerCase().includes(locationText.toLowerCase())
        )
        .reverse()
    } else {
    }
  }

  if (searchText === '' && categoryText !== 'all' && locationText !== 'all') {
    if (searchText === '' && categoryText !== 'all' && locationText !== 'all') {
      friends = products
        .filter(
          (item) =>
            item.address.toLowerCase().includes(locationText.toLowerCase()) &&
            item.category.toLowerCase().includes(categoryText.toLowerCase())
        )
        .reverse()
    } else {
    }
  }

  friends.reverse()

  return (
    <View>
      <MarketplaceHeader navigation={props.navigation} user={userProfile} />
      <Categories navigation={props.navigation} hideHeading />
      <View style={{ flexGrow: 1 }}>
        <FlatList
          contentContainerStyle={{
            paddingBottom: theme.dimensions.height * 0.8,
          }}
          onRefresh={loadProducts}
          refreshing={isRefreshing}
          data={friends}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <ProductItem
              style={styles.item}
              // image={itemData.item.imageUrl}
              image={itemData.item.urlPhoto}
              title={itemData.item.title}
              category={itemData.item.category}
              price={itemData.item.price}
              location={itemData.item.address}
              onSelect={() => {
                selectItemHandler(itemData.item.id, itemData.item.title)
              }}
            />
          )}
        />
      </View>
    </View>
  )
}

export const screenOptions = (navData) => {
  return {
    headerTitle: 'All Products',
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ProductsOverviewScreen
