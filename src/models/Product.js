const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  supplier: { type: String, required: true }
})

ProductSchema.set('timestamps', true)

module.exports = mongoose.model('Product', ProductSchema)
