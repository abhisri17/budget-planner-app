// src/utils/investmentCalculations.ts

import type { 
  InvestmentInputs, 
  MonthlyCalculation, 
  ReturnScenario, 
  InvestmentResults 
} from '../types/investment.types';

export class InvestmentCalculator {
  private inputs: InvestmentInputs;
  private totalMonths: number;

  constructor(inputs: InvestmentInputs) {
    this.inputs = inputs;
    this.totalMonths = (inputs.retirementAge - inputs.currentAge) * 12;
  }

  /**
   * Validate if inputs are sufficient for calculations
   */
  private isValidInput(): boolean {
    const { currentAge, retirementAge, monthlyContribution, yearlyIncrease, inflation } = this.inputs;
    
    return (
      currentAge > 0 &&
      retirementAge > currentAge &&
      monthlyContribution > 0 &&
      yearlyIncrease >= 0 &&
      inflation >= 0 &&
      this.totalMonths > 0
    );
  }

  /**
   * Calculate monthly contribution based on year
   * Contribution increases annually by yearlyIncrease percentage
   */
  private getMonthlyContribution(month: number): number {
    const year = Math.floor((month - 1) / 12) + 1;
    const { monthlyContribution, yearlyIncrease } = this.inputs;
    
    if (year === 1) {
      return monthlyContribution;
    }
    
    return monthlyContribution * Math.pow(1 + yearlyIncrease, year - 1);
  }

  /**
   * Calculate Future Value for a single monthly contribution
   * FV = contribution × (1 + monthlyRate)^remainingMonths
   */
  private calculateFV(
    contribution: number,
    month: number,
    annualReturnRate: number
  ): number {
    const monthlyRate = annualReturnRate / 12;
    const remainingMonths = this.totalMonths - month;
    
    if (remainingMonths < 0) return contribution;
    
    return contribution * Math.pow(1 + monthlyRate, remainingMonths);
  }

  /**
   * Calculate Net Present Value (inflation-adjusted)
   * NPV = FV / (1 + monthlyInflation)^remainingMonths
   */
  private calculateNPV(fv: number, month: number): number {
    const monthlyInflation = this.inputs.inflation / 12;
    const remainingMonths = this.totalMonths - month;
    
    if (remainingMonths < 0) return fv;
    
    return fv / Math.pow(1 + monthlyInflation, remainingMonths);
  }

  /**
   * Calculate investment projection for a specific return rate
   */
  public calculateForReturnRate(annualReturnRate: number): MonthlyCalculation[] {
    // Return empty array if inputs are invalid
    if (!this.isValidInput()) {
      return [];
    }

    const calculations: MonthlyCalculation[] = [];
    let cumulativeFV = 0;
    let cumulativeNPV = 0;

    for (let month = 1; month <= this.totalMonths; month++) {
      const contribution = this.getMonthlyContribution(month);
      const fv = this.calculateFV(contribution, month, annualReturnRate);
      const npv = this.calculateNPV(fv, month);
      
      cumulativeFV += fv;
      cumulativeNPV += npv;

      calculations.push({
        month,
        year: Math.ceil(month / 12),
        monthlyContribution: contribution,
        fv,
        cumulativeFV,
        npv,
        cumulativeNPV,
      });
    }

    return calculations;
  }

  /**
   * Calculate all scenarios (different return rates)
   */
  public calculateAllScenarios(): InvestmentResults {
    // Return default values if inputs are invalid
    if (!this.isValidInput()) {
      return {
        totalMonths: 0,
        investmentPeriod: 0,
        scenarios: [],
        monthlyData: new Map(),
      };
    }

    const returnScenarios = [
      { rate: 0.05, label: '5% - FD returns' },
      { rate: 0.10, label: '10% - Gold returns' },
      { rate: 0.15, label: '15% - Equity returns' },
      { rate: 0.20, label: '20% - High risk equity returns' },
      { rate: 0.25, label: '25% - Very hard to get' },
      { rate: 0.30, label: '30% - Extremely risky' },
      { rate: 0.35, label: '35% - Almost impossible' },
      { rate: 0.40, label: '40% - Forget it :)' },
    ];

    const scenarios: ReturnScenario[] = [];
    const monthlyData = new Map<number, MonthlyCalculation[]>();

    returnScenarios.forEach(({ rate, label }) => {
      const calculations = this.calculateForReturnRate(rate);
      
      // CRITICAL FIX: Check if calculations array has data before accessing lastMonth
      if (calculations.length === 0) {
        // If no calculations, add scenario with zero values
        scenarios.push({
          returnRate: rate,
          label,
          totalFV: 0,
          totalNPV: 0,
          valueInCrores: 0,
        });
        monthlyData.set(rate, []);
        return; // Skip to next iteration
      }

      // Now it's safe to access the last element
      const lastMonth = calculations[calculations.length - 1];

      scenarios.push({
        returnRate: rate,
        label,
        totalFV: lastMonth.cumulativeFV,
        totalNPV: lastMonth.cumulativeNPV,
        valueInCrores: lastMonth.cumulativeNPV / 10000000,
      });

      monthlyData.set(rate, calculations);
    });

    return {
      totalMonths: this.totalMonths,
      investmentPeriod: this.inputs.retirementAge - this.inputs.currentAge,
      scenarios,
      monthlyData,
    };
  }

  /**
   * Get yearly summary (showing contribution for each year)
   */
  public getYearlySummary(): Array<{ year: number; monthlyContribution: number }> {
    if (!this.isValidInput()) {
      return [];
    }

    const years = Math.ceil(this.totalMonths / 12);
    const summary = [];

    for (let year = 1; year <= years; year++) {
      const month = (year - 1) * 12 + 1;
      summary.push({
        year,
        monthlyContribution: this.getMonthlyContribution(month),
      });
    }

    return summary;
  }
}

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  if (!isFinite(amount) || isNaN(amount)) {
    return '₹0';
  }
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper function to format crores
export const formatCrores = (amount: number): string => {
  if (!isFinite(amount) || isNaN(amount)) {
    return '0.00';
  }
  
  return amount.toFixed(2);
};
