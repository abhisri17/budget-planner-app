import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Budget Planner Pro</h1>
          <nav className="flex gap-6">
            <Link to="/" className="hover:text-gray-200 transition">
              Home
            </Link>
            <Link to="/budget-planner" className="hover:text-gray-200 transition">
              Budget Planner
            </Link>
            <Link to="/calculators" className="hover:text-gray-200 transition">
              Calculators
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
