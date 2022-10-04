const express = require('express')
const User = require('../models/users')
const router = express.Router()


router.post('/', async (req, res) => {
    const user = await User.findOne({username: req.body.username})
    if(user == null) {
     return res.status(400).send('No users found')
    }
    user.comparePassword(req.body.password, function(error, isMatch) {
    if (!isMatch) {
         return res.status(500).send('Email and password not matched')
     } 
     else {
         return res.status(201).send('Success')
         
     }
    })  
 })

 module.exports = router;