const express = require('express')
const mongoose = require('mongoose')

const app = express()

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
app.get('/', (req, res) => {
  res.send('Hi there!')
})

app.listen(3000, () => {
  console.log('Listening on Port 3000')
})
