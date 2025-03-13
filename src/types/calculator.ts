export type PaymentFrequency = 'monthly' | 'biweekly' | 'accelerated';

export interface AmortizationSchedule {
  year: number;
  principalYTD: number;
  interestYTD: number;
  totalPayment: number;
  endingBalance: number;
}

export interface ComparisonScenario {
  id: string;
  interestRate: number;
  loanTerm: number;
  loanAmount: number;
}

export interface PayoffStrategy {
  name: string;
  description: string;
  timeSaved: string;
  interestSaved: number;
}
