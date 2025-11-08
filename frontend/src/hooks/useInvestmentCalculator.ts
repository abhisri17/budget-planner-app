// src/hooks/useInvestmentCalculator.ts

import { useState, useMemo } from 'react';
import type { InvestmentInputs, InvestmentResults } from '../types/investment.types';
import { InvestmentCalculator } from '../utils/investmentCalculations';

export const useInvestmentCalculator = () => {
  const [inputs, setInputs] = useState<InvestmentInputs>({
    currentAge: 26,
    retirementAge: 55,
    monthlyContribution: 10000,
    yearlyIncrease: 0.05,
    inflation: 0.06,
  });

  const results = useMemo<InvestmentResults>(() => {
    const calculator = new InvestmentCalculator(inputs);
    return calculator.calculateAllScenarios();
  }, [inputs]);

  const updateInput = (field: keyof InvestmentInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return {
    inputs,
    results,
    updateInput,
    setInputs,
  };
};
