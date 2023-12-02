const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;


const checkFavorite = async (req, res) => {
    const { userId, recipeId } = req.params;
    const client = new MongoClient(MONGO_URI);
  
    try {
      await client.connect();
  
      const db = client.db('CoffeeHub');
      const user = await db.collection('users').findOne({ _id: userId });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found', message: 'User not found' });
      }
  
      const isFavorite = user.favorites.includes(recipeId);
      res.json({ isFavorite });
    } catch (error) {
      console.error('Error checking favorites', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await client.close();
    }
  };
  
  module.exports = checkFavorite ;