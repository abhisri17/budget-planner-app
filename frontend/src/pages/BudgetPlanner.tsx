import { useState } from 'react';
import type { Budget, Expense } from '../types';
import BudgetCard from '../components/budget/BudgetCard';
import ExpenseTracker from '../components/budget/ExpenseTracker';

const BudgetPlanner = () => {
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: '1', category: 'Food', amount: 5000, spent: 3200 },
    { id: '2', category: 'Transportation', amount: 3000, spent: 1800 },
    { id: '3', category: 'Entertainment', amount: 2000, spent: 1500 },
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', description: 'Grocery Shopping', amount: 1500, category: 'Food', date: '2025-11-05' },
    { id: '2', description: 'Movie Tickets', amount: 800, category: 'Entertainment', date: '2025-11-04' },
  ]);

  const [newBudget, setNewBudget] = useState({ category: '', amount: '' });
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [manualTotalBudget, setManualTotalBudget] = useState<number | null>(null);

  // Calculate totals
  const calculatedTotalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
  const totalBudget = manualTotalBudget ?? calculatedTotalBudget;
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const remainingBudget = totalBudget - totalSpent;

  const handleAddBudget = () => {
    if (newBudget.category && newBudget.amount) {
      const budget: Budget = {
        id: Date.now().toString(),
        category: newBudget.category,
        amount: parseFloat(newBudget.amount),
        spent: 0,
      };
      setBudgets([...budgets, budget]);
      setNewBudget({ category: '', amount: '' });
    }
  };

  const handleUpdateBudget = (id: string, category: string, amount: number) => {
    setBudgets(budgets.map(b => 
      b.id === id ? { ...b, category, amount } : b
    ));
  };

  const handleDeleteBudget = (id: string) => {
    setBudgets(budgets.filter((b) => b.id !== id));
  };

  const handleAddExpense = (expense: Expense) => {
    setExpenses([expense, ...expenses]);
    
    // Update budget spent amount
    setBudgets(budgets.map(b => 
      b.category === expense.category 
        ? { ...b, spent: b.spent + expense.amount }
        : b
    ));
  };

  const handleUpdateExpense = (id: string, updatedExpense: Expense) => {
    const oldExpense = expenses.find(e => e.id === id);
    
    if (oldExpense) {
      // Update expense
      setExpenses(expenses.map(e => e.id === id ? updatedExpense : e));
      
      // Adjust budget spent amounts
      setBudgets(budgets.map(b => {
        if (b.category === oldExpense.category && b.category === updatedExpense.category) {
          // Same category - adjust the difference
          return { ...b, spent: b.spent - oldExpense.amount + updatedExpense.amount };
        } else if (b.category === oldExpense.category) {
          // Old category - subtract old amount
          return { ...b, spent: Math.max(0, b.spent - oldExpense.amount) };
        } else if (b.category === updatedExpense.category) {
          // New category - add new amount
          return { ...b, spent: b.spent + updatedExpense.amount };
        }
        return b;
      }));
    }
  };

  const handleDeleteExpense = (id: string) => {
    const expense = expenses.find(e => e.id === id);
    if (expense) {
      setExpenses(expenses.filter(e => e.id !== id));
      
      // Update budget spent amount
      setBudgets(budgets.map(b =>
        b.category === expense.category
          ? { ...b, spent: Math.max(0, b.spent - expense.amount) }
          : b
      ));
    }
  };

  const handleSaveTotalBudget = (value: string) => {
    const newTotal = parseFloat(value);
    if (!isNaN(newTotal) && newTotal > 0) {
      setManualTotalBudget(newTotal);
      setIsEditingSummary(false);
    }
  };

  const handleResetTotalBudget = () => {
    setManualTotalBudget(null);
    setIsEditingSummary(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Budget Planner</h1>
          <p className="text-gray-600">Track your expenses and manage your budgets effectively</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Budget - Editable */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 relative">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-sm font-medium text-gray-600">Total Budget</h3>
              {!isEditingSummary && (
                <button
                  onClick={() => setIsEditingSummary(true)}
                  className="text-blue-500 hover:text-blue-700 transition"
                  title="Edit total budget"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              )}
            </div>
            
            {isEditingSummary ? (
              <div className="space-y-3">
                <input
                  type="number"
                  defaultValue={totalBudget}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSaveTotalBudget((e.target as HTMLInputElement).value);
                    }
                  }}
                  className="w-full px-3 py-2 text-2xl font-bold border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      const input = e.currentTarget.parentElement?.previousElementSibling as HTMLInputElement;
                      handleSaveTotalBudget(input.value);
                    }}
                    className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleResetTotalBudget}
                    className="flex-1 px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                  >
                    Reset
                  </button>
                </div>
                {manualTotalBudget !== null && (
                  <p className="text-xs text-gray-500">Auto-calculated: ₹{calculatedTotalBudget.toLocaleString()}</p>
                )}
              </div>
            ) : (
              <>
                <p className="text-3xl font-bold text-gray-900">₹{totalBudget.toLocaleString()}</p>
                {manualTotalBudget !== null && (
                  <p className="text-xs text-gray-500 mt-1">(Custom value)</p>
                )}
              </>
            )}
          </div>

          {/* Total Spent */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Spent</h3>
            <p className="text-3xl font-bold text-gray-900">₹{totalSpent.toLocaleString()}</p>
          </div>

          {/* Remaining */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Remaining</h3>
            <p className="text-3xl font-bold text-gray-900">₹{remainingBudget.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">
              {((remainingBudget / totalBudget) * 100).toFixed(1)}% remaining
            </p>
          </div>
        </div>

        {/* Add Budget Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Budget</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Category (e.g., Food, Transport)"
              value={newBudget.category}
              onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newBudget.amount}
              onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddBudget}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Add Budget
            </button>
          </div>
        </div>

        {/* Budget Cards Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Budgets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {budgets.map((budget) => (
              <BudgetCard 
                key={budget.id} 
                budget={budget} 
                onDelete={handleDeleteBudget}
                onUpdate={handleUpdateBudget}
              />
            ))}
          </div>
        </div>

        {/* Expense Tracker */}
        <ExpenseTracker
          expenses={expenses}
          budgets={budgets}
          onAddExpense={handleAddExpense}
          onUpdateExpense={handleUpdateExpense}
          onDeleteExpense={handleDeleteExpense}
        />
      </div>
    </div>
  );
};

export default BudgetPlanner;
