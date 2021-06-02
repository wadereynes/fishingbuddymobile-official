import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart'
import { ADD_ORDER } from '../actions/orders'
import CartItem from '../../models/cart-item'
import { DELETE_PRODUCT } from '../actions/products'

const initialState = {
  items: {},
  totalAmount: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product
      const prodPrice = addedProduct.price
      const prodTitle = addedProduct.title
      const urlPhoto = addedProduct.urlPhoto
      const sellerId = addedProduct.ownerId
      const sellerName = addedProduct.ownerName
      const sellerAddress = addedProduct.address
      const sellerImage = addedProduct.ownerPicture
      const pushToken = addedProduct.pushToken

      let updatedOrNewCartItem

      if (state.items[addedProduct.id]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice,
          urlPhoto,
          sellerId,
          pushToken
        )
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          prodPrice,
          prodTitle,
          prodPrice,
          urlPhoto,
          sellerId,
          pushToken
        )
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
        sellerName: sellerName,
        sellerId: sellerId,
        sellerAddress: sellerAddress,
        sellerImage: sellerImage,
      }
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid]
      const currentQty = selectedCartItem.quantity
      let updatedCartItems
      if (currentQty > 1) {
        // reduce qty by 1
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice,
          selectedCartItem.urlPhoto,
          selectedCartItem.ownerId,
          selectedCartItem.pushToken
        )
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem }
      } else {
        // erase
        updatedCartItems = { ...state.items }
        delete updatedCartItems[action.pid]
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      }
    case ADD_ORDER:
      return initialState
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state
      }
      const updatedItems = { ...state.items }
      const itemTotal = state.items[action.pid].sum
      delete updatedItems[action.pid]
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      }
  }
  return state
}
