const { MongoClient } = require('mongodb');

// Connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'Collection'; // Replace with your actual database name

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function dbConnect4(name) {
    let data;
    try {
        // Connect to MongoDB
        await client.connect();

        // Select the database and collection
        const db = client.db(dbName);
        const collection = db.collection('Female Products'); // Ensure this collection name is correct

        // Query the collection and return the data
        data = await collection.find({ name }).toArray();
       
        
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    } finally {
        // Consider keeping the client connection open and manage it elsewhere for performance
        // await client.close(); // Uncomment if you want to close connection after every request
    }
    
    return data;
}

module.exports = dbConnect4;

