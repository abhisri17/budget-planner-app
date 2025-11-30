import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Budget Planner', path: '/budget-planner' },
    { label: 'Calculators', path: '/calculators' },
    { label: 'Investment', path: '/investment' },
  ];

  return (
    <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-2xl font-bold">Budget Planner Pro</h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="hover:text-gray-200 transition duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger Menu Button (Mobile) */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-blue-500 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="hover:text-gray-200 transition duration-200 py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
