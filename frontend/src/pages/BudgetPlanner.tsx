import { useState } from 'react';
import type { Budget, Expense, PeriodType } from '../types';
import BudgetCard from '../components/budget/BudgetCard';
import ExpenseTracker from '../components/budget/ExpenseTracker';

const BudgetPlanner = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('monthly');
  const [showAddBudget, setShowAddBudget] = useState(false);

  const [newBudget, setNewBudget] = useState({
    name: '',
    amount: 0,
    category: 'Food',
  });

  const categories = ['Food', 'Transport', 'Entertainment', 'Healthcare', 'Shopping', 'Bills', 'Others'];

  const handleAddBudget = () => {
    const budget: Budget = {
      id: Date.now().toString(),
      name: newBudget.name,
      amount: newBudget.amount,
      spent: 0,
      category: newBudget.category,
      period: selectedPeriod,
      startDate: new Date(),
      endDate: calculateEndDate(selectedPeriod),
    };
    setBudgets([...budgets, budget]);
    setNewBudget({ name: '', amount: 0, category: 'Food' });
    setShowAddBudget(false);
  };

  const calculateEndDate = (period: PeriodType): Date => {
    const date = new Date();
    switch (period) {
      case 'monthly':
        date.setMonth(date.getMonth() + 1);
        break;
      case 'quarterly':
        date.setMonth(date.getMonth() + 3);
        break;
      case 'yearly':
        date.setFullYear(date.getFullYear() + 1);
        break;
    }
    return date;
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses([...expenses, newExpense]);
    
    // Update budget spent amount
    setBudgets(budgets.map(b => 
      b.id === expense.budgetId 
        ? { ...b, spent: b.spent + expense.amount }
        : b
    ));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Budget Planner</h1>
        
        <div className="flex gap-4 items-center mb-6">
          <label className="font-semibold text-gray-700">Period:</label>
          <div className="flex gap-2">
            {(['monthly', 'quarterly', 'yearly'] as PeriodType[]).map(period => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg capitalize transition ${
                  selectedPeriod === period
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowAddBudget(!showAddBudget)}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
        >
          + Add Budget
        </button>
      </div>

      {showAddBudget && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-bold mb-4">Create New Budget</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Budget Name"
              value={newBudget.name}
              onChange={(e) => setNewBudget({ ...newBudget, name: e.target.value })}
              className="border rounded-lg px-4 py-2"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newBudget.amount || ''}
              onChange={(e) => setNewBudget({ ...newBudget, amount: Number(e.target.value) })}
              className="border rounded-lg px-4 py-2"
            />
            <select
              value={newBudget.category}
              onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
              className="border rounded-lg px-4 py-2"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddBudget}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Save Budget
            </button>
            <button
              onClick={() => setShowAddBudget(false)}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {budgets
          .filter(b => b.period === selectedPeriod)
          .map(budget => (
            <BudgetCard key={budget.id} budget={budget} />
          ))}
      </div>

      {budgets.length > 0 && (
        <ExpenseTracker budgets={budgets} addExpense={addExpense} expenses={expenses} />
      )}
    </div>
  );
};

export default BudgetPlanner;
