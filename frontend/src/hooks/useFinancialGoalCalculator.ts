// src/hooks/useFinancialGoalCalculator.ts

import { useState, useMemo } from 'react';
import type { AssumptionInputs, Goal, FinancialPlanResults } from '../types/financialGoal.types';
import { FinancialGoalCalculator } from '../utils/financialGoalCalculations';

const defaultGoals: Goal[] = [
  { id: '1', name: 'Emergency Fund', amount: 300000, years: 1, valueAtTime: 0, category: 'short', isRecurring: false },
  { id: '2', name: 'Vacation every year', amount: 50000, years: 1, valueAtTime: 0, category: 'short', isRecurring: true, recurringInterval: 1 },
  { id: '3', name: 'Mobile Phone', amount: 50000, years: 3, valueAtTime: 0, category: 'short', isRecurring: true, recurringInterval: 3 },
  { id: '4', name: 'International Vacation', amount: 250000, years: 3, valueAtTime: 0, category: 'medium', isRecurring: false },
  { id: '5', name: 'Education', amount: 3000000, years: 6, valueAtTime: 0, category: 'medium', isRecurring: false },
  { id: '6', name: 'Marriage', amount: 1000000, years: 4, valueAtTime: 0, category: 'medium', isRecurring: false },
  { id: '7', name: 'Car', amount: 500000, years: 3, valueAtTime: 0, category: 'medium', isRecurring: false },
  { id: '8', name: 'Home downpayment', amount: 3000000, years: 10, valueAtTime: 0, category: 'long', isRecurring: false },
  { id: '9', name: 'Kids education', amount: 2500000, years: 25, valueAtTime: 0, category: 'long', isRecurring: false },
  { id: '10', name: 'Retirement', amount: 10000000, years: 30, valueAtTime: 0, category: 'long', isRecurring: false },
];

export const useFinancialGoalCalculator = () => {
  const [assumptions, setAssumptions] = useState<AssumptionInputs>({
    annualIncrement: 0.07,        // CHANGED: 5% → 7%
    jobChangeIncrement: 0.3,      // UNCHANGED: 30%
    inflation: 0.06,              // UNCHANGED: 6%
    investmentReturns: 0.10,      // CHANGED: 12% → 10%
    jobChangeYears: [9, 14, 21, 27],
  });

  const [startingSalary, setStartingSalary] = useState<number>(1800000); // CHANGED: 600,000 → 1,800,000

  const [goals, setGoals] = useState<Goal[]>(defaultGoals);

  const results = useMemo<FinancialPlanResults>(() => {
    const calculator = new FinancialGoalCalculator(
      assumptions,
      startingSalary,
      goals
    );

    const updatedGoals = calculator.calculateGoalValues(goals);
    if (JSON.stringify(updatedGoals) !== JSON.stringify(goals)) {
      setGoals(updatedGoals);
    }

    return calculator.calculateFinancialPlan();
  }, [assumptions, startingSalary, goals]);

  const updateAssumption = (field: keyof AssumptionInputs, value: number | number[]) => {
    setAssumptions(prev => ({ ...prev, [field]: value }));
  };

  const addGoal = (goal: Omit<Goal, 'id' | 'valueAtTime'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
      valueAtTime: 0,
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, ...updates } : goal
    ));
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  return {
    assumptions,
    startingSalary,
    goals,
    results,
    updateAssumption,
    setStartingSalary,
    addGoal,
    updateGoal,
    deleteGoal,
  };
};
