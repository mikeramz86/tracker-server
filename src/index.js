const express = require('express')

const app = express()

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
