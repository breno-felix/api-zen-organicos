const UserService = require('../../services/user/UserService')
const yup = require('yup')

const store = async (request, response) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    admin: yup.boolean()
  })

  try {
    await schema.validateSync(request.body, { abortEarly: false })
  } catch (err) {
    return response.status(400).json({ error: err.errors })
  }

  const userExists = await UserService.loadByEmail(request.body.email)

  if (userExists) {
    return response.status(400).json({ error: 'User already exists' })
  }

  await UserService.create(request.body)

  return response
    .status(201)
    .json(
      'The request was successful and a new resource was created as a result.'
    )
}

module.exports = { store }
