const route = require('express').Router()
const OrderController = require('../../controllers/order/OrderController')
const OrderUploadController = require('../../controllers/order/OrderUploadController')
const authMiddleware = require('../../middlewares/auth')
const authAdminMiddleware = require('../../middlewares/authAdmin')
const multerMiddleware = require('../../middlewares/multer')

route.post('/new-order', authMiddleware, OrderController.store)
route.get(
  '/index-order',
  authMiddleware,
  authAdminMiddleware,
  OrderController.index
)
route.post(
  '/upload-order',
  authMiddleware,
  multerMiddleware,
  OrderUploadController.upload
)
route.patch(
  '/update-order/:order_id',
  authMiddleware,
  authAdminMiddleware,
  OrderController.update
)

module.exports = route
