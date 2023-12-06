const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, SESSION_SECRET } = process.env;
const session = require('express-session');
const router = express.Router();
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const PORT = 8888;

const app = express();
app.use(express.json());

const {
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
    removeFromFavorites,
    getCoffeeConsumption,
    updateCoffeeConsumption,
    myRecipes,
    deleteRecipe,
    randomRecipe,
    randomCoffee,
} = require("./handlers")

app.use(session({
    secret: SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
}));

app.use(cors({
    origin: 'https://coffee-hub-final-client.vercel.app', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));


// endpoint
app.post("/api/signup", signup);
app.post("/api/checkUsername", checkUsername);
app.post('/api/login', login);
app.get('/api/users', users);
app.get('/api/recipes', recipes);
app.post("/api/postRecipe", postRecipe);
app.get('/api/recipes/:id', recipe);
app.get('/api/searchRecipes', searchRecipes);
app.get('/api/recipes/favorites/:userId', favorites);
app.get('/api/checkFavorite/:userId/:recipeId', checkFavorite);
app.post("/api/toggleFavorites/:userId/:recipeId", addToFavorites);
app.delete("/api/toggleFavorites/:userId/:recipeId", removeFromFavorites);
app.get('/api/getCoffeeConsumption/:userId', getCoffeeConsumption);
app.post('/api/updateCoffeeConsumption',updateCoffeeConsumption);
app.get('/api/myRecipes/:username', myRecipes);
app.delete("/api/deleteRecipe/:username/:recipeId", deleteRecipe);
app.get('/api/randomRecipe', randomRecipe);
app.get('/api/randomCoffee', randomCoffee);

const apiProxy = createProxyMiddleware('/api', {
    target: 'https://coffee-hub-final-server.vercel.app',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/api',  // Preserve the '/api' prefix
    },
});

// Use the proxy middleware for /api routes
app.use(apiProxy);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));