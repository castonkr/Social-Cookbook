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

const userSchema = new mongoose.Schema({
    name: String,
    imageURL: String,
    username: String,
    password: String,
    email: String,
    bio: String,
    recipes: [recipeSchema],
    favoriteRecipes: [recipeSchema]
});

const User = mongoose.model('User', userSchema);
module.exports = User;

