const route = require('express').Router()
const UserController = require('../../controllers/user/UserController')
const LoginController = require('../../controllers/user/LoginController')

route.post('/sign-up', UserController.store)
route.post('/login', LoginController.store)

module.exports = route
