// src/components/financial-goal-planner/FinancialGoalPlanner.tsx

import React, { useState } from 'react';
import { useFinancialGoalCalculator } from '../../hooks/useFinancialGoalCalculator';
import { AssumptionsInput } from './AssumptionsInput';
import { GoalsInput } from './GoalsInput';
import { BudgetTable } from './BudgetTable';
import { CashFlowTable } from './CashFlowTable';
import { GoalsSummary } from './GoalsSummary';

const FinancialGoalPlanner: React.FC = () => {
  const {
    assumptions,
    startingSalary,
    goals,
    results,
    updateAssumption,
    setStartingSalary,
    addGoal,
    updateGoal,
    deleteGoal,
  } = useFinancialGoalCalculator();

  const [activeTab, setActiveTab] = useState<'assumptions' | 'goals' | 'budget' | 'cashflow'>('assumptions');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">Financial Goal Planning Calculator</h2>
        <p className="text-indigo-100">
          Plan your financial future with 50-20-30 budget rule (50% Needs, 20% Wants, 30% Investments)
        </p>
      </div>

      {/* Summary Card */}
      <GoalsSummary
        goals={goals}
        totalAccumulatedWealth={results.totalAccumulatedWealth}
        goalsAchievable={results.goalsAchievable}
      />

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 px-6" aria-label="Tabs">
            {[
              { id: 'assumptions', label: 'Assumptions & Inputs', icon: '⚙️' },
              { id: 'goals', label: 'Financial Goals', icon: '🎯' },
              { id: 'budget', label: 'Budget Projection', icon: '💰' },
              { id: 'cashflow', label: 'Cash Flow', icon: '📊' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-3 font-medium text-sm border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'assumptions' && (
            <AssumptionsInput
              assumptions={assumptions}
              onUpdate={updateAssumption}
              startingSalary={startingSalary}
              onSalaryUpdate={setStartingSalary}
            />
          )}

          {activeTab === 'goals' && (
            <GoalsInput
              goals={goals}
              onUpdateGoal={updateGoal}
              onDeleteGoal={deleteGoal}
              onAddGoal={addGoal}
            />
          )}

          {activeTab === 'budget' && (
            <BudgetTable budgetData={results.budgetData} />
          )}

          {activeTab === 'cashflow' && (
            <CashFlowTable cashFlowData={results.cashFlowData} goals={goals} />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 pt-4">
        <p>Based on the 50-20-30 budget rule and Abhinav Srivastava Financial Goal Planning methodology</p>
      </div>
    </div>
  );
};

export default FinancialGoalPlanner;
