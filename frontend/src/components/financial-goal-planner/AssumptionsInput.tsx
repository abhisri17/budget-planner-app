// src/components/financial-goal-planner/AssumptionsInput.tsx

import React, { useState } from 'react';
import type { AssumptionInputs } from '../../types/financialGoal.types';

interface AssumptionsInputProps {
  assumptions: AssumptionInputs;
  onUpdate: (field: keyof AssumptionInputs, value: number | number[]) => void;
  startingSalary: number;
  onSalaryUpdate: (value: number) => void;
  // REMOVED: wantsInvestmentPercentage and onWantsPercentageUpdate
}

export const AssumptionsInput: React.FC<AssumptionsInputProps> = ({
  assumptions,
  onUpdate,
  startingSalary,
  onSalaryUpdate,
  // REMOVED: wantsInvestmentPercentage and onWantsPercentageUpdate from destructuring
}) => {
  const [jobChangeInput, setJobChangeInput] = useState(
    assumptions.jobChangeYears.join(', ')
  );

  const handlePercentageChange = (field: keyof AssumptionInputs) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      onUpdate(field, value / 100);
    }
  };

  const handleJobChangeYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setJobChangeInput(value);

    // Parse comma-separated years
    const years = value
      .split(',')
      .map(y => parseInt(y.trim()))
      .filter(y => !isNaN(y) && y > 0 && y <= 30)
      .sort((a, b) => a - b);

    onUpdate('jobChangeYears', years);
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

        {/* REMOVED: Wants Investment Percentage field */}

        {/* Job Change Years */}
        <div className="md:col-span-2 lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Change Years
            <span className="text-gray-500 text-xs ml-2">
              (Enter years separated by commas, e.g., 9, 14, 21, 27)
            </span>
          </label>
          <input
            type="text"
            value={jobChangeInput}
            onChange={handleJobChangeYearsChange}
            placeholder="e.g., 9, 14, 21, 27"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="mt-2">
            {assumptions.jobChangeYears.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Job changes in years:</span>
                {assumptions.jobChangeYears.map(year => (
                  <span
                    key={year}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold"
                  >
                    Year {year}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No job changes planned</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Salary Allocation:</h4>
        <div className="grid grid-cols-3 gap-4 text-center mb-4">
          <div className="p-3 bg-white rounded-lg">
            <p className="text-2xl font-bold text-green-600">50%</p>
            <p className="text-sm text-gray-600">Needs</p>
          </div>
          <div className="p-3 bg-white rounded-lg">
            <p className="text-2xl font-bold text-purple-600">20%</p>
            <p className="text-sm text-gray-600">Wants</p>
          </div>
          <div className="p-3 bg-white rounded-lg">
            <p className="text-2xl font-bold text-blue-600">30%</p>
            <p className="text-sm text-gray-600">Investments</p>
          </div>
        </div>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Annual Increment:</strong> Regular yearly salary increase</li>
          <li>• <strong>Job Change Increment:</strong> Salary jump when switching jobs</li>
          <li>• <strong>Job Change Years:</strong> Specify which years you plan to change jobs</li>
          <li>• All salary allocations adjust automatically based on increment</li>
          <li>• 100% of wants amount is invested with returns</li>
        </ul>
      </div>
    </div>
  );
};
