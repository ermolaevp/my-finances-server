'use strict'

const admin = require('firebase-admin')
const config = require('./config')

admin.initializeApp({
  credential: admin.credential.cert(config),
  databaseURL: 'https://finances-202212.firebaseio.com'
})

module.exports = {
  getAuthScope: function (authHeader) {
    const matches = /Bearer\s(.*)/.exec(authHeader)
    return matches && admin.auth().verifyIdToken(matches[1])
  }
}
