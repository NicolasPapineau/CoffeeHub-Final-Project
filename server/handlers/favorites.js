const { MongoClient } = require('mongodb');
const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI);

const favorites = async (req, res) => {
    const userId = req.params.userId;

    try {
        await client.connect();

        const db = client.db('CoffeeHub');

        // Assuming 'favorites' is an array of recipeIds in the user document
        const userFavorites = await db.collection('users').findOne({ _id: userId });

        if (!userFavorites || !userFavorites.favorites) {
            console.log('User favorites not found.');
            return res.status(404).json({ error: 'User favorites not found' });
        }

        // Fetch the actual recipes based on the recipeIds stored in the user's favorites
        const favoriteRecipes = await db.collection('recipes').find({ _id: { $in: userFavorites.favorites } }).toArray();

        res.json({ data: favoriteRecipes });
    } catch (error) {
        console.error('Error fetching favorite recipes', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.close();
    }
};

module.exports = favorites;
