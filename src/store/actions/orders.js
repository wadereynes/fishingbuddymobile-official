import Order from '../../models/order'
import { firebase } from '../../config/firebase'

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    //const userId = getState().auth.userId //to get the user id
    const userId = firebase.auth().currentUser.uid
    try {
      const response = await fetch(
        `https://fishingbuddy-mobile.firebaseio.com/orders/${userId}.json`
      )

      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const resData = await response.json()
      const loadedOrders = []

      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date),
            resData[key].buyerName,
            resData[key].buyerImage,
            resData[key].buyerAddress,
            resData[key].sellerName,
            resData[key].sellerImage,
            resData[key].sellerAddress
          )
        )
      }

      dispatch({ type: SET_ORDERS, orders: loadedOrders })
    } catch (err) {
      throw err
    }
  }
}

export const fetchSales = () => {
  return async (dispatch, getState) => {
    const userId = firebase.auth().currentUser.uid
    try {
      const response = await fetch(
        `https://fishingbuddy-mobile.firebaseio.com/sales/${userId}.json`
      )

      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const resData = await response.json()
      const loadedOrders = []

      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date),
            resData[key].buyerName,
            resData[key].buyerImage,
            resData[key].buyerAddress
          )
        )
      }

      dispatch({ type: SET_ORDERS, orders: loadedOrders })
    } catch (err) {
      throw err
    }
  }
}

export const addOrder = (
  cartItems,
  totalAmount,
  sellerName,
  sellerAddress,
  sellerImage
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token //to get the token
    const userId = firebase.auth().currentUser.uid //to get the user id
    // const userId = getState().auth.userId //to get the user id
    // firebase
    //   .database()
    //   .ref(`user/${firebase.auth().currentUser.uid}`)
    //   .once('value', function (snapshot) {
    //     console.log(snapshot.val())
    //   })
    // console.log(firebase.auth().currentUser.uid)
    const date = new Date()
    const response = await fetch(
      //   `https://fishingbuddy-mobile.firebaseio.com/orders/${userId}.json?auth=${token}`,
      `https://fishingbuddy-mobile.firebaseio.com/orders/${userId}.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
          sellerName,
          sellerAddress,
          sellerImage,
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Something went wrong!')
    }

    const resData = await response.json()

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
        sellerName: sellerName,
        sellerAddress: sellerAddress,
        sellerImage: sellerImage,
      },
    })
  }
}

export const addOrderOwner = (cartItems, totalAmount, ownerId) => {
  return async (dispatch) => {
    const date = new Date()
    const userId = firebase.auth().currentUser.uid
    const getName = await fetch(
      `https://fishingbuddy-mobile.firebaseio.com/user/${userId}/firstName.json`
    )
    const getProfileImage = await fetch(
      `https://fishingbuddy-mobile.firebaseio.com/user/${userId}/profilePicture.json`
    )
    const gethomeAddress = await fetch(
      `https://fishingbuddy-mobile.firebaseio.com/user/${userId}/homeAddress.json`
    )
    const nameData = await getName.json()
    const profileImageData = await getProfileImage.json()
    const homeAddress = await gethomeAddress.json()
    const response = await fetch(
      `https://fishingbuddy-mobile.firebaseio.com/sales/${ownerId}.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
          buyerName: nameData,
          buyerImage: profileImageData,
          buyerAddress: homeAddress,
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Something went wrong!')
    }

    const resData = await response.json()

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
        buyerName: nameData,
        buyerImage: profileImageData,
        buyerAddress: homeAddress,
      },
    })

    for (const cartItem of cartItems) {
      const pushToken = cartItem.productPushToken

      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-Encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: pushToken,
          title: 'Order was placed!',
          body: cartItem.productTitle,
        }),
      })
    }
  }
}
