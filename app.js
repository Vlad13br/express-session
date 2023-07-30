const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const indexRouter = require('./routes/index')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.SECRET_KEY))
app.use(
  require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY,
  }),
)

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(3001, ()=> console.log("Server run"))
