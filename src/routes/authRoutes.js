const express = require('express')
const mongoose = require('mongoose')
const User = mongoose.model('User')

const router = express.Router()

router.post('/signup', async (req, res) => {
    const { email, password } = req.body

    //create an instance of a user
    const user = new User({ email, password })

    await user.save()

    res.send('You made a post request')
})

module.exports = router
