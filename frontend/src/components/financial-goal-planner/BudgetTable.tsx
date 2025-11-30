// src/components/financial-goal-planner/BudgetTable.tsx

import React, { useState } from 'react';
import type { BudgetYear } from '../../types/financialGoal.types';
import { formatCurrency, formatPercentage } from '../../utils/financialGoalCalculations';

interface BudgetTableProps {
  budgetData: BudgetYear[];
}

export const BudgetTable: React.FC<BudgetTableProps> = ({ budgetData }) => {
  const [showAllYears, setShowAllYears] = useState(false);
  
  // Show first 10 years by default
  const displayData = showAllYears ? budgetData : budgetData.slice(0, 10);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Budget Projection</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-2 font-semibold text-gray-700">Year</th>
              <th className="text-right py-3 px-2 font-semibold text-gray-700">Starting Salary</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-700">Job Change?</th>
              <th className="text-right py-3 px-2 font-semibold text-gray-700">Increment</th>
              <th className="text-right py-3 px-2 font-semibold text-gray-700">Ending Salary</th>
              <th className="text-right py-3 px-2 font-semibold text-gray-700">Monthly Needs</th>
              <th className="text-right py-3 px-2 font-semibold text-gray-700">Monthly Wants</th>
              <th className="text-right py-3 px-2 font-semibold text-gray-700">Monthly Investments</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-700">Needs %</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-700">Wants %</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-700">Investments %</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((year) => (
              <tr
                key={year.year}
                className={`border-b border-gray-100 hover:bg-gray-50 transition ${
                  year.jobChange ? 'bg-yellow-50' : ''
                }`}
              >
                <td className="py-3 px-2 font-medium">{year.year}</td>
                <td className="text-right py-3 px-2">{formatCurrency(year.startingSalary)}</td>
                <td className="text-center py-3 px-2">
                  {year.jobChange ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      Yes
                    </span>
                  ) : (
                    <span className="text-gray-400">No</span>
                  )}
                </td>
                <td className="text-right py-3 px-2 text-green-600 font-medium">
                  {formatCurrency(year.increment)}
                </td>
                <td className="text-right py-3 px-2 font-semibold">{formatCurrency(year.endingSalary)}</td>
                <td className="text-right py-3 px-2">{formatCurrency(year.monthlyNeeds)}</td>
                <td className="text-right py-3 px-2">{formatCurrency(year.monthlyWants)}</td>
                <td className="text-right py-3 px-2 text-blue-600 font-medium">
                  {formatCurrency(year.monthlyInvestments)}
                </td>
                <td className="text-center py-3 px-2 text-xs">{formatPercentage(year.needsPercentage)}</td>
                <td className="text-center py-3 px-2 text-xs">{formatPercentage(year.wantsPercentage)}</td>
                <td className="text-center py-3 px-2 text-xs">{formatPercentage(year.investmentsPercentage)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {budgetData.length > 10 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAllYears(!showAllYears)}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            {showAllYears ? 'Show Less' : `Show All ${budgetData.length} Years`}
          </button>
        </div>
      )}

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Job changes are highlighted in yellow. The allocation percentages 
          adjust over time as your income grows, with investments taking a larger share.
        </p>
      </div>
    </div>
  );
};
