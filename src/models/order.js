import moment from 'moment'

class Order {
  constructor(
    id,
    items,
    totalAmount,
    date,
    buyerName,
    buyerImage,
    buyerAddress,
    sellerName,
    sellerImage,
    sellerAddress
  ) {
    this.id = id
    this.items = items
    this.totalAmount = totalAmount
    this.date = date
    this.buyerName = buyerName
    this.buyerImage = buyerImage
    this.buyerAddress = buyerAddress
    this.sellerName = sellerName
    this.sellerImage = sellerImage
    this.sellerAddress = sellerAddress
  }

  get readableDate() {
    // return this.date.toLocaleDateString('en-EN', {
    //   year: 'numeric',
    //   month: 'long',
    //   day: 'numeric',
    //   hour: '2-digit',
    //   minute: '2-digit',
    // })
    // return moment(this.date).format('MMMM Do YYYY, hh:mm')
    return moment(this.date).format('MMMM Do, YYYY')
  }
}

export default Order
