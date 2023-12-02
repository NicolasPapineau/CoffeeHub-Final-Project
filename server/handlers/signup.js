const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const userId = uuidv4();

    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();

        // Hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = { _id: userId, username, password: hashedPassword, favorites: [], CoffeeConsumption: [] }

        const result = await client
            .db('CoffeeHub')
            .collection('users')
            .insertOne(user);


        res.json({ message: 'User registered successfully', user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.close();
    }
};

module.exports = signup;
