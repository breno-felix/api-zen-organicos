const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false }
})

UserSchema.set('timestamps', true)

UserSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10)
})

module.exports = mongoose.model('User', UserSchema)
