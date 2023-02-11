const hello = (request, response) => {
  return response.json({ message: 'Hello world!' })
}

module.exports = { hello }
