export interface Budget {
  id: string;
  name: string;
  category: string;
  amount: number;
  spent: number;
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
