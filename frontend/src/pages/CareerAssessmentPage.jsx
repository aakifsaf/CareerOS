import React from 'react';
import { motion } from 'framer-motion';

const CareerAssessmentPage = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  // Example questions - this would likely come from an API or state management
  const assessmentQuestions = [
    { id: 1, text: 'I enjoy solving complex problems.', type: 'likert' },
    { id: 2, text: 'I prefer working in a team rather than alone.', type: 'likert' },
    { id: 3, text: 'I am good at organizing tasks and managing time.', type: 'likert' },
    { id: 4, text: 'What are your top 3 skills? (e.g., programming, communication, design)', type: 'text' },
    { id: 5, text: 'Which industries are you most interested in?', type: 'multiple-choice', options: ['Technology', 'Healthcare', 'Finance', 'Education', 'Creative Arts'] },
  ];

  return (
    <motion.div 
      className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-12rem)]"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ type: 'tween', ease: 'anticipate', duration: 0.5 }}
    >
      <div className="bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-3xl mx-auto">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-indigo-400 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Career Assessment
        </motion.h1>
        
        <motion.p 
          className="text-gray-300 mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Answer the following questions to help us understand your skills, interests, and preferences. This will enable us to provide you with personalized career recommendations.
        </motion.p>

        <form className="space-y-8">
          {assessmentQuestions.map((q, index) => (
            <motion.div 
              key={q.id} 
              className="p-6 bg-gray-700 rounded-lg shadow-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <label className="block text-lg font-medium text-gray-200 mb-3">{index + 1}. {q.text}</label>
              {q.type === 'likert' && (
                <div className="flex space-x-2 md:space-x-4 justify-center text-sm">
                  {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((label, i) => (
                    <label key={i} className="flex flex-col items-center space-y-1 cursor-pointer hover:text-indigo-300">
                      <input type="radio" name={`question-${q.id}`} value={i+1} className="form-radio text-indigo-500 focus:ring-indigo-400" />
                      <span className="text-xs md:text-sm text-gray-400 text-center">{label}</span>
                    </label>
                  ))}
                </div>
              )}
              {q.type === 'text' && (
                <input type="text" className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Your answer..." />
              )}
              {q.type === 'multiple-choice' && (
                <select className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-indigo-500 focus:border-indigo-500 appearance-none">
                  <option value="" disabled selected>Select an option</option>
                  {q.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              )}
            </motion.div>
          ))}
          <motion.button 
            type="submit" 
            className="w-full mt-10 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + assessmentQuestions.length * 0.1 }}
          >
            Submit Assessment
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default CareerAssessmentPage;
