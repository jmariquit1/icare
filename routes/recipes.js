const express = require('express');
const Recipe = require('../models/recipes')
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find()
        res.json(recipes)
    }catch(err) {
        res.json({message : err})
    }
});

router.get('/:recipeId', async (req, res) => {
    try{
        const recipe = await Recipe.findById(req.params.recipeId)
        res.json(recipe)
    }catch(err){
        res.json({message : err})
    }
})
router.post('/', async (req, res) => {
    const data = await Recipe.create({
        name : req.body.name,
        decription : req.body.description,
        ingredients : req.body.ingredients,
        directions : req.body.directions,
        nutritionFacts : req.body.nutritionFacts
    })
    return res.json(data)
})
 router.patch('/:recipeId', async(req, res) => {
    try{
        const data = await Recipe.updateOne(
            {_id: req.params.recipeId},
            {$set: {name : req.body.name}})
    } catch(err) {
        return res.json({message : err})
    }
    
 })

 router.delete('/:recipeId', async (req, res) => {
    try{
        const removeRecipe = await Recipe.remove({_id: req.params.recipeId})
        res.json(removeRecipe)
    }catch(err) {
        return res.json({message : err})
    }
 })


module.exports = router;