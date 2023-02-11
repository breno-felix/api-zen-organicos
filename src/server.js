const app = require('./config/app')
const env = require('./config/envfile')
const mongoose = require('mongoose')

console.log('Wait connecting to the database')

mongoose.set('strictQuery', true)
mongoose
  .connect(env.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Atlas Connected')
    app.listen(env.port, () => console.log(`server running at ${env.appUrl}`))
  })
  .catch(console.error)
