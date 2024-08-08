const { MongoClient } = require("mongodb");

const database = 'Collection';
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
async function dbConnect13(name) {
    try {
        await client.connect();
    
        const db = client.db(database);
        const collection = db.collection('CART'); // Ensure this collection name is correct

        // Delete data
        const result = await collection.deleteOne({ name });
        return result;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    } finally {
        await client.close(); // Consider moving client.close() outside of the function for better connection management
    }
}
module.exports = dbConnect13 ; 