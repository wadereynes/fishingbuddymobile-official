import Product from '../../models/product'
import { firebase } from '../../config/firebase'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    //const userId = getState().auth.userId //to get the user id
    const userId = firebase.auth().currentUser.uid

    try {
      const response = await fetch(
        'https://fishingbuddy-mobile.firebaseio.com/products.json'
      )

      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const resData = await response.json()
      const loadedProducts = []

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].urlPhoto,
            resData[key].category,
            resData[key].isListed,
            resData[key].storeLocation,
            resData[key].address,
            resData[key].stock,
            // resData[key].imageUrl,
            resData[key].description,
            resData[key].price,
            resData[key].ownerName,
            resData[key].ownerPicture,
            resData[key].fishSelected,
            resData[key].ownerPushToken
          )
        )
      }
      dispatch({
        type: SET_PRODUCTS,
        // products: loadedProducts,
        products: loadedProducts.filter((prod) => prod.isListed === 'yes'),
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
      })
    } catch (err) {
      throw err
    }
  }
}

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    //const token = getState().auth.token //to get the token
    const response = await fetch(
      // `https://fishingbuddy-mobile.firebaseio.com/products/${productId}.json?auth=${token}`,
      `https://fishingbuddy-mobile.firebaseio.com/products/${productId}.json`,
      {
        method: 'DELETE',
      }
    )

    if (!response.ok) {
      throw new Error('Something went wrong!')
    }

    dispatch({ type: DELETE_PRODUCT, pid: productId })
  }
}

export const createProduct = (
  title,
  description,
  urlPhoto,
  category,
  isListed,
  stock,
  // imageUrl,
  price,
  fishSelected,
  createdDate
) => {
  return async (dispatch, getState) => {
    //const token = getState().auth.token //to get the token
    //const userId = getState().auth.userId //to get the user id
    let pushToken
    let statusObj = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    if (statusObj.status !== 'granted') {
      statusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    }
    if (statusObj.status !== 'granted') {
      pushToken = null
    } else {
      pushToken = (await Notifications.getExpoPushTokenAsync()).data
    }
    const userId = firebase.auth().currentUser.uid
    const getName = await fetch(
      `https://fishingbuddy-mobile.firebaseio.com/user/${userId}/firstName.json`
    )
    const getProfileImage = await fetch(
      `https://fishingbuddy-mobile.firebaseio.com/user/${userId}/profilePicture.json`
    )
    const getstoreAddress = await fetch(
      `https://fishingbuddy-mobile.firebaseio.com/user/${userId}/storeAddress.json`
    )

    const getstoreLocation = await fetch(
      `https://fishingbuddy-mobile.firebaseio.com/user/${userId}/storeAddressMap.json`
    )

    const nameData = await getName.json()
    const profileImageData = await getProfileImage.json()
    const address = await getstoreAddress.json()
    const storeLocation = await getstoreLocation.json()
    const response = await fetch(
      //`https://fishingbuddy-mobile.firebaseio.com/products.json?auth=${token}`,
      `https://fishingbuddy-mobile.firebaseio.com/products.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          urlPhoto,
          category,
          isListed,
          storeLocation: storeLocation,
          address: address,
          stock,
          ownerName: nameData,
          ownerPicture: profileImageData,
          // imageUrl,
          price,
          ownerId: userId,
          fishSelected,
          createdDate,
          ownerPushToken: pushToken,
        }),
      }
    )

    const resData = await response.json()

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        urlPhoto,
        category,
        isListed,
        storeLocation,
        address,
        stock,
        ownerName: nameData,
        ownerPicture: profileImageData,
        // imageUrl,
        price,
        ownerId: userId,
        fishSelected,
        pushToken: pushToken,
      },
    })
  }
}

export const updateProduct = (
  id,
  title,
  description,
  urlPhoto,
  category,
  isListed,
  stock,
  price
) => {
  return async (dispatch, getState) => {
    //const token = getState().auth.token //to get the token
    const userId = firebase.auth().currentUser.uid
    const getstoreLocation = await fetch(
      `https://fishingbuddy-mobile.firebaseio.com/user/${userId}/storeAddressMap.json`
    )
    const storeLocation = await getstoreLocation.json()
    const response = await fetch(
      //`https://fishingbuddy-mobile.firebaseio.com/products/${id}.json?auth=${token}`,
      `https://fishingbuddy-mobile.firebaseio.com/products/${id}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          urlPhoto,
          category,
          isListed,
          storeLocation: storeLocation,
          stock,
          // imageUrl,
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Something went wrong!')
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        // imageUrl,
        urlPhoto,
        category,
        isListed,
        storeLocation,
        stock,
        price,
      },
    })
  }
}
