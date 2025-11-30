// src/components/investment/SummaryCard.tsx

import React from 'react';
import type { InvestmentInputs } from '../../types/investment.types';
import { InvestmentCalculator, formatCurrency } from '../../utils/investmentCalculations';

interface SummaryCardProps {
  inputs: InvestmentInputs;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ inputs }) => {
  const calculator = new InvestmentCalculator(inputs);
  const yearlySummary = calculator.getYearlySummary();
  
  // Handle case when summary is empty
  if (yearlySummary.length === 0) {
    return (
      <div className="bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg shadow-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Investment Summary</h3>
        <p className="text-white/80">Enter valid investment parameters to see summary</p>
      </div>
    );
  }
  
  const totalInvested = yearlySummary.reduce(
    (sum, year) => sum + (year.monthlyContribution * 12),
    0
  );

  const investmentPeriod = inputs.retirementAge - inputs.currentAge;

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
      <h3 className="text-xl font-bold mb-4">Investment Summary</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
          <p className="text-sm opacity-90">Investment Period</p>
          <p className="text-2xl font-bold mt-1">
            {investmentPeriod} Years
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
          Your monthly contribution will grow from{' '}
          <strong>{formatCurrency(inputs.monthlyContribution)}</strong> to{' '}
          <strong>{formatCurrency(yearlySummary[yearlySummary.length - 1].monthlyContribution)}</strong>{' '}
          over {investmentPeriod} years.
        </p>
      </div>
    </div>
  );
};
