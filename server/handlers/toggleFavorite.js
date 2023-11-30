const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

const toggleFavorites = async (req, res) => {
  const { userId, recipeId } = req.params;

  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();

    const db = client.db('CoffeeHub');

    // Update the user's favorites array in the database
    const result = await db.collection('users').updateOne(
      { _id: userId }, // Use userId directly
      { $push: { favorites: recipeId } }
    );

    if (result.matchedCount === 0) {
      // User not found
      return res.status(404).json({ error: 'User not found', message: 'User not found' });
    }

    res.json({ message: 'User favorites updated successfully' });
  } catch (error) {
    console.error('Error updating user favorites:', error);

    if (error.code === 'ENOTFOUND') {
      // MongoDB connection error
      return res.status(500).json({ error: 'Database connection error', message: 'Internal server error' });
    }

    // Handle other errors
    res.status(500).json({ error: 'Internal server error', message: 'Internal server error' });
  } finally {
    await client.close();
  }
};

module.exports = toggleFavorites;
