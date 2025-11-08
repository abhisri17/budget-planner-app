// src/components/investment/InputForm.tsx

import React from 'react';
import type { InvestmentInputs } from '../../types/investment.types';

interface InputFormProps {
  inputs: InvestmentInputs;
  onUpdate: (field: keyof InvestmentInputs, value: number) => void;
}

export const InputForm: React.FC<InputFormProps> = ({ inputs, onUpdate }) => {
  const handleChange = (field: keyof InvestmentInputs) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    
    // Allow empty string during typing
    if (value === '') {
      onUpdate(field, 0);
      return;
    }
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      onUpdate(field, numValue);
    }
  };

  const handlePercentageChange = (field: 'yearlyIncrease' | 'inflation') => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    
    // Allow empty string during typing
    if (value === '') {
      onUpdate(field, 0);
      return;
    }
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      onUpdate(field, numValue / 100);
    }
  };

  // Calculate investment period safely
  const investmentPeriod = Math.max(0, inputs.retirementAge - inputs.currentAge);
  const totalMonths = investmentPeriod * 12;
  const isValidPeriod = investmentPeriod > 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        Investment Parameters
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Age
          </label>
          <input
            type="number"
            value={inputs.currentAge || ''}
            onChange={handleChange('currentAge')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="18"
            max="100"
            placeholder="Enter your current age"
          />
        </div>

        {/* Retirement Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Retirement Age
          </label>
          <input
            type="number"
            value={inputs.retirementAge || ''}
            onChange={handleChange('retirementAge')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min={inputs.currentAge + 1}
            max="100"
            placeholder="Enter retirement age"
          />
          {inputs.retirementAge <= inputs.currentAge && inputs.retirementAge > 0 && (
            <p className="text-red-500 text-xs mt-1">
              Retirement age must be greater than current age
            </p>
          )}
        </div>

        {/* Monthly Contribution */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Contribution (₹)
          </label>
          <input
            type="number"
            value={inputs.monthlyContribution || ''}
            onChange={handleChange('monthlyContribution')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="100"
            step="100"
            placeholder="Enter monthly amount"
          />
        </div>

        {/* Yearly Increase */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yearly Increase in Contribution (%)
          </label>
          <input
            type="number"
            value={inputs.yearlyIncrease ? (inputs.yearlyIncrease * 100).toFixed(1) : ''}
            onChange={handlePercentageChange('yearlyIncrease')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            max="100"
            step="0.1"
            placeholder="Enter percentage"
          />
        </div>

        {/* Inflation */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected Inflation (%)
          </label>
          <input
            type="number"
            value={inputs.inflation ? (inputs.inflation * 100).toFixed(1) : ''}
            onChange={handlePercentageChange('inflation')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            max="100"
            step="0.1"
            placeholder="Enter expected inflation rate"
          />
        </div>
      </div>

      {/* Investment Period Display */}
      <div className={`mt-4 p-4 rounded-lg ${
        isValidPeriod ? 'bg-blue-50' : 'bg-red-50'
      }`}>
        {isValidPeriod ? (
          <p className="text-sm text-blue-800">
            <strong>Investment Period:</strong> {investmentPeriod} years 
            ({totalMonths} months)
          </p>
        ) : (
          <p className="text-sm text-red-800">
            <strong>Invalid input:</strong> Please enter valid ages to see investment period
          </p>
        )}
      </div>
    </div>
  );
};
