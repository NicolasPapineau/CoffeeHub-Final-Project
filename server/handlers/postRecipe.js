const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require('uuid');

const postRecipe = async (req, res) => {
    const { username, title, description, ingredients, instructions } = req.body;

    if (!title || !description || !ingredients || !instructions) {
        return res.status(400).json({ message: 'All input fields are required!' });
    }

    const recipeId = uuidv4();

    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();

        const recipe = { _id: recipeId, username, title, description, ingredients, instructions }

        const result = await client
            .db('CoffeeHub')
            .collection('recipes')
            .insertOne(recipe);


        res.json({ message: 'Recipe added successfully', recipe });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.close();
    }
};

module.exports = postRecipe;
