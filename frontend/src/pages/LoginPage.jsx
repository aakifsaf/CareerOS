import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const loginResult = await login(email, password); // Use context login

      if (loginResult.success) {
        // Determine redirect path based on user role if available
        // For now, just redirect to student dashboard as a default
        // You might decode the token here to get user role or have it in loginResult.user
        navigate('/dashboard/student'); // Or a generic /dashboard
      } else {
        setError(loginResult.error?.detail || loginResult.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      // This catch block might be redundant if context handles errors, but good for direct errors
      setError(err.response?.data?.detail || 'An unexpected error occurred. Please try again.');
      console.error('Login error:', err.response || err.message);
    }
    setIsLoading(false);
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
            disabled={isLoading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              'Login'
            )}
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
