import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./style6.css";

function Page6() {
    const [Data, setData] = useState([]);
    const [Data1, setData1] = useState([]);
    const [Data2, setData2] = useState([]);
    const [err, setErr] = useState('');
    const location = useLocation();

    useEffect(() => {
        const fetchData1 = async () => {
            try {
                const response1 = await fetch("http://localhost:5600/Male");
                if (!response1.ok) {
                    throw new Error(`Failed to fetch Male data: ${response1.statusText}`);
                }
                const result1 = await response1.json();
                setData1(result1);
            } catch (error) {
                setErr(error.message);
                console.error("Error fetching male data:", error);
            }
        };

        const fetchData2 = async () => {
            try {
                const response2 = await fetch("http://localhost:5600/Female");
                if (!response2.ok) {
                    throw new Error(`Failed to fetch Female data: ${response2.statusText}`);
                }
                const result2 = await response2.json();
                setData2(result2);
            } catch (error) {
                setErr(error.message);
                console.error("Error fetching female data:", error);
            }
        };

        fetchData1();
        fetchData2();
    }, []); 

    useEffect(() => {
        setData([...Data1, ...Data2]);
    }, [Data1, Data2]);

    const Delete = async (name) => {
        const endpoint = location.pathname.includes('/Male') ? 'Male' : 'Female';
        const encodedName = encodeURIComponent(name);
        console.log(encodedName) ; 

        try {
            const response = await fetch(`http://localhost:5600/${endpoint}/${encodedName}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error(`Failed to delete item: ${response.statusText}`);
            }

            // Update the local state after successful deletion
            setData(prevData => prevData.filter(item => item.name !== name));
        } catch (error) {
            setErr(error.message);
            console.error("Error deleting item:", error);
        }
    };

    if (err) {
        return <p>Error: {err}</p>;
    }

    return ( 
        <div>
        <div className="Heading2">Products</div>
        <div className="product-list-container4">
            <div className="product-list1">
                {Data.map((item, index) => (
                    <div key={index} className="product-item2">
                        <img src={item.img2} alt={item.name} className="product-image4" />
                        <div className="product-info6">
                            <span className="product-name8">{item.name}</span>
                            <button className="delete-button9" onClick={() => Delete(item.name)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div> ) 
}

export default Page6;
