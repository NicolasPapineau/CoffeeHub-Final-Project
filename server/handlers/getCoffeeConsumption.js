const { MongoClient } = require('mongodb');
const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI);



const getCoffeeConsumption = async (req, res) => {
    const userId = req.params.userId;

    try {
        await client.connect();

        const db = client.db('CoffeeHub');
        const user = await db.collection('users').findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found', message: 'User not found' });
        }

        const coffeeConsumption = user.CoffeeConsumption || [];
        res.json({ coffeeConsumption });
    } catch (error) {
        console.error('Error getting coffee consumption:', error);
        res.status(500).json({ error: 'Internal server error', message: 'Internal server error' });
    } finally {
        await client.close();
    }
};

module.exports = getCoffeeConsumption;