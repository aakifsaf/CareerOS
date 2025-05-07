import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // For animations

// You can replace these with actual icons or images
const PlaceholderIcon = ({ className }) => <div className={`w-12 h-12 bg-indigo-500 rounded-lg ${className}`}></div>;

const LandingPage = () => {
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-4 pt-16 md:pt-24">
      {/* Hero Section */}
      <motion.section 
        className="text-center py-10 md:py-16"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Navigate Your Future with <span className="text-indigo-400">CareerOS</span>
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Discover personalized career paths, assess your skills, and stay ahead with AI-driven insights into the evolving job market.
        </motion.p>
        <motion.div 
          className="space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link 
            to="/register" 
            className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            Get Started
          </Link>
          <Link 
            to="/login" 
            className="inline-block bg-transparent hover:bg-indigo-500 text-indigo-300 hover:text-white border-2 border-indigo-400 font-semibold px-8 py-3 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out mt-4 sm:mt-0"
          >
            Login
          </Link>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-16 md:py-24 w-full max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-100">Why Choose Visarisk?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[ 
            { title: "Personalized Assessments", description: "Understand your strengths and interests to find the perfect career fit.", icon: PlaceholderIcon },
            { title: "AI-Powered Roadmaps", description: "Get dynamic career roadmaps that adapt to your progress and market trends.", icon: PlaceholderIcon },
            { title: "Live Career Trends", description: "Stay informed about in-demand skills and future-proof your career.", icon: PlaceholderIcon },
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-gray-800 p-8 rounded-xl shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 ease-in-out transform hover:-translate-y-2"
              variants={featureVariants}
            >
              <feature.icon className="mx-auto mb-6 h-16 w-16 text-indigo-400" />
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;
