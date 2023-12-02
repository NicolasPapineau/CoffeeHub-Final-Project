const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI);

const removeFromFavorites = async (req, res) => {
  const { userId, recipeId } = req.params;

  try {
    await client.connect();

    const db = client.db('CoffeeHub');

    // Update the user's favorites array in the database to remove recipeId
    const result = await db.collection('users').updateOne(
      { _id: userId },
      { $pull: { favorites: recipeId } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found', message: 'User not found' });
    }

    res.json({ message: 'Recipe removed from favorites successfully' });
  } catch (error) {
    console.error('Error removing recipe from favorites:', error);

    if (error.code === 'ENOTFOUND') {
      return res.status(500).json({ error: 'Database connection error', message: 'Internal server error' });
    }

    res.status(500).json({ error: 'Internal server error', message: 'Internal server error' });
  } finally {
    await client.close();
  }
};

module.exports = removeFromFavorites;
