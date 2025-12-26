// src/components/financial-goal-planner/GoalsInput.tsx

import React, { useState } from "react";
import type { Goal } from "../../types/financialGoal.types";
import { formatCurrency } from "../../utils/financialGoalCalculations";

interface GoalsInputProps {
  goals: Goal[];
  onUpdateGoal: (id: string, updates: Partial<Goal>) => void;
  onDeleteGoal: (id: string) => void;
  onAddGoal: (goal: Omit<Goal, "id" | "valueAtTime">) => void;
}

export const GoalsInput: React.FC<GoalsInputProps> = ({
  goals,
  onUpdateGoal,
  onDeleteGoal,
  onAddGoal,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    amount: 0,
    years: 1,
    category: "medium" as "short" | "medium" | "long",
    isRecurring: false,
    recurringInterval: 1,
  });

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.amount > 0) {
      onAddGoal(newGoal);
      setNewGoal({
        name: "",
        amount: 0,
        years: 1,
        category: "medium",
        isRecurring: false,
        recurringInterval: 1,
      });
      setShowAddForm(false);
    }
  };

  // const categoryColors = {
  //   short: "bg-green-100 text-green-800",
  //   medium: "bg-blue-100 text-blue-800",
  //   long: "bg-purple-100 text-purple-800",
  // };

  const groupedGoals = {
    short: goals.filter((g) => g.category === "short"),
    medium: goals.filter((g) => g.category === "medium"),
    long: goals.filter((g) => g.category === "long"),
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Financial Goals</h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {showAddForm ? "Cancel" : "+ Add Goal"}
        </button>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Goal Name"
                value={newGoal.name}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <input
              type="number"
              placeholder="Amount"
              value={newGoal.amount || ""}
              onChange={(e) =>
                setNewGoal({
                  ...newGoal,
                  amount: parseFloat(e.target.value) || 0,
                })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />

            <input
              type="number"
              placeholder="Starting in Year"
              value={newGoal.years}
              onChange={(e) =>
                setNewGoal({ ...newGoal, years: parseInt(e.target.value) || 1 })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg"
              min="1"
            />

            <select
              value={newGoal.category}
              onChange={(e) =>
                setNewGoal({ ...newGoal, category: e.target.value as any })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="short">Short Term</option>
              <option value="medium">Medium Term</option>
              <option value="long">Long Term</option>
            </select>

            <div className="flex items-center space-x-4 px-4 py-2 border border-gray-300 rounded-lg bg-white">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={newGoal.isRecurring}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, isRecurring: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Recurring
                </span>
              </label>

              {newGoal.isRecurring && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Every</span>
                  <input
                    type="number"
                    value={newGoal.recurringInterval}
                    onChange={(e) =>
                      setNewGoal({
                        ...newGoal,
                        recurringInterval: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-16 px-2 py-1 border border-gray-300 rounded"
                    min="1"
                  />
                  <span className="text-sm text-gray-600">year(s)</span>
                </div>
              )}
            </div>
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
        {(["short", "medium", "long"] as const).map((category) => (
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
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    {/* Goal Name */}
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={goal.name}
                        onChange={(e) =>
                          onUpdateGoal(goal.id, { name: e.target.value })
                        }
                        className="w-full px-3 py-1 border border-gray-300 rounded"
                      />
                    </div>

                    {/* Amount */}
                    <input
                      type="number"
                      value={goal.amount}
                      onChange={(e) =>
                        onUpdateGoal(goal.id, {
                          amount: parseFloat(e.target.value),
                        })
                      }
                      className="px-3 py-1 border border-gray-300 rounded"
                      placeholder="Amount"
                    />

                    {/* Starting Year */}
                    <input
                      type="number"
                      value={goal.years}
                      onChange={(e) =>
                        onUpdateGoal(goal.id, {
                          years: parseInt(e.target.value),
                        })
                      }
                      className="px-3 py-1 border border-gray-300 rounded"
                      min="1"
                      placeholder="Year"
                    />

                    {/* Recurring Controls */}
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={goal.isRecurring}
                          onChange={(e) =>
                            onUpdateGoal(goal.id, {
                              isRecurring: e.target.checked,
                            })
                          }
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-xs font-medium text-gray-700">
                          Repeat
                        </span>
                      </label>

                      {goal.isRecurring && (
                        <input
                          type="number"
                          value={goal.recurringInterval || 1}
                          onChange={(e) =>
                            onUpdateGoal(goal.id, {
                              recurringInterval: parseInt(e.target.value) || 1,
                            })
                          }
                          className="w-12 px-2 py-1 border border-gray-300 rounded text-xs"
                          min="1"
                          title="Repeat every X years"
                        />
                      )}
                    </div>

                    {/* Future Value */}
                    <div className="text-sm">
                      <span className="text-gray-600">Value: </span>
                      <span className="font-semibold">
                        {formatCurrency(goal.valueAtTime)}
                      </span>
                      {goal.isRecurring && (
                        <span className="ml-1 text-xs text-blue-600">
                          (every {goal.recurringInterval || 1}y)
                        </span>
                      )}
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
