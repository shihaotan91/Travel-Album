var express = require('express')
var app = express()
var layout = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var dotenv = require('dotenv')
var path = require('path')
var logger = require('morgan')
var methodOverride = require('method-override')

var flash = require('connect-flash')
var session = require('express-session')

var passport = require('passport')
var MongoStore = require('connect-mongo')(session)

var port = 3000

var mongoose = require('mongoose')
mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost/project2')

dotenv.load({ path: '.env.' + process.env.NODE_ENV })
mongoose.connect(process.env.MONGO_URI)

app.set('view engine', 'ejs')
app.use(layout)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(session({
  secret: process.env.EXPRESS_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGO_URI,
    mongooseConnection: mongoose.connection,
    autoReconnect: true
  })
}))

app.use(methodOverride(function(req, res){
 if (req.body && typeof req.body === 'object' && '_method' in req.body) {
   // look in urlencoded POST bodies and delete it
   var method = req.body._method
   delete req.body._method
   return method
 }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use(express.static(__dirname + '/public'))

app.use(logger('dev'))

var home = require('./routes/home')

var user = require('./routes/user/user')
var user_api_routes = require('./routes/user/user_api')

var post = require('./routes/post/post')

// var comment = require('./routes/post/comment')

require('./config/passport')(passport)

app.use('/', home)
app.use('/user', user)
app.use('/api/user', user_api_routes)

app.use('/post', post)

// app.use('/comment', comment)

app.listen(process.env.PORT || 3000)
console.log('Server running at http://localhost:' + port + '/')
