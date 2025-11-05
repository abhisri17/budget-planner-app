export interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  category: string;
  period: 'monthly' | 'quarterly' | 'yearly';
  startDate: Date;
  endDate: Date;
}

export interface Expense {
  id: string;
  budgetId: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
}

export interface SIPCalculation {
  monthlyInvestment: number;
  targetCorpus: number;
  rateOfReturn: number;
  timePeriod: number;
  includeInflation: boolean;
  inflationRate?: number;
}

export interface EMICalculation {
  principal: number;
  interestRate: number;
  tenure: number;
  emi: number;
}

export type PeriodType = 'monthly' | 'quarterly' | 'yearly';
