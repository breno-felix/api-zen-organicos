const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('../documentation/swagger')

module.exports = (app) => {
  app.use(express.json())
  app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}
