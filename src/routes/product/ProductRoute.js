const route = require('express').Router()
const ProductController = require('../../controllers/product/ProductController')

route.post('/new-product', ProductController.store)
route.get('/index-product', ProductController.index)

module.exports = route
