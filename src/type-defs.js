'use strict'

const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    transactions: [Transaction]
  }
  type Transaction {
    id: String
    amount: Int
    title: String
    createdAt: String
    updatedAt: String
  }
  type Mutation {
    addTransaction(title: String, amount: Float): Transaction
    removeTransaction(id: String): Boolean
  }
`
