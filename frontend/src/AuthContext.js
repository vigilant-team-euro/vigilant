import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    // Perform your login logic here
    // For simplicity, we'll just set isLoggedIn to true
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Perform your logout logic here
    // For simplicity, we'll just set isLoggedIn to false
    setIsLoggedIn(false);
  };

  const contextValue = {
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};