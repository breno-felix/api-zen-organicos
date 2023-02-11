const route = require('express').Router()
const UserController = require('../../controllers/user/UserController')

route.post('/sign-up', UserController.store)

module.exports = route
