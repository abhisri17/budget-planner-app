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
   * Calculate future value with inflation for a specific year
   */
  public calculateGoalValue(amount: number, years: number): number {
    if (!amount || years <= 0) return 0;
    return amount * Math.pow(1 + this.assumptions.inflation, years);
  }

  /**
   * Get all occurrences of a goal (including recurring instances)
   */
  private getGoalOccurrences(goal: Goal): Array<{ year: number; amount: number }> {
    const occurrences: Array<{ year: number; amount: number }> = [];
    
    if (!goal.isRecurring) {
      // One-time goal
      occurrences.push({
        year: goal.years,
        amount: this.calculateGoalValue(goal.amount, goal.years),
      });
    } else {
      // Recurring goal
      const interval = goal.recurringInterval || 1;
      let currentYear = goal.years;
      
      while (currentYear <= this.planningYears) {
        occurrences.push({
          year: currentYear,
          amount: this.calculateGoalValue(goal.amount, currentYear),
        });
        currentYear += interval;
      }
    }
    
    return occurrences;
  }

  /**
   * Get all goals for a specific year (including recurring instances)
   */
  private getGoalsForYear(year: number): Array<{ goal: Goal; amount: number }> {
    const goalsForYear: Array<{ goal: Goal; amount: number }> = [];
    
    this.goals.forEach(goal => {
      const occurrences = this.getGoalOccurrences(goal);
      const occurrence = occurrences.find(occ => occ.year === year);
      
      if (occurrence) {
        goalsForYear.push({
          goal,
          amount: occurrence.amount,
        });
      }
    });
    
    return goalsForYear;
  }

  /**
   * Update all goals with calculated values (for initial year only)
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
   */
  public calculateBudget(): BudgetYear[] {
    const budget: BudgetYear[] = [];
    
    const initialNeeds = 0.5;
    const initialWants = 0.2;
    const initialInvestments = 0.3;

    for (let year = 1; year <= this.planningYears; year++) {
      let startingSalary: number;
      const jobChange = this.isJobChangeYear(year);

      if (year === 1) {
        startingSalary = 0;
      } else {
        startingSalary = budget[year - 2].endingSalary;
      }

      const incrementRate = jobChange 
        ? this.assumptions.jobChangeIncrement 
        : this.assumptions.annualIncrement;
      
      const increment = year === 1 ? 0 : incrementRate * startingSalary;
      const endingSalary = year === 1 ? this.startingSalary : startingSalary + increment;

      let monthlyNeeds: number;
      let monthlyWants: number;
      let monthlyInvestments: number;

      if (year === 1) {
        monthlyNeeds = (this.startingSalary / 12) * initialNeeds;
        monthlyWants = (this.startingSalary / 12) * initialWants;
        monthlyInvestments = (this.startingSalary / 12) * initialInvestments;
      } else {
        const prevYear = budget[year - 2];
        monthlyNeeds = prevYear.monthlyNeeds + (increment * initialNeeds) / 12;
        monthlyWants = prevYear.monthlyWants + (increment * initialWants) / 12;
        monthlyInvestments = prevYear.monthlyInvestments + (increment * initialInvestments) / 12;
      }

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
   * Calculate Cash Flow with PROPER GOAL DEDUCTION and RECURRING GOALS support
   */
  public calculateCashFlow(budgetData: BudgetYear[]): CashFlowYear[] {
    const cashFlow: CashFlowYear[] = [];
    let accumulatedWants = 0;
    let accumulatedInvestments = 0;

    for (let year = 1; year <= this.planningYears; year++) {
      const budgetYear = budgetData[year - 1];

      // Step 1: Add this year's contributions
      const yearlyWantsContribution = budgetYear.monthlyWants * 12;
      const yearlyInvestmentContribution = budgetYear.monthlyInvestments * 12;

      // Step 2: Add contributions and apply investment returns
      if (year === 1) {
        accumulatedWants = yearlyWantsContribution * (1 + this.assumptions.investmentReturns);
        accumulatedInvestments = yearlyInvestmentContribution * (1 + this.assumptions.investmentReturns);
      } else {
        accumulatedWants = (accumulatedWants + yearlyWantsContribution) * (1 + this.assumptions.investmentReturns);
        accumulatedInvestments = (accumulatedInvestments + yearlyInvestmentContribution) * (1 + this.assumptions.investmentReturns);
      }

      // Store values BEFORE goal withdrawal
      const wantsBeforeGoals = accumulatedWants;
      const investmentsBeforeGoals = accumulatedInvestments;

      // Step 3: Get all goals for this year (including recurring instances)
      const goalsForYear = this.getGoalsForYear(year);
      const totalGoalsAmount = goalsForYear.reduce((sum, g) => sum + g.amount, 0);

      // Step 4: Deduct goals from wealth (Wants first, then Investments)
      let remainingGoalAmount = totalGoalsAmount;
      let amountFromWants = 0;
      let amountFromInvestments = 0;

      if (remainingGoalAmount > 0) {
        // First, try to deduct from Wants
        if (accumulatedWants >= remainingGoalAmount) {
          amountFromWants = remainingGoalAmount;
          accumulatedWants -= remainingGoalAmount;
          remainingGoalAmount = 0;
        } else {
          amountFromWants = accumulatedWants;
          remainingGoalAmount -= accumulatedWants;
          accumulatedWants = 0;

          // Now deduct remainder from Investments
          if (accumulatedInvestments >= remainingGoalAmount) {
            amountFromInvestments = remainingGoalAmount;
            accumulatedInvestments -= remainingGoalAmount;
            remainingGoalAmount = 0;
          } else {
            amountFromInvestments = accumulatedInvestments;
            accumulatedInvestments = 0;
          }
        }
      }

      const canMeetGoals = remainingGoalAmount === 0;

      // Step 5: Store the cash flow data
      cashFlow.push({
        year,
        wantsAmount: accumulatedWants,
        investmentAmount: accumulatedInvestments,
        amountNeededFromWant: totalGoalsAmount,
        amountNeededFromInvestment: amountFromInvestments,
        canMeetGoals,
        wantsBeforeGoals,
        investmentsBeforeGoals,
        goalsThisYear: totalGoalsAmount,
        amountFromWants,
        amountFromInvestments,
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
    
    // Calculate total goals value including all recurring instances
    let totalGoalsValue = 0;
    this.goals.forEach(goal => {
      const occurrences = this.getGoalOccurrences(goal);
      totalGoalsValue += occurrences.reduce((sum, occ) => sum + occ.amount, 0);
    });
    
    const goalsAchievable = totalAccumulatedWealth >= totalGoalsValue;

    return {
      budgetData,
      cashFlowData,
      totalAccumulatedWealth,
      goalsAchievable,
    };
  }

  /**
   * Get goal occurrences for display (public method)
   */
  public getGoalOccurrencesForYear(year: number): Array<{ goal: Goal; amount: number }> {
    return this.getGoalsForYear(year);
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
