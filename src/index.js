require('./models/User')
const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const bodyParser = require('body-parser')
const requireAuth = require('./middlewares/requireAuth')

const app = express()

app.use(bodyParser.json())
app.use(authRoutes)

const mongoUri =
    'mongodb+srv://admin:password1234@cluster0-4eslz.mongodb.net/<dbname>?retryWrites=true&w=majority'

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
})

mongoose.connection.on('connected', () => {
    console.log('Connected mongo instance')
})

mongoose.connection.on('error', () => {
    console.error('Error connection to mongo', error)
})

/*
Below: 
Any time someone makes a GET type http request to our root route of application 
we want to run this function

the function gets run automatically with a requst object

res object: represents out going response

*/
app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`)
})

app.listen(3000, () => {
    console.log('Listening on Port 3000')
})
