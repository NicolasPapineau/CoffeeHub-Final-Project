const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

const myRecipes = async (req, res) => {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const db = client.db('CoffeeHub');

        // Retrieve the username from the request parameters
        const { username } = req.params;

        // Query for recipes with the specified username
        const recipes = await db.collection('recipes').find({ username }).toArray();

        res.status(200).json({ status: 200, message: `Recipes for user ${username}`, data: recipes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    } finally {
        client.close();
    }
};

module.exports = myRecipes ;