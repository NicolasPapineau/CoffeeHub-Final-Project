const signup = require("./handlers/signup")
const checkUsername = require("./handlers/checkUsername")
const login = require("./handlers/login")
const users = require("./handlers/users")
const postRecipe = require("./handlers/postRecipe")
const recipes = require("./handlers/recipes")
const recipe = require("./handlers/recipe")
const searchRecipes = require('./handlers/searchRecipes')
const addToFavorites = require("./handlers/addToFavorites")
const favorites = require("./handlers/favorites")
const checkFavorite = require("./handlers/checkFavorite")
const removeFromFavorites = require("./handlers/removeFromFavorites")


module.exports = {
    signup,
    checkUsername,
    login,
    users,
    postRecipe,
    recipes,
    recipe,
    searchRecipes,
    addToFavorites,
    favorites,
    checkFavorite,
    removeFromFavorites
    
}