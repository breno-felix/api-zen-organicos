const route = require('express').Router()
const ProductController = require('../../controllers/product/ProductController')
const authMiddleware = require('../../middlewares/auth')
const authAdminMiddleware = require('../../middlewares/authAdmin')

route.post(
  '/new-product',
  authMiddleware,
  authAdminMiddleware,
  ProductController.store
)
route.get('/index-product', authMiddleware, ProductController.index)

module.exports = route
