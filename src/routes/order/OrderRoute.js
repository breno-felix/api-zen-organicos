const route = require('express').Router()
const OrderController = require('../../controllers/order/OrderController')
const authMiddleware = require('../../middlewares/auth')

route.post('/new-order', authMiddleware, OrderController.store)

module.exports = route
