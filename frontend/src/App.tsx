import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import BudgetPlanner from './pages/BudgetPlanner';
import Calculators from './pages/Calculators';
import Investment from './pages/Investment';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/budget-planner" element={<BudgetPlanner />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/investment" element={<Investment />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
