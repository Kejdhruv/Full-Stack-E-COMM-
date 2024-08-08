const { MongoClient } = require("mongodb");

const database = 'Collection';
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function dbConnect12(user) {
    try {
        // Connect to MongoDB
        await client.connect();
    

        // Select the database and collection
        const db = client.db(database);
        const collection = db.collection('CART');

        // Query the collection and return the data
        const data = await collection.find({user}).toArray();

        return data;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err; // Propagate the error upwards
    }
}

module.exports = dbConnect12;