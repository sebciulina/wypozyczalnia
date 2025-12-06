import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userInfo = localStorage.getItem('userInfo');

    if (token) {
      setAdmin({ 
        token, 
        info: userInfo ? JSON.parse(userInfo) : null 
      });
    }
    setLoading(false);
  }, []);

  const login = (token, userInfo) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    setAdmin({ token, info: userInfo });
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userInfo');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;