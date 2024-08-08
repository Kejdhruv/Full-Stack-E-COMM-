
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'Collection'; // Replace with your actual database name
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function dbConnect3(name) {
    try {
        await client.connect();
      
        const db = client.db(dbName);
        const collection = db.collection('Male Products'); // Ensure this collection name is correct
        const data = await collection.find({ name }).toArray();
        return data;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    } finally {
        await client.close(); // Consider moving client.close() outside of the function for better connection management
    }
}
module.exports = dbConnect3; 
