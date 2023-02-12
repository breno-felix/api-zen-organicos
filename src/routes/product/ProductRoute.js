const route = require('express').Router()
const ProductController = require('../../controllers/product/ProductController')

route.post('/new-product', ProductController.store)

module.exports = route
