"use strict";

var fs = require('fs')
var path = require('path')

var getIndexById = (id, a) => {
  for (var i = 0; i < a.length; i++) {
    if(a[i].id.indexOf(id) > -1) {
      return i
    }
  }
}

var getBeerById = (id, beers) => {
  return beers[getIndexById(id, beers)]
}

var putBeer = (beer, beers) => {
  beers[getIndexById(beer.id), beers] = beer
}

module.exports = function(id, vote) {
  // console.log(id, vote)
  return new Promise( function ( resolve, reject ) {
    try {
      var file = path.join(__dirname, 'beers.json')
      var beers = JSON.parse(fs.readFileSync( file, { encoding: 'utf8' }))
      // console.log(beers)
      var beer = getBeerById(id, beers)
      var votes = beer.votes
      console.log(votes)
      var votesSum = 0
      var found = false
      for (var i = 0; i < votes.length; i++) {
        if(votes[i].user.indexOf(vote.user) > -1) {
          votes.splice(i, 1, vote)
          votesSum += vote.vote
          found = true
        } else {
          votesSum += votes[i].vote
        }
      }
      if(!found) {
        beer.votes.push(vote)
        votesSum += vote.vote
      }
      console.log(votesSum, votes.length)
      beer.averageVote = votesSum / votes.length
      fs.writeFileSync(file, JSON.stringify(beers), { encoding: 'utf8' })
      resolve({
        status: 201,
        send: 'Vote was saved'
      })
    } catch(e) {
      reject({
        status: 500,
        send: e.message
      })
    }
    
  } )
}