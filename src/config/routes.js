const UserRoute = require('../routes/user/UserRoute')
const ProductRoute = require('../routes/product/ProductRoute')
const OrderRoute = require('../routes/order/OrderRoute')

module.exports = (app) => {
  app.use('/api', UserRoute)
  app.use('/api', ProductRoute)
  app.use('/api', OrderRoute)
}
