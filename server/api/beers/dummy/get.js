"use strict";

var fs = require('fs')
var path = require('path')

module.exports = function() {
  return new Promise(function(resolve, reject) {
    fs.readFile( path.join(__dirname, 'beers.json'), {encoding: 'utf8'}, function(e, data) {
      if(e) {
        reject({
          status: 500,
          send: {message: 'Error while reading file beers.json'}
        })
      } else {
        resolve({
          status: 200,
          send: JSON.parse(data)
        })
      }
    })
  })
}
