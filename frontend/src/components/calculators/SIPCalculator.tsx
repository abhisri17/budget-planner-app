import { useState } from 'react';
import { calculateSIP } from '../../utils/calculations';

const SIPCalculator = () => {
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">SIP Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Corpus (₹)
          </label>
          <input
            type="number"
            value={inputs.targetCorpus}
            onChange={(e) => setInputs({ ...inputs, targetCorpus: Number(e.target.value) })}
            className="w-full border rounded-lg px-4 py-2"
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
            className="w-full border rounded-lg px-4 py-2"
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
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={inputs.includeInflation}
            onChange={(e) => setInputs({ ...inputs, includeInflation: e.target.checked })}
            className="w-4 h-4"
          />
          <label className="text-sm font-medium text-gray-700">
            Include Inflation Adjustment
          </label>
        </div>

        {inputs.includeInflation && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Inflation Rate (% per annum)
            </label>
            <input
              type="number"
              value={inputs.inflationRate}
              onChange={(e) => setInputs({ ...inputs, inflationRate: Number(e.target.value) })}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
        )}

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-600 transition font-semibold"
        >
          Calculate
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Monthly SIP Required:</p>
            <p className="text-3xl font-bold text-success">₹{result.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SIPCalculator;
