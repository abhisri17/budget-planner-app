import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Budget Planner Pro
        </h1>
        <p className="text-xl text-gray-600">
          Take control of your finances with smart budgeting and financial calculators
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Link to="/budget-planner" className="block h-full">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition h-full">
            <div className="text-4xl mb-4">📊</div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Budget Planner</h2>
            <p className="text-gray-600">
              Create and manage monthly, quarterly, and yearly budgets. Track expenses and stay on top of your financial goals.
            </p>
          </div>
        </Link>

        <Link to="/calculators" className="block h-full">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition h-full">
            <div className="text-4xl mb-4">🧮</div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Financial Calculators</h2>
            <p className="text-gray-600">
              Access powerful calculators for SIP planning, EMI calculations, and more to make informed financial decisions.
            </p>
          </div>
        </Link>

        <Link to="/investment" className="block h-full">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition h-full">
            <div className="text-4xl mb-4">💰</div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Investment Planner</h2>
            <p className="text-gray-600">
              Plan and track your investments with Excel integration. Monitor portfolio performance and achieve your wealth goals.
            </p>
          </div>
        </Link>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-bold text-lg mb-2 text-gray-800">Smart Categorization</h3>
          <p className="text-gray-600">Organize expenses into custom categories for better tracking</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="font-bold text-lg mb-2 text-gray-800">Visual Reports</h3>
          <p className="text-gray-600">View your spending patterns with interactive charts</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="font-bold text-lg mb-2 text-gray-800">Goal Setting</h3>
          <p className="text-gray-600">Set and track financial goals with precision</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
