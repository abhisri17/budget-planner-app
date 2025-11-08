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
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      onUpdate(field, value);
    }
  };

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
            value={inputs.currentAge}
            onChange={handleChange('currentAge')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="18"
            max="100"
          />
        </div>

        {/* Retirement Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Retirement Age
          </label>
          <input
            type="number"
            value={inputs.retirementAge}
            onChange={handleChange('retirementAge')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min={inputs.currentAge + 1}
            max="100"
          />
        </div>

        {/* Monthly Contribution */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Contribution (₹)
          </label>
          <input
            type="number"
            value={inputs.monthlyContribution}
            onChange={handleChange('monthlyContribution')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="100"
            step="100"
          />
        </div>

        {/* Yearly Increase */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yearly Increase in Contribution (%)
          </label>
          <input
            type="number"
            value={inputs.yearlyIncrease * 100}
            onChange={(e) => onUpdate('yearlyIncrease', parseFloat(e.target.value) / 100)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            max="100"
            step="0.1"
          />
        </div>

        {/* Inflation */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected Inflation (%)
          </label>
          <input
            type="number"
            value={inputs.inflation * 100}
            onChange={(e) => onUpdate('inflation', parseFloat(e.target.value) / 100)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            max="100"
            step="0.1"
          />
        </div>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Investment Period:</strong> {inputs.retirementAge - inputs.currentAge} years 
          ({(inputs.retirementAge - inputs.currentAge) * 12} months)
        </p>
      </div>
    </div>
  );
};
