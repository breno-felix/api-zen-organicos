const OrderService = require('../../services/order/OrderService')
const ProductService = require('../../services/product/ProductService')
const yup = require('yup')

const store = async (request, response) => {
  const schema = yup.object().shape({
    products: yup
      .array()
      .required()
      .of(
        yup.object().shape({
          product_id: yup.string().required(),
          quantity: yup.number().required().positive().integer().min(1)
        })
      )
  })

  try {
    await schema.validateSync(request.body, { abortEarly: false })
  } catch (err) {
    return response.status(400).json({ error: err.errors })
  }
  const { products } = request.body

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

const index = async (request, response) => {
  const orders = await OrderService.loadAll()
  return response.status(200).json(orders)
}

const update = async (request, response) => {
  const schema = yup.object().shape({
    status: yup.string().required()
  })

  try {
    await schema.validateSync(request.body, { abortEarly: false })
  } catch (err) {
    return response.status(400).json({ error: err.errors })
  }

  const { status } = request.body
  const { order_id } = request.params

  try {
    await OrderService.updateOne(order_id, status)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }

  return response
    .status(204)
    .json(
      'The request was successfully processed but is not returning any content.'
    )
}

module.exports = { store, index, update }
