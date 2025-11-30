// src/components/financial-goal-planner/GoalsSummary.tsx

import React from 'react';
import type { Goal } from '../../types/financialGoal.types';
import { formatCurrency, formatCrores } from '../../utils/financialGoalCalculations';

interface GoalsSummaryProps {
  goals: Goal[];
  totalAccumulatedWealth: number;
  goalsAchievable: boolean;
}

export const GoalsSummary: React.FC<GoalsSummaryProps> = ({
  goals,
  totalAccumulatedWealth,
  goalsAchievable,
}) => {
  const totalGoalsValue = goals.reduce((sum, goal) => sum + goal.valueAtTime, 0);
  const shortfall = Math.max(0, totalGoalsValue - totalAccumulatedWealth);
  const surplus = Math.max(0, totalAccumulatedWealth - totalGoalsValue);

  const goalsByCategory = {
    short: goals.filter(g => g.category === 'short'),
    medium: goals.filter(g => g.category === 'medium'),
    long: goals.filter(g => g.category === 'long'),
  };

  const categoryTotals = {
    short: goalsByCategory.short.reduce((sum, g) => sum + g.valueAtTime, 0),
    medium: goalsByCategory.medium.reduce((sum, g) => sum + g.valueAtTime, 0),
    long: goalsByCategory.long.reduce((sum, g) => sum + g.valueAtTime, 0),
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg shadow-lg p-6 text-white">
      <h3 className="text-2xl font-bold mb-6">Financial Goals Summary</h3>
      
      {/* Overall Status */}
      <div className="mb-6 p-4 bg-white/10 rounded-lg backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Plan Status</p>
            <p className="text-3xl font-bold mt-1">
              {goalsAchievable ? '✓ Goals Achievable' : '✗ Needs Adjustment'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">
              {goalsAchievable ? 'Surplus' : 'Shortfall'}
            </p>
            <p className="text-2xl font-bold mt-1">
              {goalsAchievable ? formatCrores(surplus) : formatCrores(shortfall)}
            </p>
          </div>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white/10 rounded-lg backdrop-blur">
          <p className="text-sm opacity-90">Total Goals Value</p>
          <p className="text-2xl font-bold mt-1">{formatCrores(totalGoalsValue)}</p>
          <p className="text-xs opacity-75 mt-1">After inflation adjustment</p>
        </div>
        
        <div className="p-4 bg-white/10 rounded-lg backdrop-blur">
          <p className="text-sm opacity-90">Projected Wealth</p>
          <p className="text-2xl font-bold mt-1">{formatCrores(totalAccumulatedWealth)}</p>
          <p className="text-xs opacity-75 mt-1">By year 30</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="space-y-3">
        <h4 className="font-semibold text-lg mb-3">Goals by Category</h4>
        
        {(['short', 'medium', 'long'] as const).map((category) => {
          const categoryGoals = goalsByCategory[category];
          const categoryTotal = categoryTotals[category];
          const categoryLabels = {
            short: 'Short Term (1-3 years)',
            medium: 'Medium Term (4-10 years)',
            long: 'Long Term (10+ years)',
          };

          return (
            <div key={category} className="p-3 bg-white/10 rounded-lg backdrop-blur">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{categoryLabels[category]}</span>
                <span className="font-bold">{formatCurrency(categoryTotal)}</span>
              </div>
              <div className="space-y-1">
                {categoryGoals.map(goal => (
                  <div key={goal.id} className="flex justify-between text-sm opacity-90">
                    <span>• {goal.name} (Year {goal.years})</span>
                    <span>{formatCurrency(goal.valueAtTime)}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommendation */}
      {!goalsAchievable && (
        <div className="mt-6 p-4 bg-red-500/20 border border-red-300/30 rounded-lg">
          <p className="font-semibold mb-2">💡 Recommendation</p>
          <p className="text-sm">
            To achieve all your goals, consider: increasing your starting salary, 
            adjusting goal amounts, extending timelines, or increasing investment returns 
            through higher-risk investments.
          </p>
        </div>
      )}
    </div>
  );
};
