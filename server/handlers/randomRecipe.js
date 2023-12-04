const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;



const randomRecipe = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db('CoffeeHub');
    const collection = db.collection('recipes');

    // Count the total number of recipes
    const totalRecipes = await collection.countDocuments();

    // Generate a random index to retrieve a random recipe
    const randomIndex = Math.floor(Math.random() * totalRecipes);

    // Fetch one random recipe using the random index
    const randomRecipe = await collection.findOne({}, { skip: randomIndex });

    if (!randomRecipe) {
      return res.status(404).json({ status: 404, message: 'No recipes available' });
    }

    res.status(200).json({ status: 200, message: 'Random recipe fetched successfully', data: randomRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Server Error' });
  } finally {
    client.close();
  }
};

module.exports = randomRecipe;
