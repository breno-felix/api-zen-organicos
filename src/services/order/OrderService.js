const Order = require('../../models/Order')

const create = (body) => Order.create(body)
const loadAll = () => Order.find()
const updateOne = (id, status) => Order.updateOne({ _id: id }, { status })

module.exports = {
  create,
  loadAll,
  updateOne
}
