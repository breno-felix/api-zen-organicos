const Order = require('../../models/Order')

const create = (body) => Order.create(body)
const loadAll = () => Order.find()

module.exports = {
  create,
  loadAll
}
