const route = require('express').Router()
const userController = require('../../controllers/user/user.controller')

route.get('/', userController.hello)

module.exports = route
