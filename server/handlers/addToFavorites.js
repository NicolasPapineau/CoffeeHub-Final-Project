const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI);

const toggleFavorites = async (req, res) => {
  const { userId, recipeId } = req.params;

  try {
    await client.connect();

    const db = client.db('CoffeeHub');

  
    const result = await db.collection('users').updateOne(
      { _id: userId },
      { $addToSet: { favorites: recipeId } } 
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found', message: 'User not found' });
    }

    res.json({ message: 'Recipe added to favorites successfully' });
  } catch (error) {
    console.error('Error adding recipe to favorites:', error);

    if (error.code === 'ENOTFOUND') {
      return res.status(500).json({ error: 'Database connection error', message: 'Internal server error' });
    }

    res.status(500).json({ error: 'Internal server error', message: 'Internal server error' });
  } finally {
    await client.close();
  }
};

module.exports = toggleFavorites;
