const route = require('express').Router()
const ProductController = require('../../controllers/product/ProductController')
const authMiddleware = require('../../middlewares/auth')
const authAdminMiddleware = require('../../middlewares/authAdmin')

route.use(authMiddleware)
route.post('/new-product', authAdminMiddleware, ProductController.store)
route.get('/index-product', ProductController.index)

module.exports = route
