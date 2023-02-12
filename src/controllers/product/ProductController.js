const ProductService = require('../../services/product/ProductService')
const yup = require('yup')

const store = async (request, response) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    price: yup.number().required(),
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

module.exports = { store }
