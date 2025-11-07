import { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import type { Budget, Expense } from '../../types';

interface ExpenseTrackerProps {
  expenses: Expense[];
  budgets: Budget[];
  onAddExpense: (expense: Expense) => void;
  onUpdateExpense: (id: string, expense: Expense) => void;
  onDeleteExpense: (id: string) => void;
}

const ExpenseTracker = ({ 
  expenses, 
  budgets, 
  onAddExpense, 
  onUpdateExpense, 
  onDeleteExpense 
}: ExpenseTrackerProps) => {
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

  const categoryColors: Record<string, string> = {
    Food: 'text-orange-500',
    Entertainment: 'text-purple-500',
    Transportation: 'text-blue-500',
    Shopping: 'text-pink-500',
    Utilities: 'text-green-500',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Expense Tracker</h2>

      {/* Add Expense Form */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 md:p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Plus size={20} />
          Add New Expense
        </h3>
        
        {/* Form Inputs - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4">
          <input
            type="text"
            placeholder="Description"
            value={newExpense.description}
            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            required
          />
          <select
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
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
            className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm md:text-base flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Add Expense
        </button>
      </form>

      {/* Expenses List */}
      <div>
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Recent Expenses</h3>
        
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center py-8 text-sm md:text-base">
            No expenses yet. Add your first expense above!
          </p>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {expenses.map((expense) => (
              <div key={expense.id}>
                {editingId === expense.id && editedExpense ? (
                  // Edit Mode - Responsive
                  <div className="p-4 md:p-6 bg-blue-50 rounded-lg border-2 border-blue-500">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                      <input
                        type="text"
                        value={editedExpense.description}
                        onChange={(e) => setEditedExpense({ ...editedExpense, description: e.target.value })}
                        className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                      />
                      <input
                        type="number"
                        value={editedExpense.amount}
                        onChange={(e) => setEditedExpense({ ...editedExpense, amount: parseFloat(e.target.value) })}
                        className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                      />
                      <select
                        value={editedExpense.category}
                        onChange={(e) => setEditedExpense({ ...editedExpense, category: e.target.value })}
                        className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
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
                        className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm md:text-base"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium text-sm md:text-base"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode - Responsive
                  <div className="p-4 md:p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    {/* Desktop Layout */}
                    <div className="hidden md:flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{expense.description}</h4>
                        <div className="flex gap-4 mt-1 text-sm text-gray-600">
                          <span
                            className={`font-medium ${
                              categoryColors[expense.category] || 'text-gray-600'
                            }`}
                          >
                            {expense.category}
                          </span>
                          <span>{new Date(expense.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 ml-4">
                        <span className="text-lg font-bold text-gray-900 whitespace-nowrap">
                          ₹{expense.amount.toLocaleString('en-IN')}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(expense)}
                            className="p-2 text-blue-500 hover:bg-blue-100 rounded-md transition"
                            title="Edit expense"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => onDeleteExpense(expense.id)}
                            className="p-2 text-red-500 hover:bg-red-100 rounded-md transition"
                            title="Delete expense"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm">{expense.description}</h4>
                          <div className="flex gap-3 mt-2 text-xs">
                            <span
                              className={`font-medium ${
                                categoryColors[expense.category] || 'text-gray-600'
                              }`}
                            >
                              {expense.category}
                            </span>
                            <span className="text-gray-600">{new Date(expense.date).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-gray-900 text-sm mb-2">
                            ₹{expense.amount.toLocaleString('en-IN')}
                          </p>
                          <div className="flex gap-1 justify-end">
                            <button
                              onClick={() => handleEdit(expense)}
                              className="p-1.5 text-blue-500 hover:bg-blue-100 rounded transition"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => onDeleteExpense(expense.id)}
                              className="p-1.5 text-red-500 hover:bg-red-100 rounded transition"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
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
