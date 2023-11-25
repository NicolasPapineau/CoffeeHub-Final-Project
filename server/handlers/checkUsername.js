const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;


const checkUsername = async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }

    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();

        const user = await client
            .db("CoffeeHub")
            .collection("users")
            .findOne({ username });

        if (user) {
            // If the username exists, return exists:true
            return res.json({ exists: true });
        } else {
            // If the username doesn't exist, return exists:false
            return res.json({ exists: false });
        }
    } catch (error) {
        console.error("Error checking username:", error);
        return res.status(500).json({ message: "Internal server error" });
    } finally {
        await client.close();
    }
};

module.exports = checkUsername;