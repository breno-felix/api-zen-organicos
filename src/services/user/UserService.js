const User = require('../../models/User')

const create = (body) => User.create(body)
const loadByEmail = (email) => User.findOne({ email })
const loadById = (id) => User.findById(id)

module.exports = {
  create,
  loadByEmail,
  loadById
}
