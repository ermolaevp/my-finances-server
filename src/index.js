'use strict'

const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const Mongoose = require('mongoose')
const Raven = require('raven')
const { getAuthScope } = require('./firebase-admin-sdk')
const resolvers = require('./resolvers')
const typeDefs = require('./type-defs')

const app = express()

/**
 * MongoDB connection
 */
Mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })

/**
 * Sentry
 */
if (app.get('env') === 'production') {
  Raven.config(process.env.SENTRY_DNS).install()
}

const context = ({ req }) => ({
  authScope: getAuthScope(req.headers.authorization)
})

const server = new ApolloServer({ typeDefs, resolvers, context })

server.applyMiddleware({ app })

app.set('port', process.env.SERVER_PORT || 3001)

app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'))
  console.log('Press CTRL-C to stop\n')
})
