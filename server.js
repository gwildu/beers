var throng = require('throng')
var path = require('path')

var WORKERS = process.env.WEB_CONCURRENCY || 1
var PORT = process.env.PORT || 8085
var ENV = process.env.NODE_ENV
var STATIC = (ENV === 'production' ? '/cdn' : '/dist')
var SERVER_PATH = path.join(__dirname, '/server')
console.log(SERVER_PATH)

// allow app clustering
throng({
  workers: WORKERS,
  lifetime: Infinity,
  start: startServer
})

function startServer () {
  var path = require('path')
  var express = require('express')
  var debug = require('debug')('webapp')
  var jade = require('jade')
  var viewHelpers = require(path.join(SERVER_PATH, '/utils/view-helpers'))
  var app = express()
  var api = require(path.join(SERVER_PATH, '/api'))
  var bodyParser = require('body-parser')
  
  // register bodyParser
  app.use(bodyParser.json({limit: '20mb', type: 'application/json'}))
  
  // register express helpers
  // those will be exposed to the templating engine
  app.locals.helpers = expressHelpers
  
  // warm up cache by precompiling pug/jade templates
  jade.compileFile(path.join(SERVER_PATH, '/views/index.jade'), { cache: true })
  
  // configure the view engine
  app
    .set('view engine', 'jade')
    .set('views', path.join(SERVER_PATH, '/views'))
  
  // configure static asset directory
  app
    .use(STATIC, express.static(path.join(__dirname, STATIC)))
  
  // configure routes
  app
    .get('/', homeRoute)
  
  for (var i = 0; i < api.length; i++) {
    app.use('/api', api[i])
  }
  
  // start the server
  app
    .listen(PORT, onListen)
  
  // Routes
  function homeRoute (req, res) {
    debug('Hit home route')
    res.render('index')
  }
  
  function onListen () {
    debug('server started on port ' + PORT)
    debug('Environment: ' + app.get('env'))
  }
}
