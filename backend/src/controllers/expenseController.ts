import { Request, Response } from 'express';
import { Expense } from '../models/types';

let expenses: Expense[] = [
  {
    id: '1',
    description: 'Grocery Shopping',
    amount: 1500,
    category: 'Food',
    budgetId: '1',
    date: new Date('2025-11-05'),
  },
];

export const getAllExpenses = (req: Request, res: Response) => {
  res.json({ success: true, expenses });
};

export const getExpenseById = (req: Request, res: Response) => {
  const { id } = req.params;
  const expense = expenses.find((e) => e.id === id);

  if (!expense) {
    return res.status(404).json({ success: false, message: 'Expense not found' });
  }

  res.json({ success: true, expense });
};

export const createExpense = (req: Request, res: Response) => {
  const newExpense: Expense = {
    id: Date.now().toString(),
    description: req.body.description,
    amount: req.body.amount,
    category: req.body.category,
    budgetId: req.body.budgetId,
    date: new Date(req.body.date),
  };

  expenses.push(newExpense);
  res.status(201).json({ success: true, expense: newExpense });
};

export const updateExpense = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = expenses.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Expense not found' });
  }

  expenses[index] = {
    ...expenses[index],
    ...req.body,
    date: req.body.date ? new Date(req.body.date) : expenses[index].date,
  };

  res.json({ success: true, expense: expenses[index] });
};

export const deleteExpense = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = expenses.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Expense not found' });
  }

  expenses.splice(index, 1);
  res.json({ success: true, message: 'Expense deleted successfully' });
};
