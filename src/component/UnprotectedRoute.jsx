import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

// eslint-disable-next-line react/prop-types
const UnprotectedRoute = ({ children }) => {
  const { user } = UserAuth();

  if (user) {
    return <Navigate to='/' />;
  }
  return children;
};

export default UnprotectedRoute;