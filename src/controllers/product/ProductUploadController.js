const ProductService = require('../../services/product/ProductService')
const { Readable } = require('stream')
const readline = require('readline')

const upload = async (request, response) => {
  try {
    const { buffer } = request.file
    const readableFile = new Readable()
    readableFile.push(buffer)
    readableFile.push(null)

    const productsLine = readline.createInterface({
      input: readableFile
    })

    let firstLine = true
    for await (const line of productsLine) {
      if (firstLine) {
        firstLine = false
        continue
      }
      const productsLine = line.split(',')

      const supplier = productsLine[0]

      let name = [].concat(productsLine.slice(1, productsLine.length - 2))
      name = name.join()

      let price = [].concat(productsLine.slice(-2))
      price = price.join()
      price = price.replace(',', '.')
      price = price.replace('"', '')
      price = parseFloat(price)

      await ProductService.create({
        supplier,
        name,
        price
      })
    }
    return response
      .status(201)
      .json(
        'The request was successful and a new resource was created as a result.'
      )
  } catch (error) {
    return response.status(400).json({ error })
  }
}

module.exports = { upload }
