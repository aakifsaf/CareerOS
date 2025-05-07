import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import ParentDashboard from './pages/ParentDashboard';
import CareerAssessmentPage from './pages/CareerAssessmentPage';
import CareerTrendsPage from './pages/CareerTrendsPage';

// Placeholder components for pages - we'll create these later
// const HomePage = () => <div><h1 className="text-3xl font-bold text-center my-8">Welcome to CareerOS</h1><nav className="flex justify-center space-x-4"><Link to="/login" className="text-blue-500 hover:underline">Login</Link><Link to="/signup" className="text-blue-500 hover:underline">Signup</Link></nav></div>;
// const LoginPagePlaceholder = () => <div>Login Page - To be built</div>; // Renamed to avoid conflict
// const SignupPagePlaceholder = () => <div>Signup Page - To be built</div>; // Renamed to avoid conflict
// const StudentDashboard = () => <div className="text-center p-8">Student Dashboard - To be built</div>;
// const ParentDashboard = () => <div className="text-center p-8">Parent Dashboard - To be built</div>;
// const CareerAssessmentPage = () => <div className="text-center p-8">Career Assessment Page - To be built</div>;
// const CareerTrendsPage = () => <div className="text-center p-8">Live Career Trends Page - To be built</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-900 text-white">
        <nav className="bg-gray-800 p-4 shadow-md sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
              CareerOS
            </Link>
            <div className="space-x-4">
              <Link to="/login" className="text-gray-300 hover:text-indigo-400 transition-colors">Login</Link>
              <Link to="/register" className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Sign Up
              </Link>
              {/* Add more nav links here: Dashboard, Trends, Logout conditionally based on auth state */}
            </div>
          </div>
        </nav>

        {/* AnimatePresence is good for page transitions if you want that later */}
        {/* <AnimatePresence mode="wait"> */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard/student" element={<StudentDashboard />} />
              <Route path="/dashboard/parent" element={<ParentDashboard />} />
              <Route path="/assessment" element={<CareerAssessmentPage />} />
              <Route path="/trends" element={<CareerTrendsPage />} />
            </Routes>
          </main>
        {/* </AnimatePresence> */}

        <footer className="bg-gray-800 p-6 text-center text-sm text-gray-500">
          <span>© {new Date().getFullYear()} CareerOS. All rights reserved.</span>
          <Link to="/privacy" className="hover:text-indigo-400 ml-4">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-indigo-400 ml-4">Terms of Service</Link>
        </footer>
      </div>
    </Router>
  );
}

export default App;
