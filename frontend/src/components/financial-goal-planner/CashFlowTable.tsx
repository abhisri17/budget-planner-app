// src/components/financial-goal-planner/CashFlowTable.tsx

import React, { useState, useMemo } from 'react';
import type { CashFlowYear, Goal } from '../../types/financialGoal.types';
import { formatCurrency, formatCrores } from '../../utils/financialGoalCalculations';
import { FinancialGoalCalculator } from '../../utils/financialGoalCalculations';

interface CashFlowTableProps {
  cashFlowData: CashFlowYear[];
  goals: Goal[];
}

export const CashFlowTable: React.FC<CashFlowTableProps> = ({ cashFlowData, goals }) => {
  const [showAllYears, setShowAllYears] = useState(false);
  
  const displayData = showAllYears ? cashFlowData : cashFlowData.slice(0, 10);

  // Create a map of goal occurrences by year
  const goalsByYear = useMemo(() => {
    const map: Record<number, Array<{ goal: Goal; amount: number }>> = {};
    
    goals.forEach(goal => {
      if (!goal.isRecurring) {
        // One-time goal
        if (!map[goal.years]) map[goal.years] = [];
        map[goal.years].push({
          goal,
          amount: goal.valueAtTime,
        });
      } else {
        // Recurring goal
        const interval = goal.recurringInterval || 1;
        let currentYear = goal.years;
        
        while (currentYear <= 30) {
          if (!map[currentYear]) map[currentYear] = [];
          
          // Calculate inflation-adjusted value for this occurrence
          const amount = goal.amount * Math.pow(1.06, currentYear);
          
          map[currentYear].push({
            goal,
            amount,
          });
          
          currentYear += interval;
        }
      }
    });
    
    return map;
  }, [goals]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Cash Flow Projection</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-2 font-semibold text-gray-700">Year</th>
              <th className="text-right py-3 px-2 font-semibold text-gray-700">Wants (Before)</th>
              <th className="text-right py-3 px-2 font-semibold text-gray-700">Investments (Before)</th>
              <th className="text-left py-3 px-2 font-semibold text-gray-700">Goals</th>
              <th className="text-right py-3 px-2 font-semibold text-gray-700">From Wants</th>
              <th className="text-right py-3 px-2 font-semibold text-gray-700">From Investments</th>
              <th className="text-right py-3 px-2 font-semibold text-gray-700">Wants (After)</th>
              <th className="text-right py-3 px-2 font-semibold text-gray-700">Investments (After)</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((yearData) => {
              const goalsThisYear = goalsByYear[yearData.year] || [];
              const hasGoals = goalsThisYear.length > 0;
              
              return (
                <tr
                  key={yearData.year}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition ${
                    hasGoals ? 'bg-purple-50' : ''
                  }`}
                >
                  <td className="py-3 px-2 font-medium">{yearData.year}</td>
                  
                  <td className="text-right py-3 px-2 text-purple-600">
                    {formatCurrency(yearData.wantsBeforeGoals || 0)}
                  </td>
                  
                  <td className="text-right py-3 px-2 text-blue-600">
                    {formatCurrency(yearData.investmentsBeforeGoals || 0)}
                  </td>
                  
                  <td className="py-3 px-2">
                    {hasGoals ? (
                      <div className="text-xs space-y-1">
                        {goalsThisYear.map((g, idx) => (
                          <div key={idx} className="flex items-center">
                            <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                            <span className="font-medium">{g.goal.name}</span>
                            {g.goal.isRecurring && (
                              <span className="ml-1 text-blue-600">🔄</span>
                            )}
                          </div>
                        ))}
                        <div className="font-semibold text-red-600 mt-1">
                          Total: {formatCurrency(yearData.goalsThisYear || 0)}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  
                  <td className="text-right py-3 px-2">
                    {(yearData.amountFromWants || 0) > 0 ? (
                      <span className="text-red-600 font-semibold">
                        -{formatCurrency(yearData.amountFromWants || 0)}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  
                  <td className="text-right py-3 px-2">
                    {(yearData.amountFromInvestments || 0) > 0 ? (
                      <span className="text-red-600 font-semibold">
                        -{formatCurrency(yearData.amountFromInvestments || 0)}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  
                  <td className="text-right py-3 px-2 font-bold text-purple-600">
                    {formatCurrency(yearData.wantsAmount)}
                  </td>
                  
                  <td className="text-right py-3 px-2 font-bold text-blue-600">
                    {formatCurrency(yearData.investmentAmount)}
                  </td>
                  
                  <td className="text-center py-3 px-2">
                    {hasGoals && (
                      yearData.canMeetGoals ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                          ✓ Met
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                          ✗ Shortfall
                        </span>
                      )
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {cashFlowData.length > 10 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAllYears(!showAllYears)}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            {showAllYears ? 'Show Less' : `Show All ${cashFlowData.length} Years`}
          </button>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-gray-600">Final Wants Balance</p>
          <p className="text-xl font-bold text-purple-600">
            {formatCrores(cashFlowData[cashFlowData.length - 1]?.wantsAmount || 0)}
          </p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">Final Investment Balance</p>
          <p className="text-xl font-bold text-blue-600">
            {formatCrores(cashFlowData[cashFlowData.length - 1]?.investmentAmount || 0)}
          </p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600">Total Remaining Wealth</p>
          <p className="text-xl font-bold text-green-600">
            {formatCrores(
              (cashFlowData[cashFlowData.length - 1]?.wantsAmount || 0) +
              (cashFlowData[cashFlowData.length - 1]?.investmentAmount || 0)
            )}
          </p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400">
        <p className="text-sm text-blue-800">
          <strong>💡 Recurring Goals:</strong> Goals marked with 🔄 repeat at specified intervals. 
          Each occurrence is inflation-adjusted and deducted from your wealth when due.
        </p>
      </div>
    </div>
  );
};
