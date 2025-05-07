import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios'; // For API calls

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    role: 'student', // Default role
    // location: '', // Optional, add if you want it on the registration form initially
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // IMPORTANT: Replace with your actual backend API URL
      const apiPayload = { ...formData };
      delete apiPayload.confirmPassword; // Don't send confirmPassword to backend

      const response = await axios.post('http://localhost:8000/api/register/', apiPayload);
      console.log('Registration successful:', response.data);
      setSuccess('Registration successful! Please log in.');
      // Optionally, redirect to login or auto-login the user
      setTimeout(() => navigate('/login'), 2000); 
    } catch (err) {
      console.error('Registration error:', err.response ? err.response.data : err.message);
      let errorMessage = 'Registration failed. Please try again.';
      if (err.response && err.response.data) {
        // Handle specific error messages from backend if available
        const errors = err.response.data;
        if (errors.email) errorMessage = `Email: ${errors.email.join(' ')}`;
        else if (errors.password) errorMessage = `Password: ${errors.password.join(' ')}`;
        // Add more specific error handling as needed
      }
      setError(errorMessage);
    }
    setLoading(false);
  };

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 },
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
      <div className="bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-lg">
        <motion.h2 
          className="text-3xl font-bold text-center text-indigo-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Create Your Account
        </motion.h2>

        {error && (
          <div className="bg-red-500/20 text-red-300 p-3 rounded-md mb-6 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500/20 text-green-300 p-3 rounded-md mb-6 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
              <input type="text" name="first_name" id="first_name" value={formData.first_name} onChange={handleChange} required className="w-full input-style" placeholder="Ada" />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
              <input type="text" name="last_name" id="last_name" value={formData.last_name} onChange={handleChange} required className="w-full input-style" placeholder="Lovelace" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full input-style" placeholder="you@example.com" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required className="w-full input-style" placeholder="••••••••" />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
            <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="w-full input-style" placeholder="••••••••" />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">I am a...</label>
            <select 
              name="role" 
              id="role" 
              value={formData.role}
              onChange={handleChange}
              className="w-full input-style appearance-none"
            >
              <option value="student">Student</option>
              <option value="parent">Parent</option>
              {/* Add other roles if needed */}
            </select>
          </div>
          
          {/* Uncomment and adapt if location is needed during registration 
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">Location (Optional)</label>
            <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} className="w-full input-style" placeholder="City, Country" />
          </div>
          */}

          <style jsx>{`
            .input-style {
              background-color: #374151; /* bg-gray-700 */
              border: 1px solid #4B5563; /* border-gray-600 */
              border-radius: 0.5rem; /* rounded-lg */
              color: white;
              padding: 0.75rem 1rem; /* px-4 py-3 */
              box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
            }
            .input-style::placeholder {
              color: #6B7280; /* placeholder-gray-500 */
            }
            .input-style:focus {
              outline: 2px solid transparent;
              outline-offset: 2px;
              box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.5); /* Equivalent to focus:ring-indigo-500 with some opacity */
              border-color: #6366F1; /* focus:border-indigo-500 */
            }
          `}</style>

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
            ) : 'Create Account'}
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-8">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-300">
            Sign In
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default RegisterPage;
