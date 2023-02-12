const route = require('express').Router()
const ProductController = require('../../controllers/product/ProductController')
const authMiddleware = require('../../middlewares/auth')

route.use(authMiddleware)
route.post('/new-product', ProductController.store)
route.get('/index-product', ProductController.index)

module.exports = route
