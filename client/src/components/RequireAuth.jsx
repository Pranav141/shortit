import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
function RequireAuth({ children }) {
    const location = useLocation();
    const { userInfo } = useSelector(state=>state.auth)
  
    return userInfo && userInfo?.name ? children : <Navigate to="/login" replace state={{ path: location.pathname }}/>;
  }
  export default RequireAuth;