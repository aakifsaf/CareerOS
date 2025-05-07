import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios'; // For API calls

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // IMPORTANT: Replace with your actual backend API URL
      const response = await axios.post('http://localhost:8000/api/token/', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      // Store tokens (e.g., in localStorage) and redirect
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      navigate('/dashboard/student'); // Or to a relevant dashboard based on role
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message);
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
    }
    setLoading(false);
  };

  const pageVariants = {
    initial: { opacity: 0, x: -50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 50 },
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gray-900 p-4"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ type: 'tween', ease: 'anticipate', duration: 0.5 }}
    >
      <div className="bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-md">
        <motion.h2 
          className="text-3xl font-bold text-center text-indigo-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Welcome Back!
        </motion.h2>
        
        {error && (
          <div className="bg-red-500/20 text-red-300 p-3 rounded-md mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-colors duration-300"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-colors duration-300"
              placeholder="••••••••"
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Sign In'}
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-8">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-300">
            Sign Up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;
