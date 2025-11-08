// src/components/investment/ResultsTable.tsx

import React from 'react';
import type { ReturnScenario } from '../../types/investment.types';
import { formatCurrency, formatCrores } from '../../utils/investmentCalculations';

interface ResultsTableProps {
  scenarios: ReturnScenario[];
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ scenarios }) => {
  // Show message if no scenarios available
  if (scenarios.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Investment Projections at Retirement
        </h2>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Enter valid investment parameters to see projections
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Investment Projections at Retirement
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Return Rate
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">
                Future Value
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">
                Inflation-Adjusted Value
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">
                Value in Today's Money
              </th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map((scenario) => (
              <tr
                key={scenario.returnRate}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-4">
                  <span className="font-medium text-gray-800">
                    {scenario.label}
                  </span>
                </td>
                <td className="text-right py-4 px-4 font-medium text-gray-900">
                  {formatCurrency(scenario.totalFV)}
                </td>
                <td className="text-right py-4 px-4 font-medium text-green-600">
                  {formatCurrency(scenario.totalNPV)}
                </td>
                <td className="text-right py-4 px-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
                    ₹{formatCrores(scenario.valueInCrores)} Crores
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> The "Inflation-Adjusted Value" shows what your investment 
          will be worth in today's purchasing power, accounting for inflation over the years.
        </p>
      </div>
    </div>
  );
};
