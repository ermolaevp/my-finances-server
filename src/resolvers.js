'use strict'

const { Transaction } = require('./models')

module.exports = {
  Mutation: {
    async addTransaction (_root, args, context) {
      const user = await context.authScope
      const newTransaction = new Transaction({
        amount: args.amount,
        title: args.title,
        uid: user.uid
      })
      newTransaction.id = newTransaction._id
      return new Promise((resolve, reject) => {
        newTransaction.save((err) => {
          if (err) { reject(err) } else { resolve(newTransaction) };
        })
      })
    },
    async removeTransaction (_root, args, context) {
      const user = await context.authScope
      return Transaction.remove({ uid: user.uid, id: args.id })
    }
  },
  Query: {
    async transactions (_root, _args, context) {
      const user = await context.authScope
      return Transaction.find({ uid: user.uid }).sort({ createdAt: -1 })
    }
  },
  Transaction: {

  }
}
