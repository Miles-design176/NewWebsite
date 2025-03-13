import { PaymentFrequency, AmortizationSchedule } from "@/types/calculator";

/**
 * Formats a number as currency
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formats a number as a percentage
 */
export function formatPercentage(value: number): string {
  return `${value}%`;
}

/**
 * Calculates the monthly payment for a loan
 */
export function calculateMonthlyPayment(
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number
): number {
  // Convert annual interest rate to monthly rate in decimal
  const monthlyRate = annualInterestRate / 100 / 12;
  
  // Convert term from years to months
  const totalPayments = loanTermYears * 12;
  
  // Handle edge case of 0% interest
  if (monthlyRate === 0) {
    return loanAmount / totalPayments;
  }
  
  // Calculate monthly payment using the formula
  // M = P * [r * (1 + r)^n] / [(1 + r)^n - 1]
  const payment = loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  return payment;
}

/**
 * Calculates PMI (Private Mortgage Insurance)
 */
export function calculatePMI(
  loanAmount: number,
  homeValue: number,
  pmiRate: number
): number {
  const ltv = (loanAmount / homeValue) * 100;
  
  // PMI is typically required when LTV > 80%
  if (ltv <= 80) {
    return 0;
  }
  
  // Annual PMI rate divided by 12 to get monthly
  return (loanAmount * (pmiRate / 100)) / 12;
}

/**
 * Calculates the amortization schedule for a loan
 */
export function calculateAmortizationSchedule(
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number,
  extraPayment: number = 0,
  paymentFrequency: PaymentFrequency = 'monthly'
): AmortizationSchedule[] {
  const schedule: AmortizationSchedule[] = [];
  
  // Convert annual rate to decimal
  const monthlyRate = annualInterestRate / 100 / 12;
  
  // Calculate base monthly payment
  const baseMonthlyPayment = calculateMonthlyPayment(
    loanAmount,
    annualInterestRate,
    loanTermYears
  );
  
  // Adjust for payment frequency
  let paymentsPerYear = 12;
  let paymentAmount = baseMonthlyPayment;
  
  if (paymentFrequency === 'biweekly') {
    paymentsPerYear = 26;
    paymentAmount = baseMonthlyPayment / 2;
  } else if (paymentFrequency === 'accelerated') {
    paymentsPerYear = 26;
    paymentAmount = baseMonthlyPayment / 2;
    // Extra half-payment per month with accelerated bi-weekly
  }
  
  // Add extra payment if specified
  if (extraPayment > 0 && paymentFrequency === 'monthly') {
    paymentAmount += extraPayment;
  } else if (extraPayment > 0) {
    // For bi-weekly payments, divide extra payment
    paymentAmount += extraPayment / 2;
  }
  
  let balance = loanAmount;
  let year = 1;
  let yearlyPrincipal = 0;
  let yearlyInterest = 0;
  let yearlyPayment = 0;
  let monthsInYear = paymentFrequency === 'monthly' ? 12 : 26 / 2;
  
  // Loop until loan is paid off
  while (balance > 0 && year <= loanTermYears + 5) { // Add buffer for extra years
    for (let i = 1; i <= paymentsPerYear && balance > 0; i++) {
      // Calculate interest for this payment
      const interestPayment = balance * monthlyRate;
      
      // Calculate principal for this payment (payment amount minus interest)
      let principalPayment = paymentAmount - interestPayment;
      
      // Adjust if we're in the final payment
      if (principalPayment > balance) {
        principalPayment = balance;
        yearlyPayment += principalPayment + interestPayment;
      } else {
        yearlyPayment += paymentAmount;
      }
      
      // Update running totals
      yearlyPrincipal += principalPayment;
      yearlyInterest += interestPayment;
      
      // Update balance
      balance -= principalPayment;
      
      // If we've reached the end of the year or paid off the loan
      if (i % monthsInYear === 0 || balance <= 0) {
        schedule.push({
          year,
          principalYTD: yearlyPrincipal,
          interestYTD: yearlyInterest,
          totalPayment: yearlyPayment,
          endingBalance: Math.max(0, balance)
        });
        
        // Reset yearly tracking for the next year
        yearlyPrincipal = 0;
        yearlyInterest = 0;
        yearlyPayment = 0;
        year++;
        
        // Break if loan is paid off
        if (balance <= 0) {
          break;
        }
      }
    }
  }
  
  return schedule;
}

/**
 * Calculates loan payoff with various strategies
 */
