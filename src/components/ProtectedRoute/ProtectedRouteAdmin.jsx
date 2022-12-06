import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

const ProtectedRouteAdmin = ({ children }) => {
  const { user } = UserAuth();

  if ( !user ) {
    if( user.email != 'admin@app.com'){
      return <Navigate to='/' />;
    }
  }
  return children;
};

export default ProtectedRouteAdmin;