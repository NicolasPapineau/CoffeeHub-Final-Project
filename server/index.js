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
// });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));