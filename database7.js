const { MongoClient } = require("mongodb");

const database = 'Collection';
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
async function dbConnect7(newData) {
    try {
        await client.connect();
   
        const db = client.db(database);
        const collection = db.collection('Male Products');

        // Check if newData is an array, and if not, wrap it in an array
        if (!Array.isArray(newData)) {
            newData = [newData];
        }

        const result = await collection.insertMany(newData);
        return result;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    } finally {
        await client.close();
    }
}

module.exports = dbConnect7 ; 