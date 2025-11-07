import { useState } from 'react';
import { calculateEMI } from '../../utils/calculations';

const EMICalculator = () => {
  const [inputs, setInputs] = useState({
    principal: 1000000,
    interestRate: 8.5,
    tenure: 20,
  });

  const [result, setResult] = useState<{
    emi: number;
    totalAmount: number;
    totalInterest: number;
  } | null>(null);

  const handleCalculate = () => {
    const emi = calculateEMI(inputs.principal, inputs.interestRate, inputs.tenure);
    const totalAmount = emi * inputs.tenure * 12;
    const totalInterest = totalAmount - inputs.principal;
    
    setResult({ emi, totalAmount, totalInterest });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">EMI Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Amount (₹)
          </label>
          <input
            type="number"
            value={inputs.principal}
            onChange={(e) => setInputs({ ...inputs, principal: Number(e.target.value) })}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interest Rate (% per annum)
          </label>
          <input
            type="number"
            step="0.1"
            value={inputs.interestRate}
            onChange={(e) => setInputs({ ...inputs, interestRate: Number(e.target.value) })}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Tenure (years)
          </label>
          <input
            type="number"
            value={inputs.tenure}
            onChange={(e) => setInputs({ ...inputs, tenure: Number(e.target.value) })}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-600 transition font-semibold"
        >
          Calculate EMI
        </button>

        {result && (
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Monthly EMI:</p>
              <p className="text-2xl font-bold text-primary">₹{result.emi.toLocaleString()}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Total Amount:</p>
                <p className="text-lg font-semibold">₹{result.totalAmount.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Total Interest:</p>
                <p className="text-lg font-semibold">₹{result.totalInterest.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EMICalculator;
