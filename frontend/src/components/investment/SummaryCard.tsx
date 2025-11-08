// src/components/investment-planner/SummaryCard.tsx

import React from 'react';
import { InvestmentCalculator, formatCurrency } from '../../utils/investmentCalculations';
import type { InvestmentInputs } from '../../types/investment.types';

interface SummaryCardProps {
  inputs: InvestmentInputs;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ inputs }) => {
  const calculator = new InvestmentCalculator(inputs);
  const yearlySummary = calculator.getYearlySummary();
  
  const totalInvested = yearlySummary.reduce(
    (sum, year) => sum + (year.monthlyContribution * 12),
    0
  );

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 text-white mb-6">
      <h3 className="text-xl font-bold mb-4">Investment Summary</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
          <p className="text-sm opacity-90">Investment Period</p>
          <p className="text-2xl font-bold mt-1">
            {inputs.retirementAge - inputs.currentAge} Years
          </p>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
          <p className="text-sm opacity-90">Starting Contribution</p>
          <p className="text-2xl font-bold mt-1">
            {formatCurrency(inputs.monthlyContribution)}
          </p>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
          <p className="text-sm opacity-90">Total Invested (Approx)</p>
          <p className="text-2xl font-bold mt-1">
            {formatCurrency(totalInvested)}
          </p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-white/10 rounded backdrop-blur">
        <p className="text-sm">
          Your monthly contribution will grow from <strong>{formatCurrency(inputs.monthlyContribution)}</strong> to{' '}
          <strong>{formatCurrency(yearlySummary[yearlySummary.length - 1].monthlyContribution)}</strong> over {inputs.retirementAge - inputs.currentAge} years.
        </p>
      </div>
    </div>
  );
};
