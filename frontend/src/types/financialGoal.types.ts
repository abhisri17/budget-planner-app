// src/types/financialGoal.types.ts

export interface AssumptionInputs {
  annualIncrement: number;      // 0.05 = 5%
  jobChangeIncrement: number;   // 0.3 = 30%
  inflation: number;            // 0.06 = 6%
  investmentReturns: number;    // 0.12 = 12%
}

export interface Goal {
  id: string;
  name: string;
  amount: number;
  years: number;
  valueAtTime: number;
  category: 'short' | 'medium' | 'long';
}

export interface BudgetYear {
  year: number;
  startingSalary: number;
  jobChange: boolean;
  increment: number;
  endingSalary: number;
  monthlyNeeds: number;
  monthlyWants: number;
  monthlyInvestments: number;
  needsPercentage: number;
  wantsPercentage: number;
  investmentsPercentage: number;
}

export interface CashFlowYear {
  year: number;
  wantsAmount: number;
  investmentAmount: number;
  amountNeededFromWant: number;
  amountNeededFromInvestment: number;
  canMeetGoals: boolean;
}

export interface FinancialPlanResults {
  budgetData: BudgetYear[];
  cashFlowData: CashFlowYear[];
  totalAccumulatedWealth: number;
  goalsAchievable: boolean;
}

export interface AssumptionInputs {
  annualIncrement: number;
  jobChangeIncrement: number;
  inflation: number;
  investmentReturns: number;
  jobChangeYears: number[];  // NEW: Array of years when job changes occur
}

export interface BudgetYear {
  year: number;
  startingSalary: number;
  jobChange: boolean;
  increment: number;
  endingSalary: number;
  monthlyNeeds: number;
  monthlyWants: number;
  monthlyInvestments: number;
  needsPercentage: number;
  wantsPercentage: number;
  investmentsPercentage: number;
}