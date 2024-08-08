const { MongoClient } = require("mongodb");

const database = 'Collection';
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
async function dbConnect15(user) {
    try {
        await client.connect();
    
        const db = client.db(database);
        const collection = db.collection('CART'); 

       
        const result = await collection.deleteMany({ user });
        return result;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    } finally {
        await client.close(); 
    }
}
module.exports = dbConnect15 ; 