// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import API from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    access: localStorage.getItem('access_token'),
    refresh: localStorage.getItem('refresh_token'),
  });

  useEffect(() => {
    if (auth.access) {
      API.defaults.headers.common['Authorization'] = `Bearer ${auth.access}`;
    } else {
      delete API.defaults.headers.common['Authorization'];
    }
  }, [auth.access]);

  const login = (access, refresh) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    setAuth({ access, refresh });
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAuth({ access: null, refresh: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
