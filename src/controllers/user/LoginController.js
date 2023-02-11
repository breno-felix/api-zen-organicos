const UserService = require('../../services/user/UserService')
const yup = require('yup')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const env = require('../../config/envfile')

const store = async (request, response) => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
  })
  if (!(await schema.isValid(request.body))) {
    return response
      .status(400)
      .json({ error: 'Make sure your password or email are correct' })
  }

  const { email, password } = request.body

  const userExists = await UserService.loadByEmail(email)
  if (!userExists) {
    return response
      .status(400)
      .json({ error: 'Make sure your password or email are correct' })
  }

  const authorized = await bcrypt.compare(password, userExists.password)
  if (!authorized) {
    return response.status(401).json({ error: 'Unauthorized' })
  }

  const token = jwt.sign({ id: userExists._id }, env.secret, {
    expiresIn: env.expiresIn
  })
  return response.status(200).json({ token })
}

module.exports = { store }
