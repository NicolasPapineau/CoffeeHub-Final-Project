const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, SESSION_SECRET } = process.env;
const session = require('express-session');
const router = express.Router();

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
    removeFromFavorites
} = require("./handlers")

app.use(session({
    secret: SESSION_SECRET || 'secret', // Use a strong, random secret in production
    resave: false,
    saveUninitialized: true,
}));

// signup endpoint
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








// app.get("/api/test", (req, res) => {
//     res.json({ message: "You hit the end point!" });
// });


// app.get("/api/testMongo", async (req, res) => {
//     const client = new MongoClient(MONGO_URI);
//     try {
//         await client.connect();
//         const result = await client
//             .db("CoffeeHub")
//             .collection("people")
//             .insertOne({ name: "Jimmy" });
//         res.json(result);
//     } catch (err) {
//         console.log(err);
//         res.status(400).json({ message: "something went wrong" });
//     } finally {
//         await client.close();
//     }
// });¸


const client = new MongoClient(MONGO_URI);

app.get('/api/getCoffeeConsumption/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        await client.connect();

        const db = client.db('CoffeeHub');
        const user = await db.collection('users').findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found', message: 'User not found' });
        }

        // Use the correct casing for the field name
        const coffeeConsumption = user.CoffeeConsumption || [];
        res.json({ coffeeConsumption });
    } catch (error) {
        console.error('Error getting coffee consumption:', error);
        res.status(500).json({ error: 'Internal server error', message: 'Internal server error' });
    } finally {
        await client.close();
    }
});


app.post('/api/updateCoffeeConsumption', async (req, res) => {
    const { userId, date, coffeeCount } = req.body;

    try {
        await client.connect();

        const db = client.db('CoffeeHub');

        // Check if there is an existing entry with the given date
        const existingEntry = await db.collection('users').findOne(
            { _id: userId, 'CoffeeConsumption.date': date },
            { projection: { 'CoffeeConsumption.$': 1 } }
        );

        if (existingEntry) {
            // Update the existing entry
            await db.collection('users').updateOne(
                { _id: userId, 'CoffeeConsumption.date': date },
                { $set: { 'CoffeeConsumption.$.coffeeCount': coffeeCount } }
            );
        } else {
            // Add a new entry to the CoffeeConsumption array
            await db.collection('users').updateOne(
                { _id: userId },
                { $addToSet: { CoffeeConsumption: { date, coffeeCount } } }
            );
        }

        res.json({ message: 'Coffee consumption updated successfully' });
    } catch (error) {
        console.error('Error updating coffee consumption:', error);
        res.status(500).json({ error: 'Internal server error', message: 'Internal server error' });
    } finally {
        await client.close();
    }
});

  
  



app.listen(PORT, () => console.log(`Listening on port ${PORT}`));