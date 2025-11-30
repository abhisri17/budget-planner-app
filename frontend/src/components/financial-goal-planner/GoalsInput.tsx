// src/components/financial-goal-planner/GoalsInput.tsx

import React, { useState } from 'react';
import type { Goal } from '../../types/financialGoal.types';
import { formatCurrency } from '../../utils/financialGoalCalculations';

interface GoalsInputProps {
  goals: Goal[];
  onUpdateGoal: (id: string, updates: Partial<Goal>) => void;
  onDeleteGoal: (id: string) => void;
  onAddGoal: (goal: Omit<Goal, 'id' | 'valueAtTime'>) => void;
}

export const GoalsInput: React.FC<GoalsInputProps> = ({
  goals,
  onUpdateGoal,
  onDeleteGoal,
  onAddGoal,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    amount: 0,
    years: 1,
    category: 'medium' as 'short' | 'medium' | 'long',
  });

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.amount > 0) {
      onAddGoal(newGoal);
      setNewGoal({ name: '', amount: 0, years: 1, category: 'medium' });
      setShowAddForm(false);
    }
  };

  const categoryColors = {
    short: 'bg-green-100 text-green-800',
    medium: 'bg-blue-100 text-blue-800',
    long: 'bg-purple-100 text-purple-800',
  };

  const groupedGoals = {
    short: goals.filter(g => g.category === 'short'),
    medium: goals.filter(g => g.category === 'medium'),
    long: goals.filter(g => g.category === 'long'),
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Financial Goals</h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {showAddForm ? 'Cancel' : '+ Add Goal'}
        </button>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Goal Name"
              value={newGoal.name}
              onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newGoal.amount || ''}
              onChange={(e) => setNewGoal({ ...newGoal, amount: parseFloat(e.target.value) || 0 })}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Years"
              value={newGoal.years}
              onChange={(e) => setNewGoal({ ...newGoal, years: parseInt(e.target.value) || 1 })}
              className="px-4 py-2 border border-gray-300 rounded-lg"
              min="1"
            />
            <select
              value={newGoal.category}
              onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as any })}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="short">Short Term</option>
              <option value="medium">Medium Term</option>
              <option value="long">Long Term</option>
            </select>
          </div>
          <button
            onClick={handleAddGoal}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Add Goal
          </button>
        </div>
      )}

      {/* Goals Display */}
      <div className="space-y-6">
        {(['short', 'medium', 'long'] as const).map((category) => (
          <div key={category}>
            <h4 className="text-lg font-semibold text-gray-700 mb-3 capitalize">
              {category} Term Goals
            </h4>
            <div className="space-y-2">
              {groupedGoals[category].map((goal) => (
                <div
                  key={goal.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                      type="text"
                      value={goal.name}
                      onChange={(e) => onUpdateGoal(goal.id, { name: e.target.value })}
                      className="px-3 py-1 border border-gray-300 rounded"
                    />
                    <input
                      type="number"
                      value={goal.amount}
                      onChange={(e) => onUpdateGoal(goal.id, { amount: parseFloat(e.target.value) })}
                      className="px-3 py-1 border border-gray-300 rounded"
                    />
                    <input
                      type="number"
                      value={goal.years}
                      onChange={(e) => onUpdateGoal(goal.id, { years: parseInt(e.target.value) })}
                      className="px-3 py-1 border border-gray-300 rounded"
                      min="1"
                    />
                    <div className="text-sm">
                      <span className="text-gray-600">Future Value: </span>
                      <span className="font-semibold">{formatCurrency(goal.valueAtTime)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteGoal(goal.id)}
                    className="ml-4 px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
