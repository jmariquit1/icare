const mongoose = require('mongoose')

const RecipeSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    description : {
        type: String
    },
    ingredients : {
        type: String,
        required: true
    },
    directions : {
        type: String,
        required: true
    },
    nutritionFacts : {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Recipes', RecipeSchema)