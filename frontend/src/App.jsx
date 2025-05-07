import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import AuthProvider and useAuth
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import ParentDashboard from './pages/ParentDashboard';
import CareerAssessmentPage from './pages/CareerAssessmentPage';
import CareerTrendsPage from './pages/CareerTrendsPage';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

// Main App component structure
const AppContent = () => {
  const { isAuthenticated, logout, user } = useAuth(); // Get auth state and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
            CareerOS
          </Link>
          <div className="space-x-4 flex items-center">
            {isAuthenticated ? (
              <>
                {user?.role === 'student' && (
                  <Link to="/dashboard/student" className="text-gray-300 hover:text-indigo-400 transition-colors">Dashboard</Link>
                )}
                {user?.role === 'parent' && (
                  <Link to="/dashboard/parent" className="text-gray-300 hover:text-indigo-400 transition-colors">Dashboard</Link>
                )}
                {/* Generic dashboard link if role is not specific or not yet available */}
                {(!user?.role && isAuthenticated) && (
                  <Link to="/dashboard/student" className="text-gray-300 hover:text-indigo-400 transition-colors">Dashboard</Link>
                )}
                <Link to="/assessment" className="text-gray-300 hover:text-indigo-400 transition-colors">Assessment</Link>
                <Link to="/trends" className="text-gray-300 hover:text-indigo-400 transition-colors">Trends</Link>
                <button 
                  onClick={handleLogout} 
                  className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-indigo-400 transition-colors">Login</Link>
                <Link to="/register" className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route path="/dashboard/parent" element={<ParentDashboard />} />
            <Route path="/assessment" element={<CareerAssessmentPage />} />
            <Route path="/trends" element={<CareerTrendsPage />} />
          </Route>
          
          {/* Fallback for unmatched routes - optional */}
          {/* <Route path="*" element={<div>Page Not Found</div>} /> */}
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 p-6 text-center text-sm text-gray-500">
        <span> {new Date().getFullYear()} CareerOS. All rights reserved.</span>
        <Link to="/privacy" className="hover:text-indigo-400 ml-4">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-indigo-400 ml-4">Terms of Service</Link>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
