// src/types/financialGoal.types.ts

export interface AssumptionInputs {
  annualIncrement: number;
  jobChangeIncrement: number;
  inflation: number;
  investmentReturns: number;
  jobChangeYears: number[];
}

export interface Goal {
  id: string;
  name: string;
  amount: number;
  years: number;
  valueAtTime: number;
  category: 'short' | 'medium' | 'long';
  isRecurring: boolean;          // NEW: Is this a recurring goal?
  recurringInterval?: number;     // NEW: Repeat every X years (e.g., 1 = annual, 3 = every 3 years)
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
  wantsBeforeGoals?: number;
  investmentsBeforeGoals?: number;
  goalsThisYear?: number;
  amountFromWants?: number;
  amountFromInvestments?: number;
}

export interface FinancialPlanResults {
  budgetData: BudgetYear[];
  cashFlowData: CashFlowYear[];
  totalAccumulatedWealth: number;
  goalsAchievable: boolean;
}
