const UserRoute = require('../routes/user/UserRoute')

module.exports = (app) => {
  app.use('/api', UserRoute)
}
