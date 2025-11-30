import { useState } from "react";
import { Info, X } from "lucide-react";

interface InvestmentInfoModalProps {
  amount: number;
}

interface AllocationRow {
  timeHorizon: string;
  allocationPercent: number;
  amount: number;
  instruments: string;
  expectedReturn: string;
}

const InvestmentInfoModal = ({ amount }: InvestmentInfoModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const allocations: AllocationRow[] = [
    {
      timeHorizon: "0–3 years",
      allocationPercent: 25,
      amount: amount * 0.25,
      instruments: "FD/RD, Liquid Funds, Ultra-Short Debt",
      expectedReturn: "6–7%",
    },
    {
      timeHorizon: "3–5 years",
      allocationPercent: 25,
      amount: amount * 0.25,
      instruments: "Short/Medium Debt Funds, Hybrid Conservative, Gold ETF/SGB",
      expectedReturn: "~10%",
    },
    {
      timeHorizon: "5–8 years",
      allocationPercent: 25,
      amount: amount * 0.25,
      instruments:
        "Balanced Advantage Funds, Equity MF (Large/Multi-cap), Gold",
      expectedReturn: "10–12%",
    },
    {
      timeHorizon: "8–15 years",
      allocationPercent: 25,
      amount: amount * 0.25,
      instruments: "Equity MF (Large/Mid/Index), Direct Equity, Real Estate",
      expectedReturn: "12–15%",
    },
  ];

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Info Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
        aria-label="Investment allocation info"
      >
        <Info size={14} className="text-blue-600" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Investment Allocation Strategy
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Based on your remaining budget of{" "}
                <strong>₹{amount.toLocaleString()}</strong>, here's a
                recommended allocation across different time horizons:
              </p>

              {/* Investment Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                        Time Horizon
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                        Allocation %
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                        Amount (INR)
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                        Suitable Financial Components
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                        Expected Return Range
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allocations.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                          {row.timeHorizon}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">
                          {row.allocationPercent}%
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-900 font-medium">
                          ₹{row.amount.toLocaleString()}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">
                          {row.instruments}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-green-600 font-medium">
                          {row.expectedReturn}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Disclaimer */}
              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> This is a general allocation strategy
                  based on investment time horizons[web:45][web:48]. Expected
                  returns are indicative and not guaranteed. Please consult with
                  a certified financial advisor before making investment
                  decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InvestmentInfoModal;
