const signup = require("./handlers/signup")
const checkUsername = require("./handlers/checkUsername")
const login = require("./handlers/login")
const users = require("./handlers/users")
const postRecipe = require("./handlers/postRecipe")
const recipes = require("./handlers/recipes")
const recipe = require("./handlers/recipe")
const searchRecipes = require('./handlers/searchRecipes')
const toggleFavorites = require("./handlers/toggleFavorite")
const favorites = require("./handlers/favorites")

module.exports = {
    signup,
    checkUsername,
    login,
    users,
    postRecipe,
    recipes,
    recipe,
    searchRecipes,
    toggleFavorites,
    favorites,
}