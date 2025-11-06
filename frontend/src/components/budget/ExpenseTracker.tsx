import { useState } from 'react';
import type { Budget, Expense } from '../../types';

interface ExpenseTrackerProps {
  expenses: Expense[];
  budgets: Budget[];
  onAddExpense: (expense: Expense) => void;
  onUpdateExpense: (id: string, expense: Expense) => void;
  onDeleteExpense: (id: string) => void;
}

const ExpenseTracker = ({ expenses, budgets, onAddExpense, onUpdateExpense, onDeleteExpense }: ExpenseTrackerProps) => {
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedExpense, setEditedExpense] = useState<Expense | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newExpense.description && newExpense.amount && newExpense.category) {
      const expense: Expense = {
        id: Date.now().toString(),
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        date: newExpense.date,
      };
      
      onAddExpense(expense);
      setNewExpense({
        description: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
      });
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingId(expense.id);
    setEditedExpense({ ...expense });
  };

  const handleSaveEdit = () => {
    if (editedExpense && editingId) {
      onUpdateExpense(editingId, editedExpense);
      setEditingId(null);
      setEditedExpense(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedExpense(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Expense Tracker</h2>

      {/* Add Expense Form */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Expense</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Description"
            value={newExpense.description}
            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            {budgets.map((budget) => (
              <option key={budget.id} value={budget.category}>
                {budget.category}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={newExpense.date}
            onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Add Expense
        </button>
      </form>

      {/* Expenses List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Expenses</h3>
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No expenses yet. Add your first expense above!</p>
        ) : (
          <div className="space-y-3">
            {expenses.map((expense) => (
              <div key={expense.id}>
                {editingId === expense.id && editedExpense ? (
                  // Edit Mode
                  <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-500">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                      <input
                        type="text"
                        value={editedExpense.description}
                        onChange={(e) => setEditedExpense({ ...editedExpense, description: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        value={editedExpense.amount}
                        onChange={(e) => setEditedExpense({ ...editedExpense, amount: parseFloat(e.target.value) })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        value={editedExpense.category}
                        onChange={(e) => setEditedExpense({ ...editedExpense, category: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {budgets.map((budget) => (
                          <option key={budget.id} value={budget.category}>
                            {budget.category}
                          </option>
                        ))}
                      </select>
                      <input
                        type="date"
                        value={editedExpense.date}
                        onChange={(e) => setEditedExpense({ ...editedExpense, date: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{expense.description}</h4>
                      <div className="flex gap-4 mt-1 text-sm text-gray-600">
                        <span className="font-medium text-blue-600">{expense.category}</span>
                        <span>{new Date(expense.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-gray-900">₹{expense.amount.toLocaleString()}</span>
                      <button
                        onClick={() => handleEdit(expense)}
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="Edit expense"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDeleteExpense(expense.id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Delete expense"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;
