const express = require("express");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const PORT = 8888;

const app = express();
app.use(express.json());

const {
    signup,
    checkUsername,
} = require("./handlers")



// signup endpoint
app.post("/api/signup", signup);
app.post("/api/checkUsername", checkUsername);

// Login endpoint
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const user = await client
            .db("CoffeeHub")
            .collection("users")
            .findOne({ username, password });

        if (user) {
            res.json({ message: "Login successful", user });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        await client.close();
    }
});


app.get("/api/test", (req, res) => {
    res.json({ message: "You hit the end point!" });
});


app.get("/api/testMongo", async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const result = await client
            .db("CoffeeHub")
            .collection("people")
            .insertOne({ name: "Jimmy" });
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "something went wrong" });
    } finally {
        await client.close();
    }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));