export function calculateLoanPayoff(options: {
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  extraPayment?: number;
  biWeekly?: boolean;
  oneTimePayment?: number;
}): { monthsReduced: number; interestSaved: number } {
  const {
    loanAmount,
    interestRate,
    loanTermYears,
    extraPayment = 0,
    biWeekly = false,
    oneTimePayment = 0
  } = options;
  
  // Calculate standard monthly payment and total interest
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;
  const standardPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTermYears);
  let standardTotalInterest = standardPayment * totalPayments - loanAmount;
  
  // Now calculate with the strategy
  let modifiedBalance = loanAmount - oneTimePayment;
  let paymentsMade = 0;
  let totalInterestPaid = 0;
  
  // Adjust payment based on strategy
  let payment = standardPayment;
  if (extraPayment > 0) {
    payment += extraPayment;
  }
  
  // For bi-weekly strategy
  if (biWeekly) {
    while (modifiedBalance > 0 && paymentsMade < totalPayments * 1.5) { // Add buffer
      // Bi-weekly payments mean 26 payments per year (equivalent to 13 monthly payments)
      const biWeeklyPayment = standardPayment / 2;
      
      // Make 26 bi-weekly payments per year (equivalent to 13 monthly payments)
      for (let i = 0; i < 26 && modifiedBalance > 0; i++) {
        const interest = modifiedBalance * (monthlyRate / 2); // Half month interest
        const principal = Math.min(biWeeklyPayment - interest, modifiedBalance);
        
        totalInterestPaid += interest;
        modifiedBalance -= principal;
        
        if (modifiedBalance <= 0) {
          break;
        }
      }
      
      paymentsMade += 1; // Count each year as one payment for simplicity
    }
  } else {
    // Standard monthly with potential extra payments
    while (modifiedBalance > 0 && paymentsMade < totalPayments * 1.5) { // Add buffer
      const interest = modifiedBalance * monthlyRate;
      const principal = Math.min(payment - interest, modifiedBalance);
      
      totalInterestPaid += interest;
      modifiedBalance -= principal;
      paymentsMade++;
      
      if (modifiedBalance <= 0) {
        break;
      }
    }
  }
  
  // Calculate months reduced and interest saved
  const monthsReduced = Math.max(0, totalPayments - paymentsMade);
  const interestSaved = Math.max(0, standardTotalInterest - totalInterestPaid);
  
  return { monthsReduced, interestSaved };
}

/**
 * Calculates affordability based on income and expenses
 */
export function calculateAffordability(options: {
  annualIncome: number;
  monthlyDebts: number;
  downPayment: number;
  interestRate: number;
  propertyTaxRate: number;
  homeInsuranceRate: number;
  loanTerm: number;
}): { purchasePrice: number; affordablePayment: number; dtiRatio: number } {
  const {
    annualIncome,
    monthlyDebts,
    downPayment,
    interestRate,
    propertyTaxRate,
    homeInsuranceRate,
    loanTerm
  } = options;
  
  // Monthly income
  const monthlyIncome = annualIncome / 12;
  
  // Maximum front-end ratio (housing costs / income)
  const frontEndRatio = 0.28;
  
  // Maximum back-end ratio (all debt payments / income)
  const backEndRatio = 0.36;
  
  // Calculate maximum monthly payment based on front-end ratio
  const maxFrontEndPayment = monthlyIncome * frontEndRatio;
  
  // Calculate maximum monthly payment based on back-end ratio
  const maxBackEndPayment = (monthlyIncome * backEndRatio) - monthlyDebts;
  
  // Use the lower of the two maximums
  const maxMonthlyPayment = Math.min(maxFrontEndPayment, maxBackEndPayment);
  
  // Calculate monthly property tax and insurance rates
  const monthlyPropertyTaxRate = propertyTaxRate > 0 ? propertyTaxRate / 12 : 0.02 * monthlyIncome;
  const monthlyHomeInsuranceRate = homeInsuranceRate > 0 ? homeInsuranceRate / 12 : 0.005 * monthlyIncome;
  
  // Subtract taxes and insurance to get principal and interest payment
  const maxPIPayment = maxMonthlyPayment - monthlyPropertyTaxRate - monthlyHomeInsuranceRate;
  
  // Calculate affordable loan amount based on max PI payment
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;
  
  // Formula: L = P * ((1 - (1 + r)^-n) / r)
  const affordableLoanAmount = maxPIPayment * ((1 - Math.pow(1 + monthlyRate, -totalPayments)) / monthlyRate);
  
  // Calculate purchase price by adding down payment
  const affordablePurchasePrice = affordableLoanAmount + downPayment;
  
  // Calculate DTI ratio
  const hosingPayment = maxMonthlyPayment;
  const dtiRatio = (hosingPayment + monthlyDebts) / monthlyIncome;
  
  return {
    purchasePrice: Math.round(affordablePurchasePrice),
    affordablePayment: Math.round(maxMonthlyPayment),
    dtiRatio
  };
}
