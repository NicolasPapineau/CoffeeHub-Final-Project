const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

const deleteRecipe = async (req, res) => {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const db = client.db('CoffeeHub');

        // Retrieve the username and recipeId from the request parameters
        const { username, recipeId } = req.params;

        // Check if the recipe exists
        const existingRecipe = await db.collection('recipes').findOne({ _id: recipeId, username });

        if (!existingRecipe) {
            return res.status(404).json({ status: 404, message: 'Recipe not found for the specified user' });
        }

        // Delete the recipe
        const result = await db.collection('recipes').deleteOne({ _id: recipeId, username });

        if (result.deletedCount === 1) {
            res.status(200).json({ status: 200, message: 'Recipe deleted successfully' });
        } else {
            res.status(404).json({ status: 404, message: 'Recipe not found for the specified user' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    } finally {
        client.close();
    }
};

module.exports = deleteRecipe;