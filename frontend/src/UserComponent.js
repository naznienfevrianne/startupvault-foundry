import React, { useState, useEffect } from 'react';

function UserComponent() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://startupvault-foundry.vercel.app/user/user/');
                console.log('Response:', response);
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            <h2>User Data</h2>
            <ul>
                {userData.map(user => (
                    <li key={user.id}>
                        <p>ID: {user.id}</p>
                        <p>Name: {user.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserComponent;
