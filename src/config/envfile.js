const path = require('path')
const dotenv = require('dotenv')

dotenv.config({
  path: path.join(__dirname, '..', '..', '.env')
})

module.exports = {
  dbUrl: process.env.DB_URL,
  appUrl: process.env.APP_URL,
  port: process.env.PORT,
  secret: process.env.TOKEN_SECRET,
  expiresIn: process.env.TOKEN_EXPIRESIN
}
