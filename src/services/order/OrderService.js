const Order = require('../../models/Order')

const create = (body) => Order.create(body)

module.exports = {
  create
}
