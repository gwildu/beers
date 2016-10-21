'use strict'

var express = require('express')
var beersApi = express()
var helpers = {
  handleResult: function (res, result) {
    result
      .then(
        // resolve
        function (result){
          res.status(result.status).send(result.send)
        },
        // reject
        function (result) {
          res.status(result.status).send(result.send)
        }
      )
  }
}

/** list **/

beersApi.get('/beers', function (req, res, next) {
  var getBeers = require('./dummy/get.js')
  
  helpers.handleResult(res, getBeers())
})

beersApi.put('/beers', function (req, res, next) {
  var putBeers = require('./dummy/put.js')
  
  helpers.handleResult(res, putBeers(req.body.id, req.body.vote))
})

module.exports = beersApi
