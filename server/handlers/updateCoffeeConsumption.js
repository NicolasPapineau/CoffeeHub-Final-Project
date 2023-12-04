const { MongoClient } = require('mongodb');
const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI);


const updateCoffeeConsumption = async (req, res) => {
    const { userId, date, coffeeCount } = req.body;

    try {
        await client.connect();

        const db = client.db('CoffeeHub');

        // Check if there is an existing entry with the given date
        const existingEntry = await db.collection('users').findOne(
            { _id: userId, 'CoffeeConsumption.date': date },
            { projection: { 'CoffeeConsumption.$': 1 } }
        );

        if (existingEntry) {
            // Update the existing entry
            await db.collection('users').updateOne(
                { _id: userId, 'CoffeeConsumption.date': date },
                { $set: { 'CoffeeConsumption.$.coffeeCount': coffeeCount } }
            );
        } else {
            // Add a new entry to the CoffeeConsumption array
            await db.collection('users').updateOne(
                { _id: userId },
                { $addToSet: { CoffeeConsumption: { date, coffeeCount } } }
            );
        }

        res.json({ message: 'Coffee consumption updated successfully' });
    } catch (error) {
        console.error('Error updating coffee consumption:', error);
        res.status(500).json({ error: 'Internal server error', message: 'Internal server error' });
    } finally {
        await client.close();
    }
};

module.exports = updateCoffeeConsumption;