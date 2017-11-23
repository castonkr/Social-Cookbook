const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // Mongoose needs us to specify the type of promise we should use

const recipeSchema = new mongoose.Schema({
    name: String,
    typeOfMeal: String,
    imageURL: String,
    prepTime: String,
    cookTime: String,
    servingSize: String,
    cost: String,
    ingredients: [String],
    directions: [String]
});

const Rotw = mongoose.model('Rotw', recipeSchema);
module.exports = Rotw;
