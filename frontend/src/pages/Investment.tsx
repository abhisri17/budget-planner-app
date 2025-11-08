// src/pages/Investment.tsx

import { useState } from 'react';
import InvestmentPlanner from '../components/investment/InvestmentPlanner';

type CalculatorType = 'planner' | 'retirement' | 'goal' | null;

const Investment = () => {
  const [selectedCalculator, setSelectedCalculator] = useState<CalculatorType>(null);

  const calculators = [
    {
      id: 'planner',
      name: 'Investment Planner',
      description: 'Calculate future value of your investments with yearly contribution increases',
      icon: '💰',
      color: 'blue',
    },
    {
      id: 'retirement',
      name: 'Retirement Calculator',
      description: 'Plan your retirement corpus and monthly expenses',
      icon: '🏖️',
      color: 'purple',
      comingSoon: true,
    },
    {
      id: 'goal',
      name: 'Goal-Based Investment',
      description: 'Calculate investments needed to reach your financial goals',
      icon: '🎯',
      color: 'green',
      comingSoon: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Investment Calculators</h1>
          <p className="text-gray-600">Plan your investments and secure your financial future</p>
        </div>

        {!selectedCalculator ? (
          /* Calculator Selection Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.map((calc) => (
              <button
                key={calc.id}
                onClick={() => !calc.comingSoon && setSelectedCalculator(calc.id as CalculatorType)}
                disabled={calc.comingSoon}
                className={`bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow duration-300 text-left group relative ${
                  calc.comingSoon ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                {calc.comingSoon && (
                  <span className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                )}
                <div className="flex items-start space-x-4">
                  <div className="text-5xl">{calc.icon}</div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold text-gray-900 mb-2 ${
                      !calc.comingSoon && 'group-hover:text-blue-600'
                    } transition`}>
                      {calc.name}
                    </h3>
                    <p className="text-gray-600">{calc.description}</p>
                  </div>
                  {!calc.comingSoon && (
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
                  )}
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
                Back to Investment Calculators
              </button>
            </div>

            {/* Calculator Content */}
            <div>
              {selectedCalculator === 'planner' && <InvestmentPlanner />}
              {/* Add more calculators here as you build them */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Investment;
