const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  user: {
    id: { type: String, required: true },
    name: { type: String, required: true }
  },
  products: [
    {
      product: {
        id: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        supplier: { type: String, required: true }
      },
      quantity: { type: Number, required: true, min: 0 },
      value: { type: Number, required: true, min: 0 }
    }
  ],
  status: { type: String, required: true, default: 'Pedido realizado' }
})

OrderSchema.set('timestamps', true)

module.exports = mongoose.model('Order', OrderSchema)
