const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const bcrypt = require('bcrypt');


const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();

        const user = await client
            .db('CoffeeHub')
            .collection('users')
            .findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        req.session.userId = user._id; // Corrected line
        return res.status(200).json({ message: 'Login successful', user: { username: user.username } });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.close();
    }
};

module.exports = login;