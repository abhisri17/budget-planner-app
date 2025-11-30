// src/utils/financialGoalCalculations.ts

import type {
  AssumptionInputs,
  Goal,
  BudgetYear,
  CashFlowYear,
  FinancialPlanResults,
} from '../types/financialGoal.types';

export class FinancialGoalCalculator {
  private assumptions: AssumptionInputs;
  private startingSalary: number;
  private goals: Goal[];
  private planningYears: number;

  constructor(
    assumptions: AssumptionInputs,
    startingSalary: number,
    goals: Goal[],
    planningYears: number = 30
  ) {
    this.assumptions = assumptions;
    this.startingSalary = startingSalary;
    this.goals = goals;
    this.planningYears = planningYears;
  }

  /**
   * Calculate future value with inflation
   * Formula: Amount × (1 + Inflation)^Years
   */
  public calculateGoalValue(amount: number, years: number): number {
    if (!amount || years <= 0) return 0;
    return amount * Math.pow(1 + this.assumptions.inflation, years);
  }

  /**
   * Update all goals with calculated values
   */
  public calculateGoalValues(goals: Goal[]): Goal[] {
    return goals.map(goal => ({
      ...goal,
      valueAtTime: this.calculateGoalValue(goal.amount, goal.years),
    }));
  }

  /**
   * Check if a year has a job change
   */
  private isJobChangeYear(year: number): boolean {
    return this.assumptions.jobChangeYears.includes(year);
  }

  /**
   * Calculate Budget sheet data (30 years projection)
   * NEW ALLOCATION: 50% Needs, 20% Wants, 30% Investments
   */
  public calculateBudget(): BudgetYear[] {
    const budget: BudgetYear[] = [];
    
    // Updated allocation percentages
    const initialNeeds = 0.5;        // Changed from 0.6 to 0.5
    const initialWants = 0.2;        // Same
    const initialInvestments = 0.3;  // Changed from 0.2 to 0.3

    for (let year = 1; year <= this.planningYears; year++) {
      let startingSalary: number;
      const jobChange = this.isJobChangeYear(year);

      if (year === 1) {
        // Year 1: Starting salary is 0, ending salary is input
        startingSalary = 0;
      } else {
        startingSalary = budget[year - 2].endingSalary;
      }

      // Calculate increment based on job change
      const incrementRate = jobChange 
        ? this.assumptions.jobChangeIncrement 
        : this.assumptions.annualIncrement;
      
      const increment = year === 1 ? 0 : incrementRate * startingSalary;
      
      // Calculate ending salary
      const endingSalary = year === 1 
        ? this.startingSalary 
        : startingSalary + increment;

      // Calculate monthly allocations
      let monthlyNeeds: number;
      let monthlyWants: number;
      let monthlyInvestments: number;

      if (year === 1) {
        // Year 1 uses initial percentages
        monthlyNeeds = (this.startingSalary / 12) * initialNeeds;
        monthlyWants = (this.startingSalary / 12) * initialWants;
        monthlyInvestments = (this.startingSalary / 12) * initialInvestments;
      } else {
        // Subsequent years: add increment portion to each category
        const prevYear = budget[year - 2];
        monthlyNeeds = prevYear.monthlyNeeds + (increment * initialNeeds) / 12;
        monthlyWants = prevYear.monthlyWants + (increment * initialWants) / 12;
        monthlyInvestments = prevYear.monthlyInvestments + (increment * initialInvestments) / 12;
      }

      // Calculate percentages
      const monthlySalary = endingSalary / 12;
      const needsPercentage = monthlySalary > 0 ? monthlyNeeds / monthlySalary : 0;
      const wantsPercentage = monthlySalary > 0 ? monthlyWants / monthlySalary : 0;
      const investmentsPercentage = monthlySalary > 0 ? monthlyInvestments / monthlySalary : 0;

      budget.push({
        year,
        startingSalary,
        jobChange,
        increment,
        endingSalary,
        monthlyNeeds,
        monthlyWants,
        monthlyInvestments,
        needsPercentage,
        wantsPercentage,
        investmentsPercentage,
      });
    }

    return budget;
  }

  /**
   * Calculate Cash Flow sheet data
   * SIMPLIFIED: All wants amount is invested (no separate percentage)
   */
  public calculateCashFlow(budgetData: BudgetYear[]): CashFlowYear[] {
    const cashFlow: CashFlowYear[] = [];
    let accumulatedWants = 0;
    let accumulatedInvestments = 0;

    for (let year = 1; year <= this.planningYears; year++) {
      const budgetYear = budgetData[year - 1];

      // Calculate wants amount with investment returns
      // All wants are invested (100% of wants amount)
      if (year === 1) {
        accumulatedWants = 
          budgetYear.monthlyWants * 12 * 
          (1 + this.assumptions.investmentReturns);
      } else {
        accumulatedWants = 
          (accumulatedWants + budgetYear.monthlyWants * 12) * 
          (1 + this.assumptions.investmentReturns);
      }

      // Calculate investment amount with returns
      if (year === 1) {
        accumulatedInvestments = 
          budgetYear.monthlyInvestments * 12 * 
          (1 + this.assumptions.investmentReturns);
      } else {
        accumulatedInvestments = 
          (accumulatedInvestments + budgetYear.monthlyInvestments * 12) * 
          (1 + this.assumptions.investmentReturns);
      }

      // Calculate amount needed from wants for this year's goals
      const goalsThisYear = this.goals.filter(g => g.years === year);
      const amountNeededFromWant = goalsThisYear.reduce((sum, goal) => sum + goal.valueAtTime, 0);

      // Check if wealth can meet the goals
      const amountNeededFromInvestment = Math.max(0, amountNeededFromWant - accumulatedWants);
      const canMeetGoals = (accumulatedWants + accumulatedInvestments) >= amountNeededFromWant;

      cashFlow.push({
        year,
        wantsAmount: accumulatedWants,
        investmentAmount: accumulatedInvestments,
        amountNeededFromWant,
        amountNeededFromInvestment,
        canMeetGoals,
      });
    }

    return cashFlow;
  }

  /**
   * Calculate complete financial plan
   */
  public calculateFinancialPlan(): FinancialPlanResults {
    const budgetData = this.calculateBudget();
    const cashFlowData = this.calculateCashFlow(budgetData);
    
    const lastYear = cashFlowData[cashFlowData.length - 1];
    const totalAccumulatedWealth = lastYear.wantsAmount + lastYear.investmentAmount;
    
    const totalGoalsValue = this.goals.reduce((sum, goal) => sum + goal.valueAtTime, 0);
    const goalsAchievable = totalAccumulatedWealth >= totalGoalsValue;

    return {
      budgetData,
      cashFlowData,
      totalAccumulatedWealth,
      goalsAchievable,
    };
  }
}

// Helper functions remain the same
export const formatCurrency = (amount: number): string => {
  if (!isFinite(amount) || isNaN(amount)) return '₹0';
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  if (!isFinite(value) || isNaN(value)) return '0%';
  return `${(value * 100).toFixed(1)}%`;
};

export const formatLakhs = (amount: number): string => {
  if (!isFinite(amount) || isNaN(amount)) return '₹0 L';
  return `₹${(amount / 100000).toFixed(2)} L`;
};

export const formatCrores = (amount: number): string => {
  if (!isFinite(amount) || isNaN(amount)) return '₹0 Cr';
  return `₹${(amount / 10000000).toFixed(2)} Cr`;
};
