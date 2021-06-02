class CartItem {
  constructor(
    quantity,
    productPrice,
    productTitle,
    sum,
    urlPhoto,
    ownerId,
    pushToken
  ) {
    this.quantity = quantity
    this.productPrice = productPrice
    this.productTitle = productTitle
    this.sum = sum
    this.urlPhoto = urlPhoto
    this.ownerId = ownerId
    this.pushToken = pushToken
  }
}

export default CartItem
