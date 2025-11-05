import type { Budget } from '../../types';

interface BudgetCardProps {
  budget: Budget;
}

const BudgetCard = ({ budget }: BudgetCardProps) => {
  const percentage = (budget.spent / budget.amount) * 100;
  const remaining = budget.amount - budget.spent;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{budget.name}</h3>
          <span className="text-sm text-gray-500 capitalize">{budget.category}</span>
        </div>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm capitalize">
          {budget.period}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Spent: ₹{budget.spent.toLocaleString()}</span>
          <span className="text-gray-600">Budget: ₹{budget.amount.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all ${
              percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>

      <div className={`text-lg font-semibold ${remaining < 0 ? 'text-danger' : 'text-success'}`}>
        Remaining: ₹{remaining.toLocaleString()}
      </div>
    </div>
  );
};

export default BudgetCard;
