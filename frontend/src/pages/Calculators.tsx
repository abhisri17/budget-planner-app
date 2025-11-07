import { useState } from 'react';
import SIPGoalCalculator from '../components/calculators/SIPGoalCalculator';
import EMICalculator from '../components/calculators/EMICalculator';

const Calculators = () => {
  const [selectedCalculator, setSelectedCalculator] = useState<'sipGoal' | 'emi' | null>(null);

  const calculators = [
    {
      id: 'sipGoal',
      name: 'SIP Goal Calculator',
      description: 'Calculate returns on your Systematic Investment Plan',
      icon: '📈',
      color: 'blue',
    },
    {
      id: 'emi',
      name: 'EMI Calculator',
      description: 'Calculate your monthly loan payments',
      icon: '🏦',
      color: 'green',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Financial Calculators</h1>
          <p className="text-gray-600">Choose a calculator to plan your finances better</p>
        </div>

        {!selectedCalculator ? (
          /* Calculator Selection Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {calculators.map((calc) => (
              <button
                key={calc.id}
                onClick={() => setSelectedCalculator(calc.id as 'sipGoal' | 'emi')}
                className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow duration-300 text-left group"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-5xl">{calc.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                      {calc.name}
                    </h3>
                    <p className="text-gray-600">{calc.description}</p>
                  </div>
                  <svg
                    className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Selected Calculator View */
          <div>
            {/* Back Button and Title */}
            <div className="flex items-center mb-6">
              <button
                onClick={() => setSelectedCalculator(null)}
                className="flex items-center text-blue-600 hover:text-blue-700 transition font-medium"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Calculators
              </button>
            </div>

            {/* Calculator Content */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              {selectedCalculator === 'sipGoal' && <SIPGoalCalculator />}
              {selectedCalculator === 'emi' && <EMICalculator />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculators;
