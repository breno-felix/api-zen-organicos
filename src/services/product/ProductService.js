const Product = require('../../models/Product')

const create = (body) => Product.create(body)
const loadAll = () => Product.find()
const loadById = (id) => Product.findById(id)

module.exports = {
  create,
  loadAll,
  loadById
}
