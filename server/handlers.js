const signup = require("./handlers/signup")
const checkUsername = require("./handlers/checkUsername")
const login = require("./handlers/login")
const checkAuth = require("./handlers/checkAuth")
const logout = require("./handlers/logout")


module.exports = {
    signup,
    checkUsername,
    login,
    checkAuth,
    logout,
}