const { MongoClient } = require("mongodb");

const databaseName = 'Collection'; // Ensure this is the correct database name
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function dbConnect17(user) {
    let connection;
    try {
        // Connect to MongoDB
        connection = await client.connect();
        
        // Select the database and collection
        const db = connection.db(databaseName);
        const collection = db.collection('Recieved Orders');

        // Debugging: Log the query to ensure it's correct
        console.log(`Querying for user: ${user}`);
 
        // Query the collection to find documents where any order's user field matches the specified user
        const query = { "Order.user": user }; // Use dot notation to query nested fields
       
        const data = await collection.find(query).toArray();

        // Debugging: Log the retrieved data
        console.log('Data retrieved:', data);

        return data;
    } catch (err) {
        console.error("Error connecting to MongoDB or querying collection:", err);
        throw err; // Propagate the error upwards
    } finally {
        if (connection) {
            // Close the connection
            await connection.close();
        }
    }
}

module.exports = dbConnect17;


