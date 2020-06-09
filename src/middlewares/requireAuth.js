//this function will take an incoming request and doing something with it.
// if a user gives some sort of token it will allow them to access a route

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    // authorization === 'Bearer jdlajkfa'

    if (!authorization) {
        return res.status(401).send({ error: ' You must be logged in.' })
    }

    const token = authorization.replace('Bearer ', '')

    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
        if (err) {
            return res.status(401).send({ error: 'You must be logged in' })
        }

        const { userId } = payload

        const user = await User.findById(userId)

        req.user = user
        next()
    })
}
