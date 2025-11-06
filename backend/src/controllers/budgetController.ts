import { Request, Response } from 'express';
import { Budget } from '../models/types';

let budgets: Budget[] = [
  {
    id: '1',
    name: 'Food Budget',
    category: 'Food',
    amount: 5000,
    spent: 3200,
    period: 'monthly',
    startDate: new Date('2025-11-01'),
    endDate: new Date('2025-11-30'),
  },
  {
    id: '2',
    name: 'Transportation Budget',
    category: 'Transportation',
    amount: 3000,
    spent: 1800,
    period: 'monthly',
    startDate: new Date('2025-11-01'),
    endDate: new Date('2025-11-30'),
  },
];

export const getAllBudgets = (req: Request, res: Response) => {
  res.json({ success: true, budgets });
};

export const getBudgetById = (req: Request, res: Response) => {
  const { id } = req.params;
  const budget = budgets.find((b) => b.id === id);

  if (!budget) {
    return res.status(404).json({ success: false, message: 'Budget not found' });
  }

  res.json({ success: true, budget });
};

export const createBudget = (req: Request, res: Response) => {
  const newBudget: Budget = {
    id: Date.now().toString(),
    name: req.body.name,
    category: req.body.category,
    amount: req.body.amount,
    spent: 0,
    period: req.body.period || 'monthly',
    startDate: new Date(req.body.startDate),
    endDate: new Date(req.body.endDate),
  };

  budgets.push(newBudget);
  res.status(201).json({ success: true, budget: newBudget });
};

export const updateBudget = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = budgets.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Budget not found' });
  }

  budgets[index] = {
    ...budgets[index],
    ...req.body,
    startDate: req.body.startDate ? new Date(req.body.startDate) : budgets[index].startDate,
    endDate: req.body.endDate ? new Date(req.body.endDate) : budgets[index].endDate,
  };

  res.json({ success: true, budget: budgets[index] });
};

export const deleteBudget = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = budgets.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Budget not found' });
  }

  budgets.splice(index, 1);
  res.json({ success: true, message: 'Budget deleted successfully' });
};
