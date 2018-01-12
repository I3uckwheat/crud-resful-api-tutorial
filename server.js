const express = require("express")
const logger = require("morgan")
const errorhandler = require("errorhandler")
const mongodb = require("mongodb")
const bodyParser = require("body-parser")

const url = "mongod://localhost:27017/edx-course-db"
const app = express()
app.use(logger('dev'))
app.use(bodyParser.json());

mongodb.MongoClient.connect(url, (error, client) => {
  if(error) return process.exit(1);
  const db = client.db;

  app.get('/accounts', (req, res) => {
    db.collection('accounts')
        .find({}, {sort: {_id: -1}})
        .toArray((error, accounts) => {
          if(error) return next(error)
          res.send(accounts);
        })
  })
})
