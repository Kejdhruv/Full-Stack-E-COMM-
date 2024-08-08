const { MongoClient } = require("mongodb");

const database = 'Collection';
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function dbConnect10() {
    try {
        // Connect to MongoDB
        await client.connect();
      

        // Select the database and collection
        const db = client.db(database);
        const collection = db.collection('Users');

        // Query the collection and return the data
        const data = await collection.find({}).toArray();

        return data;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err; // Propagate the error upwards
    }
}

module.exports = dbConnect10;