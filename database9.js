const { MongoClient } = require('mongodb');

const databaseName = 'Collection'; // Replace with your actual database name
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function dbConnect9(newData) {
    try {
        // Connect to the MongoDB server
        await client.connect();
      

        const db = client.db(databaseName);
        const collection = db.collection('Users');

        // Ensure newData is an array
        if (!Array.isArray(newData)) {
            newData = [newData];
        }

        // Prepare responses
        const results = {
            inserted: [],
            alreadyExists: []
        };

        // Check for existing documents
        for (const data of newData) {
            const existingDoc = await collection.findOne({ email: data.email });
            if (existingDoc) {
                results.alreadyExists.push(data.email);
            } else {
                const result = await collection.insertOne(data);
                results.inserted.push(result.insertedId);
            }
        }

        // If there are existing emails, throw an error
        if (results.alreadyExists.length > 0) {
            const error = new Error('This Email already exist , try Another ');
            error.details = {
                alreadyExists: results.alreadyExists,
                insertedIds: results.inserted
            };
            throw error;
        }

        // Return successful response if no errors
        return {
            message: 'All items added successfully',
            insertedIds: results.inserted
        };

    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err; // Rethrow the error to be caught by the Express route
    } finally {
        await client.close();
    }
}

module.exports = dbConnect9;

