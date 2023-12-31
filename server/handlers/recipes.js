const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

const recipes = async (req, res) => {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const db = client.db('CoffeeHub');
        
        const recipes = await db.collection('recipes').find().toArray();

        res.status(200).json({ status: 200, message: 'Here are your recipes', data: recipes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    } finally {
        client.close();
    }
};

module.exports = recipes;
