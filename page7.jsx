import React, { useState } from "react";
import "./style7.css";

function Page7() {
    const [proname, setname] = useState('');
    const [proPrice, setPrice] = useState('');
    const [promini, setmini] = useState('');
    const [prodescrip, setdescrip] = useState('');
    const [proimg1, setimg1] = useState('');
    const [proimg2, setimg2] = useState('');
    const [proimg3, setimg3] = useState('');
    const [proFit, setFit] = useState('');
    const [proColour, setColour] = useState('');
    const [Category, setCat] = useState('');
    const [error, setErr] = useState('');

    const handlename = (event) => setname(event.target.value);
    const handlePrice = (event) => setPrice(event.target.value);
    const handlemini = (event) => setmini(event.target.value);
    const handledescrip = (event) => setdescrip(event.target.value);
    const handleFit = (event) => setFit(event.target.value);
    const handleColour = (event) => setColour(event.target.value);
    const handleimg1 = (event) => setimg1(event.target.value);
    const handleimg2 = (event) => setimg2(event.target.value);
    const handleimg3 = (event) => setimg3(event.target.value);
    const handleCat = (event) => setCat(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent form from refreshing the page
    
        const newData = {
            name: proname,
            Price: Number(proPrice), // Convert price to a number
            Colour: proColour,
            img1: proimg1,
            img2: proimg2,
            img3: proimg3,
            descrip: prodescrip,
            Fit: proFit,
            mini: promini
        };
    
         // Log the data
    
        const dataToSend = [newData];
         console.log(dataToSend) ; 
        try {
            const endpoint = Category === "Male" ? 'Male' : 'Female';
            const response = await fetch(`http://localhost:5600/${endpoint}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend) // Send as an array
            });
    
            if (!response.ok) {
                throw new Error(`Failed to add item: ${response.statusText}`);
            }
    
            // Clear form fields
            setname('');
            setPrice('');
            setmini('');
            setdescrip('');
            setimg1('');
            setimg2('');
            setimg3('');
            setFit('');
            setColour('');
            setCat('');
            setErr(''); // Clear any previous errors
    
            // Optionally, handle the success response here
            console.log('Product added successfully');
        } catch (error) {
            setErr(error.message);
            console.error("Error adding item:", error);
        }
    };
    

    return (
        <div className="PA">
          <p id="Headingg0">  Add the Product </p>
            <div className="Container9">
                <div className="Form3">
                    <form onSubmit={handleSubmit}>
                        {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
                        <div className="form-group">
                            <label htmlFor="name">Product Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={proname}
                                onChange={handlename}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Price:</label>
                            <input
                                type="number"
                                id="price"
                                value={proPrice}
                                onChange={handlePrice}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="mini">Mini:</label>
                            <input
                                type="text"
                                id="mini"
                                value={promini}
                                onChange={handlemini}
                                required
                            />
                        </div>

                      

                        <div className="form-group">
                            <label htmlFor="colour">Colour:</label>
                            <input
                                type="text"
                                id="colour"
                                value={proColour}
                                onChange={handleColour}
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="fit">Fit:</label>
                            <input
                                type="text"
                                id="fit"
                                value={proFit}
                                onChange={handleFit}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="img1">Image URL 1:</label>
                            <input
                                type="text"
                                id="img1"
                                value={proimg1}
                                onChange={handleimg1}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="img2">Image URL 2:</label>
                            <input
                                type="text"
                                id="img2"
                                value={proimg2}
                                onChange={handleimg2}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="img3">Image URL 3:</label>
                            <input
                                type="text"
                                id="img3"
                                value={proimg3}
                                onChange={handleimg3}
                                required
                            />
                        </div>
                         
                        <div className="form-group">
                            <label htmlFor="descrip">Description:</label>
                            <textarea
                                id="descrip"
                                value={prodescrip}
                                onChange={handledescrip}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="category">Category:</label>
                            <select
                                id="category"
                                value={Category}
                                onChange={handleCat}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <button type="submit" className="submit-button">Add Product</button>
                    </form>
                </div>
                <div className="FormD">
                    <h2>Product Showcase</h2>
                    {proname && (
                        <div className="product-showcase">
                            <p><strong>Name:</strong> {proname}</p>
                            <p><strong>Price:</strong> {proPrice}</p>
                            <p><strong>Mini:</strong> {promini}</p>
                            <p><strong>Colour:</strong> {proColour}</p>
                            <p><strong>Fit:</strong> {proFit}</p>
                            <div className="image-gallery2">
                                {<img src={proimg1} alt="Image 1" className="product-image3" />}
                                {<img src={proimg2} alt="Image 2" className="product-image3" />}
                                {<img src={proimg3} alt="Image 3" className="product-image3" />}
                            </div>
                            <p><strong>Descrip:</strong> {prodescrip}</p>
                            <p><strong>Category:</strong> {Category}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Page7;
