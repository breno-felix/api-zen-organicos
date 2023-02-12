const route = require('express').Router()
const ProductController = require('../../controllers/product/ProductController')
const ProductUploadController = require('../../controllers/product/ProductUploadController')
const authMiddleware = require('../../middlewares/auth')
const authAdminMiddleware = require('../../middlewares/authAdmin')
const multerMiddleware = require('../../middlewares/multer')

route.post(
  '/new-product',
  authMiddleware,
  authAdminMiddleware,
  ProductController.store
)
route.get('/index-product', authMiddleware, ProductController.index)
route.post(
  '/upload-product',
  authMiddleware,
  authAdminMiddleware,
  multerMiddleware,
  ProductUploadController.upload
)

module.exports = route
