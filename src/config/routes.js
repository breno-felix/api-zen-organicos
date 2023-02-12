const UserRoute = require('../routes/user/UserRoute')
const ProductRoute = require('../routes/product/ProductRoute')

module.exports = (app) => {
  app.use('/api', UserRoute)
  app.use('/api', ProductRoute)
}
