class Product {
  constructor(
    id,
    ownerId,
    title,
    urlPhoto,
    category,
    isListed,
    storeLocation,
    address,
    stock,
    description,
    price,
    ownerName,
    ownerPicture,
    fishSelected,
    ownerPushToken
  ) {
    this.id = id
    this.ownerId = ownerId
    // this.imageUrl = imageUrl
    this.urlPhoto = urlPhoto
    this.category = category
    this.isListed = isListed
    this.address = address
    this.storeLocation = storeLocation
    this.stock = stock
    this.title = title
    this.description = description
    this.price = price
    this.ownerName = ownerName
    this.ownerPicture = ownerPicture
    this.fishSelected = fishSelected
    this.pushToken = ownerPushToken
  }
}

export default Product
