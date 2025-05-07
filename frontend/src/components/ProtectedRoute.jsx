import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Show a loading spinner or a blank page while auth state is being determined
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white text-xl">Loading...</p> 
        {/* You can replace this with a more sophisticated spinner component */}
      </div>
    );
  }

  if (!isAuthenticated) {
    // User not logged in, redirect them to the /login page
    // Pass the current location so we can redirect them back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If allowedRoles is provided, check if the user's role is permitted
  // This assumes your 'user' object in AuthContext has a 'role' property
  // e.g., user: { email: '...', role: 'student' }
  // You might need to adjust how you get the user's role (e.g., from decoding the JWT)
  if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
    // User is logged in but does not have the required role
    // Redirect to a "Not Authorized" page or back to a default page like home
    // For simplicity, redirecting to home. Consider a dedicated "Unauthorized" page.
    return <Navigate to="/" replace />;
  }

  // User is authenticated (and has the right role if specified), so render the child route
  return <Outlet />;
};

export default ProtectedRoute;
