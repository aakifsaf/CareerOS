import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Placeholder components for pages - we'll create these later
const HomePage = () => <div><h1 className="text-3xl font-bold text-center my-8">Welcome to Visarisk</h1><nav className="flex justify-center space-x-4"><Link to="/login" className="text-blue-500 hover:underline">Login</Link><Link to="/signup" className="text-blue-500 hover:underline">Signup</Link></nav></div>;
const LoginPage = () => <div>Login Page - To be built</div>;
const SignupPage = () => <div>Signup Page - To be built</div>;
const StudentDashboard = () => <div>Student Dashboard - To be built</div>;
const ParentDashboard = () => <div>Parent Dashboard - To be built</div>;
const CareerAssessmentPage = () => <div>Career Assessment Page - To be built</div>;
const CareerTrendsPage = () => <div>Live Career Trends Page - To be built</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Basic Navbar placeholder - can be expanded later */}
        <nav className="bg-gray-100 dark:bg-gray-800 p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-semibold text-gray-800 dark:text-white">Visarisk</Link>
            {/* Add more nav links here as needed, e.g., Dashboard, Trends, Logout */}
          </div>
        </nav>

        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route path="/dashboard/parent" element={<ParentDashboard />} />
            <Route path="/assessment" element={<CareerAssessmentPage />} />
            <Route path="/trends" element={<CareerTrendsPage />} />
            {/* Add more routes as features are built */}
          </Routes>
        </main>

        <footer className="bg-gray-100 dark:bg-gray-800 p-4 text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Visarisk. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
