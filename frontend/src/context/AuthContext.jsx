import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios'; // Make sure axios is installed: npm install axios

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(() => {
    const storedTokens = localStorage.getItem('authTokens');
    return storedTokens ? JSON.parse(storedTokens) : null;
  });
  const [loading, setLoading] = useState(true); // To manage initial loading state

  const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Adjust if your backend URL is different

  useEffect(() => {
    if (tokens) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`;
      // TODO: Optionally, fetch user profile here if not storing it in localStorage
      // For simplicity, we'll decode the user from the token if needed or just use a flag
      // For now, we assume if tokens exist, the user is "logged in" conceptually.
      // A proper implementation would verify the token with the backend or refresh it.
      setUser({ /* minimal user data, or fetch from backend */ }); 
    } else {
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
    setLoading(false);
  }, [tokens]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/token/`, { email, password });
      const data = response.data;
      setTokens(data);
      localStorage.setItem('authTokens', JSON.stringify(data));
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
      // Fetch user details or set a generic user object
      // For now, setting a placeholder. Ideally, decode token or get user from another endpoint.
      setUser({ email }); // Or decode from token: jwt_decode(data.access).email
      return { success: true };
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      return { success: false, error: error.response ? error.response.data : 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      // Assuming your registration endpoint doesn't auto-login. 
      // If it does, you might get tokens back here too.
      await axios.post(`${API_BASE_URL}/register/`, userData);
      // After successful registration, you might want to automatically log them in
      // or redirect them to the login page.
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      return { success: false, error: error.response ? error.response.data : 'Registration failed' };
    }
  };

  const logout = () => {
    setTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    delete axios.defaults.headers.common['Authorization'];
    // Optionally, call a backend logout endpoint if it invalidates tokens server-side
  };

  const contextValue = {
    user,
    tokens,
    login,
    register,
    logout,
    isAuthenticated: !!user, // Or !!tokens for a simpler check
    isLoading: loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children} {/* Render children only after initial loading check */}
    </AuthContext.Provider>
  );
};

export default AuthContext;
