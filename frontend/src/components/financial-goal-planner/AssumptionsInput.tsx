// src/components/financial-goal-planner/AssumptionsInput.tsx

import React from 'react';
import type { AssumptionInputs } from '../../types/financialGoal.types';

interface AssumptionsInputProps {
  assumptions: AssumptionInputs;
  onUpdate: (field: keyof AssumptionInputs, value: number) => void;
  startingSalary: number;
  onSalaryUpdate: (value: number) => void;
  wantsInvestmentPercentage: number;
  onWantsPercentageUpdate: (value: number) => void;
}

export const AssumptionsInput: React.FC<AssumptionsInputProps> = ({
  assumptions,
  onUpdate,
  startingSalary,
  onSalaryUpdate,
  wantsInvestmentPercentage,
  onWantsPercentageUpdate,
}) => {
  const handlePercentageChange = (field: keyof AssumptionInputs) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      onUpdate(field, value / 100);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Assumptions & Inputs</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Annual Increment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Increment (%)
          </label>
          <input
            type="number"
            value={(assumptions.annualIncrement * 100).toFixed(1)}
            onChange={handlePercentageChange('annualIncrement')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            max="100"
            step="0.1"
          />
        </div>

        {/* Job Change Increment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Change Increment (%)
          </label>
          <input
            type="number"
            value={(assumptions.jobChangeIncrement * 100).toFixed(1)}
            onChange={handlePercentageChange('jobChangeIncrement')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            max="100"
            step="0.1"
          />
        </div>

        {/* Inflation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Inflation (%)
          </label>
          <input
            type="number"
            value={(assumptions.inflation * 100).toFixed(1)}
            onChange={handlePercentageChange('inflation')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            max="100"
            step="0.1"
          />
        </div>

        {/* Investment Returns */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Investment Returns (%)
          </label>
          <input
            type="number"
            value={(assumptions.investmentReturns * 100).toFixed(1)}
            onChange={handlePercentageChange('investmentReturns')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            max="100"
            step="0.1"
          />
        </div>

        {/* Starting Salary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Starting Annual Salary (₹)
          </label>
          <input
            type="number"
            value={startingSalary}
            onChange={(e) => onSalaryUpdate(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            step="10000"
          />
        </div>

        {/* Wants Investment Percentage */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Wants to Invest (%)
          </label>
          <input
            type="number"
            value={(wantsInvestmentPercentage * 100).toFixed(0)}
            onChange={(e) => onWantsPercentageUpdate(parseFloat(e.target.value) / 100 || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            max="100"
            step="5"
          />
        </div>
      </div>
    </div>
  );
};
