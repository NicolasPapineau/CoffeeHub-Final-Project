const signup = require("./handlers/signup")
const checkUsername = require("./handlers/checkUsername")
const login = require("./handlers/login")
const users = require("./handlers/users")
const postRecipe = require("./handlers/postRecipe")
const recipes = require("./handlers/recipes")

module.exports = {
    signup,
    checkUsername,
    login,
    users,
    postRecipe,
    recipes,
}