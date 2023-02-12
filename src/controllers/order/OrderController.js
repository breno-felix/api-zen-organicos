const ProductService = require('../../services/product/ProductService')
const OrderService = require('../../services/order/OrderService')
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

module.exports = { store }
