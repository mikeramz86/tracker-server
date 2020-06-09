const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')

//to make sure you don't call Track all the time
const Track = mongoose.model('Track')

//create new router object
const router = express.Router()

router.use(requireAuth)

//allow a user to find all the different track they created

router.get('/tracks', async (req, res) => {
  // who is the user? what is userId?
  const tracks = await Track.find({ userId: req.user._id })

  res.send(tracks)
})

module.exports = router
