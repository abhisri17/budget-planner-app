import { useState } from 'react';
import type { Budget } from '../../types';

interface BudgetCardProps {
  budget: Budget;
  onDelete: (id: string) => void;
  onUpdate: (id: string, category: string, amount: number) => void;
}

const BudgetCard = ({ budget, onDelete, onUpdate }: BudgetCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategory, setEditedCategory] = useState(budget.category);
  const [editedAmount, setEditedAmount] = useState(budget.amount.toString());

  const percentage = (budget.spent / budget.amount) * 100;
  const remaining = budget.amount - budget.spent;
  
  const getProgressColor = () => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusColor = () => {
    if (percentage >= 90) return 'text-red-600 bg-red-50';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const handleSave = () => {
    if (editedCategory && editedAmount) {
      onUpdate(budget.id, editedCategory, parseFloat(editedAmount));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedCategory(budget.category);
    setEditedAmount(budget.amount.toString());
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border-2 border-blue-500">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Budget</h3>
        <div className="space-y-3 mb-4">
          <input
            type="text"
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Category"
          />
          <input
            type="number"
            value={editedAmount}
            onChange={(e) => setEditedAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Amount"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{budget.category}</h3>
          <p className="text-sm text-gray-500 mt-1">Budget: ₹{budget.amount.toLocaleString()}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700 transition"
            title="Edit budget"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(budget.id)}
            className="text-red-500 hover:text-red-700 transition"
            title="Delete budget"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Spent: ₹{budget.spent.toLocaleString()}</span>
          <span>{percentage.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full ${getProgressColor()} transition-all duration-300`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Remaining Amount */}
      <div className={`flex justify-between items-center py-2 px-3 rounded-lg ${getStatusColor()}`}>
        <span className="text-sm font-medium">Remaining</span>
        <span className="text-lg font-bold">₹{remaining.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default BudgetCard;
