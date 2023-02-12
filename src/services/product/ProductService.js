const Product = require('../../models/Product')

const create = (body) => Product.create(body)
const loadAll = () => Product.find()

module.exports = {
  create,
  loadAll
}
