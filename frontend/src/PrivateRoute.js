// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
    // Check if user is authenticated (you need to implement your own logic here)
    const isAuthenticated = document.cookie.includes('login=true');

    return (
        <Route
            {...rest}
            element={isAuthenticated ? <Element /> : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;
