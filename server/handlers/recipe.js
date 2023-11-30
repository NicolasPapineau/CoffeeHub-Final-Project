const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const recipe = async (req, res) => {
    const { id } = req.params;

    try {
        await client.connect();
        const db = client.db('CoffeeHub');

        const recipe = await db.collection('recipes').findOne({ _id: id });

        if (!recipe) {
            return res.status(404).json({ status: 404, message: 'Recipe not found' });
        }

        res.status(200).json({ status: 200, message: 'Recipe found', data: recipe });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error', details: error.message });
    } finally {
        await client.close();
    }
};

module.exports = recipe;
