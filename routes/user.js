const express = require('express')
const User = require('../models/users')
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
module.exports = router;


               
        
        
                