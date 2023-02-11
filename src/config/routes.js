const userRoute = require('../routes/user/user.route')

module.exports = (app) => {
  app.use('/api', userRoute)
}
