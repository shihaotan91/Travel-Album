var express = require('express')
var app = express()
var layout = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var dotenv = require('dotenv')
var mongoose = require('mongoose')
var path = require('path')
var logger = require('morgan')

var port = 3000

mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost/project2')

dotenv.load({ path: '.env.' + process.env.NODE_ENV })
mongoose.connect(process.env.MONGO_URI)

app.set('view engine', 'ejs')
app.use(layout)

app.use(express.static(__dirname + '/public'))

app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

var home = require('./routes/home')

var user = require('./routes/user/user')
var user_api_routes = require('./routes/user/user_api')


app.use('/', home)
app.use('/user', user)
app.use('/api/user', user_api_routes)

app.listen(3000)
console.log('Server running at http://localhost:' + port + '/')
