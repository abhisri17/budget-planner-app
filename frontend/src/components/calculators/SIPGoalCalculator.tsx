import { useState } from 'react';
import { calculateSIP } from '../../utils/calculations';

const SIPGoalCalculator = () => {
  const [inputs, setInputs] = useState({
    targetCorpus: 1000000,
    rateOfReturn: 12,
    timePeriod: 10,
    includeInflation: false,
    inflationRate: 6,
  });

  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const monthlyInvestment = calculateSIP(
      inputs.targetCorpus,
      inputs.rateOfReturn,
      inputs.timePeriod,
      inputs.includeInflation ? inputs.inflationRate : 0
    );
    setResult(monthlyInvestment);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">SIP Goal Calculator</h2>
      <p className="text-gray-600 text-sm mb-6">
        Calculate the monthly SIP required to reach your target corpus
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Corpus (₹)
          </label>
          <input
            type="number"
            value={inputs.targetCorpus}
            onChange={(e) => setInputs({ ...inputs, targetCorpus: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="10,00,000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected Rate of Return (% per annum)
          </label>
          <input
            type="number"
            value={inputs.rateOfReturn}
            onChange={(e) => setInputs({ ...inputs, rateOfReturn: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="12"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Period (years)
          </label>
          <input
            type="number"
            value={inputs.timePeriod}
            onChange={(e) => setInputs({ ...inputs, timePeriod: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="10"
          />
        </div>

        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            checked={inputs.includeInflation}
            onChange={(e) => setInputs({ ...inputs, includeInflation: e.target.checked })}
            className="w-4 h-4 text-blue-600 rounded"
            id="inflation-check"
          />
          <label htmlFor="inflation-check" className="text-sm font-medium text-gray-700 cursor-pointer">
            Include Inflation Adjustment
          </label>
        </div>

        {inputs.includeInflation && (
          <div className="animate-fade-in">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Inflation Rate (% per annum)
            </label>
            <input
              type="number"
              value={inputs.inflationRate}
              onChange={(e) => setInputs({ ...inputs, inflationRate: Number(e.target.value) })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="6"
            />
          </div>
        )}

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold mt-6"
        >
          Calculate Monthly SIP
        </button>

        {result !== null && (
          <div className="mt-6 p-6 bg-green-50 border-l-4 border-green-500 rounded-lg animate-fade-in">
            <p className="text-sm text-gray-600 mb-2">Monthly SIP Required:</p>
            <p className="text-4xl font-bold text-green-700">₹{result.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-2">
              Invest this amount every month for {inputs.timePeriod} years to reach your goal of ₹{inputs.targetCorpus.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SIPGoalCalculator;
