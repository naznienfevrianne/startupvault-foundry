import React, { useEffect, useState } from 'react';

const CookieDisplay = () => {
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
