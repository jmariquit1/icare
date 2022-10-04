const express = require('express')
const User = require('../models/users')
const bcrypt = require('bcrypt')
const router = express.Router()



router.get('/', async (req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    }catch(err) {
        res.json({message: err})
    }
})

router.post('/', async (req, res) => {
    try{
        const data = await User.create({
            username : req.body.username,
            password : req.body.password
        })
        return res.json(data)
    }catch(err) {
        res.json({message:err})
    }
})

router.post('/', async (req, res) => {
    // const user = await User.find( user => user.username = req.body.username) 
    // if (user == null) {
    //     return res.status(400).send('Cannot find user')
    // }
    // try {
    //     bcrypt.compare(body.password, user.password)
    // } catch(err) {
    //     res.status(500).send()
    // }
   const user = await User.findOne({username:username})
   console.log(user)
   user.comparePassword(user.password, function(matchError, isMatch) {
    if(matchError) {
        return res.status(400).send('Cannot find user')
    } else {
        return res.status(201).send('Success')
    }
   })
      
    
})
module.exports = router;


               
        
        
                