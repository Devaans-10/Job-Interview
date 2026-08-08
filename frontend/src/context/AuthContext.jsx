import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock user database (in memory)
const MOCK_USERS = [
  { 
    id: '1', 
    name: 'Devaans Patwari', 
    email: 'pdevaans@gmail.com', 
    password: 'Password123' 
  }
];

// Create context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check if user is logged in on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('authUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        localStorage.removeItem('authUser');
      }
    }
    setIsInitialized(true);
  }, []);

  // Mock signup
  const signup = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate inputs
      if (!name || !email || !password) {
        throw new Error('All fields are required');
      }

      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }

      if (!/[A-Z]/.test(password)) {
        throw new Error('Password must contain an uppercase letter');
      }

      if (!/\d/.test(password)) {
        throw new Error('Password must contain a number');
      }

      if (!email.includes('@')) {
        throw new Error('Please enter a valid email');
      }

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Check if user already exists
      const userExists = MOCK_USERS.find(u => u.email === email);
      if (userExists) {
        throw new Error('Email already registered. Try logging in instead.');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password
      };

      // Add to mock database
      MOCK_USERS.push(newUser);

      // Set as logged in
      const loggedInUser = { id: newUser.id, name: newUser.name, email: newUser.email };
      setUser(loggedInUser);
      localStorage.setItem('authUser', JSON.stringify(loggedInUser));

      return { success: true, user: loggedInUser };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Mock login
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Find user
      const foundUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // Set as logged in
      const loggedInUser = { 
        id: foundUser.id, 
        name: foundUser.name, 
        email: foundUser.email 
      };
      setUser(loggedInUser);
      localStorage.setItem('authUser', JSON.stringify(loggedInUser));

      return { success: true, user: loggedInUser };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('authUser');
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Context value
  const value = {
    user,
    isLoading,
    error,
    isInitialized,
    signup,
    login,
    logout,
    clearError,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
