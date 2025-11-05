export const calculateSIP = (
  targetCorpus: number,
  rateOfReturn: number,
  timePeriod: number,
  inflationRate: number = 0
): number => {
  // Adjust for inflation
  const realReturn = inflationRate > 0 
    ? ((1 + rateOfReturn / 100) / (1 + inflationRate / 100) - 1) * 100
    : rateOfReturn;
  
  const monthlyRate = realReturn / 12 / 100;
  const months = timePeriod * 12;
  
  // FV of SIP formula: FV = P × [(1 + r)^n - 1] / r × (1 + r)
  // Rearranging: P = FV × r / [(1 + r)^n - 1] / (1 + r)
  const monthlyInvestment = 
    (targetCorpus * monthlyRate) / 
    ((Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate));
  
  return Math.round(monthlyInvestment);
};

export const calculateEMI = (
  principal: number,
  annualRate: number,
  tenureYears: number
): number => {
  const monthlyRate = annualRate / 12 / 100;
  const months = tenureYears * 12;
  
  // EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]
  const emi = 
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  
  return Math.round(emi);
};

export const calculateCompoundInterest = (
  principal: number,
  rate: number,
  time: number,
  frequency: number = 12
): number => {
  return principal * Math.pow(1 + rate / (frequency * 100), frequency * time);
};
