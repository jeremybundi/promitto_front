// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Assuming you're using Redux for state management

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token); // Replace with your actual state structure

  return token ? children : <Navigate to="/login" />; // Render children if authenticated, otherwise redirect to login
};

export default PrivateRoute;
