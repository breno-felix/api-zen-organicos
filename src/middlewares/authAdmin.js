const UserService = require('../services/user/UserService')

module.exports = async (request, response, next) => {
  const { admin: isAdmin } = await UserService.loadById(request.userId)

  if (!isAdmin) {
    return response
      .status(403)
      .json({ error: 'Access denied you do not have permission to access' })
  }

  return next()
}
