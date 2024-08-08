const express = require("express");
const cors = require('cors');
const dbConnect = require("./database");
const dbConnect1 = require('./databse2') ; 
const dbConnect3 = require("./database3");
const dbConnect4 = require("./database4") ; 
const dbConnect5 = require("./database5") ;
const dbConnect6 = require("./database6") ; 
const dbConnect7 = require("./database7") ;
const dbConnect8 = require("./database8") ; 
const dbConnect9 = require("./database9") ; 
const dbConnect10 = require("./database10");
const dbConnect11 = require("./database11") ; 
const dbConnect12 = require("./database12") ;
const dbConnect13 = require("./database13") ;
const dbConnect14 =  require("./database14") ; 
const dbConnect16 = require('./database16') ;
const dbConnect17 = require("./database17") ;
const PORT = 5600;

const app = express();
app.use(cors());
app.use(express.json()); 
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Route for fetching female data
app.get('/Female', async (req, res) => {
    try {
        const data = await dbConnect(); // Fetch data for female products

        res.send(data);
    } catch (err) {
        console.error('Error fetching female data:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Route for fetching male datacd
app.get('/Male', async (req, res) => {
    try {
        const data = await dbConnect1(); // Fetch data for male products
     
        res.send(data);
    } catch (err) {
        console.error('Error fetching male data:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Route for fetching data for a specific male product
app.get('/Male/:name', async (req, res) => {
   try {
       const productName = req.params.name; // Extract the 'name' from URL params
       const data = await dbConnect3(productName); // Fetch data for specific male product

   
       if (data.length > 0) {
           res.json(data[0]); // Send the first item if multiple items are returned
       } else {
           res.status(404).send('Product not found');
       }
   } catch (err) {
       console.error('Error fetching male product data:', err);
       res.status(500).send('Internal Server Error');
   }
});
   app.get('/Female/:name', async (req, res) => {
      try {
        const productName = req.params.name; // Extract the 'name' from URL params
        const data = await dbConnect4(productName); // Fetch data for specific female product
    
        if (data.length > 0) {
          res.json(data[0]); // Send the first item if multiple items are returned
        } else {
          res.status(404).send('Product not found');
        }
      } catch (err) {
        console.error('Error fetching female product data:', err);
        res.status(500).send('Internal Server Error');
      }
    });
    app.delete('/Male/:name', async (req, res) => {
        try {
            const name = decodeURIComponent(req.params.name);
            const result = await dbConnect6(name); 
    
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: 'Item not found' });
            }
            res.status(200).json({ message: 'Item deleted' });
        } catch (err) {
            console.error('Error deleting male product:', err);
            res.status(500).send('Internal Server Error');
        }
    });
    app.delete('/Female/:name', async (req, res) => {
        try {
            const name = decodeURIComponent(req.params.name);
            const result = await dbConnect5(name); 
    
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: 'Item not found' });
            }
            res.status(200).json({ message: 'Item deleted' });
        } catch (err) {
            console.error('Error deleting Female product:', err);
            res.status(500).send('Internal Server Error');
        }
    });
    

    app.post('/Male', async (req, res) => {
        try {
            const newData = req.body;
           
    
            // Check if newData is an array
            if (!Array.isArray(newData)) {
                return res.status(400).send('Invalid input: data must be an array');
            }
    
            const result = await dbConnect7(newData);
    
            res.status(200).json({
                message: 'Items Added',
                insertedCount: result.insertedCount, // Number of documents inserted
                insertedIds: result.insertedIds // Object containing the ids of the inserted documents
            });
        } catch (err) {
            console.error('Error adding Male product:', err);
            res.status(500).send('Internal Server Error');
        }
    });
    
    app.post('/Female', async (req, res) => {
        try {
            const newData = req.body;
       
    
            // Check if newData is an array
            if (!Array.isArray(newData)) {
                return res.status(400).send('Invalid input: data must be an array');
            }
    
            const result = await dbConnect8(newData);
    
            res.status(200).json({
                message: 'Items Added',
                insertedCount: result.insertedCount, // Number of documents inserted
                insertedIds: result.insertedIds // Object containing the ids of the inserted documents
            });
        } catch (err) {
            console.error('Error adding Female product:', err);
            res.status(500).send('Internal Server Error');
        }
    });
       
    app.post('/Login', async (req, res) => {
        try {
            const newData = req.body;
    
    
            const result = await dbConnect9(newData);
    
            res.status(200).json({
                message: result.message,
                insertedIds: result.insertedIds
            });
    
        } catch (err) {
            console.error('Error adding User:', err.message);
            if (err.details) {
               
                res.status(409).json({
                    message: err.message,
                    alreadyExists: err.details.alreadyExists,
                    insertedIds: err.details.insertedIds
                });
            } else {
    
                res.status(500).send('Internal Server Error');
            }
        }
    });
    app.get('/Users', async (req, res) => {
        try {
            const data = await dbConnect10(); // Fetch data for female products
    
            res.send(data);
        } catch (err) {
            console.error('Error fetching user Data:', err);
            res.status(500).send('Internal Server Error');
        }
    });
    
    app.post('/Cart', async (req, res) => {
        try {
            const newData = req.body;
          
    
            // Check if newData is an array
            if (!Array.isArray(newData)) {
                return res.status(400).send('Invalid input: data must be an array');
            }
    
            const result = await dbConnect11(newData);
    
            res.status(200).json({
                message: 'Items Added',
                insertedCount: result.insertedCount, // Number of documents inserted
                insertedIds: result.insertedIds // Object containing the ids of the inserted documents
            });
        } catch (err) {
            console.error('Error adding  product:', err);
            res.status(500).send('Internal Server Error');
        }
    });
 
   // Route to get cart items for a specific user
app.get('/Cart/:user', async (req, res) => {
    try {
      const user = req.params.user; // Extract 'user' from URL params
      const data = await dbConnect12(user); // Fetch data for specific user
      
      if (data.length > 0) {
        res.json(data); // Send all items if multiple items are returned
      } else {
        res.status(404).send('No items found for the user');
      }
    } catch (err) {
      console.error('Error fetching cart data:', err);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Route to delete an item from the cart by name
  app.delete('/Cart/:name', async (req, res) => {
    try {
      const name = decodeURIComponent(req.params.name);
      const result = await dbConnect13(name); // Delete item by name
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.status(200).json({ message: 'Item deleted' });
    } catch (err) {
      console.error('Error deleting item:', err);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.post('/Orders', async (req, res) => {
    try {
        const newData = req.body;
       

        // Check if newData is an array
        if (!Array.isArray(newData)) {
            return res.status(400).send('Invalid input: data must be an array');
        }

        const result = await dbConnect14(newData);

        res.status(200).json({
            message: 'Items Added',
            insertedCount: result.insertedCount, // Number of documents inserted
            insertedIds: result.insertedIds // Object containing the ids of the inserted documents
        });
    } catch (err) {
        console.error('Error ordering products:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/Orders', async (req, res) => {
    try {
     // Extract 'user' from URL params
      const data = await dbConnect16(); // Fetch data for specific user
      
      if (data.length > 0) {
        res.json(data); // Send all items if multiple items are returned
      } else {
        res.status(404).send('No items found for the user');
      }
    } catch (err) {
      console.error('Error fetching cart data:', err);
      res.status(500).send('Internal Server Error');
    }
  });
  app.get('/Orders/:user', async (req, res) => {
    try {
      const user = req.params.user; // Extract 'user' from URL params
      const data = await dbConnect17(user); // Fetch data for specific user
      
      if (data.length > 0) {
        res.json(data); // Send all items if multiple items are returned
      } else {
        res.status(404).send('No items found for the user');
      }
    } catch (err) {
      console.error('Error fetching cart data:', err);
      res.status(500).send('Internal Server Error');
    }
  });