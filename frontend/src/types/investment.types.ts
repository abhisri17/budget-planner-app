// src/types/investment.types.ts

export interface InvestmentInputs {
  currentAge: number;
  retirementAge: number;
  monthlyContribution: number;
  yearlyIncrease: number; // as decimal (0.05 = 5%)
  inflation: number; // as decimal (0.06 = 6%)
}

export interface MonthlyCalculation {
  month: number;
  year: number;
  monthlyContribution: number;
  fv: number; // Future Value
  cumulativeFV: number;
  npv: number; // Net Present Value (inflation-adjusted)
  cumulativeNPV: number;
}

export interface ReturnScenario {
  returnRate: number;
  label: string;
  totalFV: number; // Bank balance at retirement
  totalNPV: number; // Inflation-adjusted value
  valueInCrores: number; // NPV in crores
}

export interface InvestmentResults {
  totalMonths: number;
  investmentPeriod: number;
  scenarios: ReturnScenario[];
  monthlyData: Map<number, MonthlyCalculation[]>; // returnRate -> calculations
}
