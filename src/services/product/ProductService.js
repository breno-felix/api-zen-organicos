const Product = require('../../models/Product')

const create = (body) => Product.create(body)
const loadAll = () => Product.find()
const loadById = (id) => Product.findById(id)
const loadByName = (name) => Product.findOne({ name })
const updateOne = (id, object) => Product.updateOne({ _id: id }, object)

module.exports = {
  create,
  loadAll,
  loadById,
  loadByName,
  updateOne
}
