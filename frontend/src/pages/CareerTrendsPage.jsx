import React from 'react';
import { motion } from 'framer-motion';

// Placeholder for a chart component or library (e.g., Chart.js, Recharts)
const PlaceholderChart = ({title}) => (
  <div className="bg-gray-700 p-6 rounded-lg shadow-lg aspect-video flex items-center justify-center">
    <p className="text-gray-400 text-lg">{title} - Chart Area</p>
  </div>
);

// Sample trend data - this would come from an API
const trendsData = [
  { id: 1, title: 'Artificial Intelligence & Machine Learning', growth: 'High', demand: 'Increasing', relatedSkills: ['Python', 'TensorFlow', 'Data Analysis'] },
  { id: 2, title: 'Renewable Energy Technologies', growth: 'High', demand: 'Increasing', relatedSkills: ['Solar Panel Installation', 'Wind Turbine Maintenance', 'Grid Management'] },
  { id: 3, title: 'Cybersecurity Analysis', growth: 'Medium', demand: 'Stable', relatedSkills: ['Network Security', 'Ethical Hacking', 'Cryptography'] },
  { id: 4, title: 'Digital Marketing & SEO', growth: 'Medium', demand: 'Increasing', relatedSkills: ['Content Creation', 'Google Analytics', 'Social Media Strategy'] },
];

const CareerTrendsPage = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div 
      className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-12rem)]"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ type: 'tween', ease: 'anticipate', duration: 0.5 }}
    >
      <div className="bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl w-full">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-indigo-400 mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Live Career Trends
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div variants={itemVariants} initial="initial" animate="in" transition={{delay: 0.2}}><PlaceholderChart title="Overall Job Market Growth" /></motion.div>
          <motion.div variants={itemVariants} initial="initial" animate="in" transition={{delay: 0.3}}><PlaceholderChart title="In-Demand Skills Evolution" /></motion.div>
        </div>

        <div className="space-y-6">
          {trendsData.map((trend, index) => (
            <motion.div 
              key={trend.id} 
              className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-shadow duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            >
              <h2 className="text-2xl font-semibold text-indigo-300 mb-2">{trend.title}</h2>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-400 mb-3">
                <span>Growth: <span className={`font-medium ${trend.growth === 'High' ? 'text-green-400' : 'text-yellow-400'}`}>{trend.growth}</span></span>
                <span>Demand: <span className={`font-medium ${trend.demand === 'Increasing' ? 'text-green-400' : 'text-yellow-400'}`}>{trend.demand}</span></span>
              </div>
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-gray-300 mb-1">Related Skills:</h3>
                <div className="flex flex-wrap gap-2">
                  {trend.relatedSkills.map(skill => (
                    <span key={skill} className="bg-gray-600 text-gray-300 px-3 py-1 rounded-full text-xs">{skill}</span>
                  ))}
                </div>
              </div>
              <a href="#" className="text-indigo-400 hover:text-indigo-300 hover:underline text-sm font-medium transition-colors">
                Learn More &rarr;
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  );
};

export default CareerTrendsPage;
