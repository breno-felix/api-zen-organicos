const express = require('express')
const routes = require('./routes')
const middlewares = require('./middleware')

class App {
  constructor() {
    this.app = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    middlewares(this.app)
  }

  routes() {
    routes(this.app)
  }
}

module.exports = new App().app
