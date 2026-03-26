import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Login
  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // Auto logout if no token
  useEffect(() => {
    if (!token) {
      console.log("User logged out");
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;