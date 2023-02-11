const User = require('../../models/User')

const create = (body) => User.create(body)
const loadByEmail = (email) => User.findOne({ email })

module.exports = {
  create,
  loadByEmail
}
