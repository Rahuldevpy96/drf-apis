import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import authAxios from '../services/authAxios';
import Cookies from 'js-cookie';


const ProtectedRoutes = ({ element }) => {
  let isAuth= Cookies.get('isAuthenticated') === 'true' ? true : false;
  const [isAuthenticated, setIsAuthenticated] = useState(isAuth);
  const location = useLocation();

  useEffect(() => {
    authAxios.interceptors.response.use(
      response => response,
      error => {
        console.log(error)
        if (error?.code === "ERR_CANCELED") throw error
        if (error?.response?.status === 401) {
            setIsAuthenticated(false);
            Cookies.remove('isAuthenticated');
            Cookies.remove('user');
        }
        return Promise.reject(error);
      }
    );
  }, [isAuthenticated])
  return isAuthenticated ? (
    <Outlet/>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
