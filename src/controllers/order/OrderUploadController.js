const ProductService = require('../../services/product/ProductService')
const OrderService = require('../../services/order/OrderService')
const { Readable } = require('stream')
const readline = require('readline')

const upload = async (request, response) => {
  const { buffer } = request.file
  const readableFile = new Readable()
  readableFile.push(buffer)
  readableFile.push(null)

  const ordersLine = readline.createInterface({
    input: readableFile
  })

  const products = []
  for await (const line of ordersLine) {
    const ordersLineSplited = line.split(' ')

    let quantity = ordersLineSplited[0]
    quantity = parseFloat(quantity)

    let name = [].concat(ordersLineSplited.slice(1, ordersLineSplited.length))
    name = name.join(' ')
    const loadProduct = await ProductService.loadByName(name)
    const product_id = loadProduct._id.toString()

    const objectOrder = {
      product_id,
      quantity
    }

    products.push(objectOrder)
  }

  const editedProductsOrder = await Promise.all(
    products.map(async (item) => {
      const product = await ProductService.loadById(item.product_id)
      if (!product) {
        return response.status(400).json({ error: 'product must exist' })
      }
      const newItem = {
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          supplier: product.supplier
        },
        quantity: item.quantity,
        value: product.price * item.quantity
      }
      return newItem
    })
  )
  const order = {
    user: {
      id: request.userId,
      name: request.userName
    },
    products: editedProductsOrder
  }

  await OrderService.create(order)
  return response
    .status(201)
    .json(
      'The request was successful and a new resource was created as a result.'
    )
}

module.exports = { upload }
