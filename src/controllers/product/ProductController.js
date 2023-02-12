const ProductService = require('../../services/product/ProductService')
const yup = require('yup')

const store = async (request, response) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    price: yup.number().required().positive().moreThan(0),
    supplier: yup.string().required()
  })

  try {
    await schema.validateSync(request.body, { abortEarly: false })
  } catch (err) {
    return response.status(400).json({ error: err.errors })
  }

  await ProductService.create(request.body)

  return response
    .status(201)
    .json(
      'The request was successful and a new resource was created as a result.'
    )
}

const index = async (request, response) => {
  const products = await ProductService.loadAll()
  return response.status(200).json(products)
}

const update = async (request, response) => {
  const schema = yup.object().shape({
    name: yup.string(),
    price: yup.number().positive().moreThan(0),
    supplier: yup.string()
  })

  try {
    await schema.validateSync(request.body, { abortEarly: false })
  } catch (err) {
    return response.status(400).json({ error: err.errors })
  }

  const { product_id } = request.params
  const product = await ProductService.loadById(product_id)
  if (!product) {
    return response
      .status(400)
      .json({ error: 'Make sure your product is correct' })
  }

  const { name, price, supplier } = request.body
  await ProductService.updateOne(product_id, { name, price, supplier })

  return response
    .status(204)
    .json(
      'The request was successfully processed but is not returning any content.'
    )
}

module.exports = { store, index, update }
