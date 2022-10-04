const express = require('express')
const Post = require('./Post')

const router = express.Router();

router.get('/',  async (req, res) => {
    try{
        const posts = await Post.find()
        res.json(posts)
    }catch(err){
        res.json({message: err})
    }
});

router.post('/', async (req,res) => {
    Post.create({ title : req.body.title, description: req.body.description})
        .then((data)=>{
        res.json(data)
      })
})

// get specific post
router.get('/:postId', async (req,res) => {
    try{
        const posts = await Post.findById(req.params.postId)
        res.json(posts)
    }catch(err){
        res.json({message: err})
    }
})

//delete post
router.delete('/:postId', async (req, res) => {
    try{
        const removePost = await Post.remove({_id: req.params.postId})
        res.json(removePost)
    }catch(err) {
        res.json(err)
    }
})

// Update a post
router.patch('/:postId', async (req, res) => {
    try{
        const updatePosts = await Post.updateOne(
            {_id: req.params.postId},
            {$set: {title: req.body.title}}
        );
        res.json(updatePosts)
    }catch(err) {
        res.json(err)
    }
})

module.exports = router;
