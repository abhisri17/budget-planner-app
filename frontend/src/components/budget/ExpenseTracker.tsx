import { useState } from 'react';
import type { Budget, Expense } from '../../types';

interface ExpenseTrackerProps {
  budgets: Budget[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  expenses: Expense[];
}

const ExpenseTracker = ({ budgets, addExpense, expenses }: ExpenseTrackerProps) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    budgetId: '',
    description: '',
    amount: 0,
    category: '',
  });

  const handleSubmit = () => {
    if (formData.budgetId && formData.description && formData.amount > 0) {
      addExpense({
        ...formData,
        date: new Date(),
      });
      setFormData({ budgetId: '', description: '', amount: 0, category: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Expense Tracker</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          + Add Expense
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={formData.budgetId}
              onChange={(e) => {
                const budget = budgets.find(b => b.id === e.target.value);
                setFormData({ 
                  ...formData, 
                  budgetId: e.target.value,
                  category: budget?.category || ''
                });
              }}
              className="border rounded-lg px-4 py-2"
            >
              <option value="">Select Budget</option>
              {budgets.map(budget => (
                <option key={budget.id} value={budget.id}>
                  {budget.name} - {budget.category}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border rounded-lg px-4 py-2"
            />
            <input
              type="number"
              placeholder="Amount"
              value={formData.amount || ''}
              onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
              className="border rounded-lg px-4 py-2"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-success text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Save
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Description</th>
              <th className="text-left py-3 px-4">Category</th>
              <th className="text-right py-3 px-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{new Date(expense.date).toLocaleDateString()}</td>
                <td className="py-3 px-4">{expense.description}</td>
                <td className="py-3 px-4">{expense.category}</td>
                <td className="py-3 px-4 text-right">₹{expense.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTracker;
