const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const searchRecipes = async (req, res) => {
    const { query } = req.query;

    try {
      await client.connect();
      const db = client.db('CoffeeHub');
      const recipes = await db.collection('recipes').find({ title: { $regex: query, $options: 'i' } }).toArray();
      res.status(200).json({ status: 200, message: 'Search results', data: recipes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, error: 'Server Error' });
    } finally {
      await client.close();
    }
};

module.exports = searchRecipes;
