// src/components/investment/InvestmentPlanner.tsx

import React from 'react';
import { useInvestmentCalculator } from '../../hooks/useInvestmentCalculator';
import { InputForm } from './InputForm';
import { ResultsTable } from './ResultsTable';
import { SummaryCard } from './SummaryCard';

const InvestmentPlanner: React.FC = () => {
  const { inputs, results, updateInput } = useInvestmentCalculator();

  return (
    <div className="space-y-6">
      {/* Calculator Title - Since we're inside a card now */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">Investment Planner Calculator</h2>
        <p className="text-blue-100">
          Calculate how your investments will grow over time with yearly contribution increases
        </p>
      </div>

      {/* Input Form */}
      <InputForm inputs={inputs} onUpdate={updateInput} />

      {/* Summary Card */}
      <SummaryCard inputs={inputs} />

      {/* Results Table */}
      <ResultsTable scenarios={results.scenarios} />

      {/* Footer Info */}
      <div className="text-center text-sm text-gray-500 pt-4">
        <p>Based on the Abhinav Srivastava Investment Calculator methodology</p>
      </div>
    </div>
  );
};

export default InvestmentPlanner;
