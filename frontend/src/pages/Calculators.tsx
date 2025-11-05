import SIPCalculator from '../components/calculators/SIPCalculator';
import EMICalculator from '../components/calculators/EMICalculator';

const Calculators = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Financial Calculators</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <SIPCalculator />
        <EMICalculator />
      </div>
    </div>
  );
};

export default Calculators;
