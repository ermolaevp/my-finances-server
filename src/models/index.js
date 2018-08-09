'use strict'

const Mongoose = require('mongoose')

module.exports = {
  Transaction: Mongoose.model('Transactions', new Mongoose.Schema({
    amount: Number,
    createdAt: { type: Mongoose.Schema.Types.Date, default: Date.now },
    id: Mongoose.Schema.Types.ObjectId,
    title: String,
    uid: String,
    updatedAt: { type: Mongoose.Schema.Types.Date, default: Date.now }
  }))
}
