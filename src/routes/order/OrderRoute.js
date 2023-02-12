const route = require('express').Router()
const OrderController = require('../../controllers/order/OrderController')
const OrderUploadController = require('../../controllers/order/OrderUploadController')
const authMiddleware = require('../../middlewares/auth')
const multerMiddleware = require('../../middlewares/multer')

route.post('/new-order', authMiddleware, OrderController.store)
route.post(
  '/upload-order',
  authMiddleware,
  multerMiddleware,
  OrderUploadController.upload
)

module.exports = route
