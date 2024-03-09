import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
const CookieDisplay = () => {
    const cookiesku = new Cookies();
    
    // Check if the cookie exists
    const cookieExists = cookiesku.get('id') !== undefined;
    const tryToken = async () => {
        const response = await fetch("http://localhost:8000/auth/testToken/", {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + cookiesku.get('token')
    }
    })

    if (response.ok) {
        const data = await response.json();
        alert("Submission successful!");
        console.log(data);
          
      } else {
        const jsonData =await  response.json();
          console.log(jsonData);
          
      }  
    }
    


    // Use the cookieExists variable as needed
    if (cookieExists) {
      console.log(cookiesku.get('id'))
      tryToken()
    } else {
      console.log("Cookie 'cookieName' does not exist.");
    }

    const [cookies, setCookies] = useState([]);


    useEffect(() => {
        // Function to get all cookies
        const getCookies = () => {
            const cookieString = document.cookie;
            const cookiesArray = cookieString.split(';').map(cookie => {
                const [key, value] = cookie.trim().split('=');
                return { key, value };
            });
            setCookies(cookiesArray);
        };

        // Call the function to get cookies when the component mounts
        getCookies();
    }, []);

    return (
        <div className="container mx-auto mt-5">
            <h1 className="text-2xl font-bold mb-3">Cookies Information</h1>
            <div>
                {cookies.length > 0 ? (
                    <ul>
                        {cookies.map((cookie, index) => (
                            <li key={index} className="mb-2">
                                <span className="font-semibold">{cookie.key}: </span>
                                {cookie.value}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No cookies found.</p>
                )}
            </div>
        </div>
    );
};

export default CookieDisplay;
