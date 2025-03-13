import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import {
  AmortizationSchedule,
  ComparisonScenario,
  PaymentFrequency,
} from "../types/calculator";
import { CurrencyType } from "../lib/currencyUtils";
import {
  calculateMonthlyPayment,
  calculatePMI,
  calculateAmortizationSchedule,
} from "../lib/calculatorUtils";

export function useMortgageCalculator() {
  // Basic Inputs
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(4.5);

  // Advanced Options
  const [propertyTax, setPropertyTax] = useState(3600);
  const [homeInsurance, setHomeInsurance] = useState(1200);
  const [hoaFees, setHoaFees] = useState(0);
  const [pmiRate, setPmiRate] = useState(0.5);
  const [extraPayment, setExtraPayment] = useState(0);
  const [paymentFrequency, setPaymentFrequency] = useState<PaymentFrequency>("monthly");
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [currency, setCurrency] = useState<CurrencyType>("USD"); // Added currency state with proper type

  // Loan Comparison
  const [comparisonScenarios, setComparisonScenarios] = useState<ComparisonScenario[]>([]);

  // Calculated values
  const [loanAmount, setLoanAmount] = useState(0);
  const [principalAndInterest, setPrincipalAndInterest] = useState(0);
  const [taxesAndInsurance, setTaxesAndInsurance] = useState(0);
  const [pmi, setPmi] = useState(0);
  const [totalMonthlyPayment, setTotalMonthlyPayment] = useState(0);
  const [totalInterestPaid, setTotalInterestPaid] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationSchedule[]>([]);

  // Calculate loan details whenever inputs change
  useEffect(() => {
    // Calculate loan amount
    const calculatedLoanAmount = homePrice - downPayment;
    setLoanAmount(calculatedLoanAmount);

    // Calculate principal and interest payment
    const calculatedPrincipalAndInterest = calculateMonthlyPayment(
      calculatedLoanAmount,
      interestRate,
      loanTerm
    );
    setPrincipalAndInterest(calculatedPrincipalAndInterest);

    // Calculate monthly taxes and insurance
    const monthlyPropertyTax = propertyTax / 12;
    const monthlyHomeInsurance = homeInsurance / 12;
    const calculatedTaxesAndInsurance = monthlyPropertyTax + monthlyHomeInsurance;
    setTaxesAndInsurance(calculatedTaxesAndInsurance);

    // Calculate PMI if applicable
    const calculatedPmi = calculatePMI(calculatedLoanAmount, homePrice, pmiRate);
    setPmi(calculatedPmi);

    // Calculate total monthly payment
    const calculatedTotalMonthlyPayment = 
      calculatedPrincipalAndInterest + 
      calculatedTaxesAndInsurance + 
      calculatedPmi + 
      hoaFees;
    setTotalMonthlyPayment(calculatedTotalMonthlyPayment);

    // Calculate amortization schedule
    const schedule = calculateAmortizationSchedule(
      calculatedLoanAmount,
      interestRate,
      loanTerm,
      extraPayment,
      paymentFrequency
    );
    setAmortizationSchedule(schedule);

    // Calculate total interest paid
    const calculatedTotalInterestPaid = schedule.reduce(
      (total, year) => total + year.interestYTD,
      0
    );
    setTotalInterestPaid(Math.round(calculatedTotalInterestPaid));

    // Calculate total cost
    const calculatedTotalCost = calculatedLoanAmount + calculatedTotalInterestPaid;
    setTotalCost(Math.round(calculatedTotalCost));
  }, [
    homePrice,
    downPayment,
    loanTerm,
    interestRate,
    propertyTax,
    homeInsurance,
    hoaFees,
    pmiRate,
    extraPayment,
    paymentFrequency,
  ]);

  // Manage comparison scenarios
  const addComparisonScenario = useCallback(() => {
    if (comparisonScenarios.length < 3) {
      const newScenario: ComparisonScenario = {
        id: uuidv4(),
        interestRate: Math.max(0.1, interestRate - 0.25 * comparisonScenarios.length),
        loanTerm: loanTerm,
        loanAmount: loanAmount,
      };
      setComparisonScenarios([...comparisonScenarios, newScenario]);
    }
  }, [comparisonScenarios, interestRate, loanTerm, loanAmount]);

  const removeComparisonScenario = useCallback((id: string) => {
    setComparisonScenarios(comparisonScenarios.filter(scenario => scenario.id !== id));
  }, [comparisonScenarios]);

  const updateComparisonScenario = useCallback((id: string, updates: Partial<ComparisonScenario>) => {
    setComparisonScenarios(
      comparisonScenarios.map(scenario => 
        scenario.id === id ? { ...scenario, ...updates } : scenario
      )
    );
  }, [comparisonScenarios]);

  return {
    // Basic inputs
    homePrice,
    setHomePrice,
    downPayment,
    setDownPayment,
    loanTerm,
    setLoanTerm,
    interestRate,
    setInterestRate,

    // Advanced options
    propertyTax,
    setPropertyTax,
    homeInsurance,
    setHomeInsurance,
    hoaFees,
    setHoaFees,
    pmiRate,
    setPmiRate,
    extraPayment,
    setExtraPayment,
    paymentFrequency,
    setPaymentFrequency,
    startDate,
    setStartDate,
    currency,
    setCurrency, 
    comparisonScenarios,
    setComparisonScenarios,
    addComparisonScenario,
    removeComparisonScenario,
    updateComparisonScenario,

    // Calculated values
    loanAmount,
    principalAndInterest,
    taxesAndInsurance,
    pmi,
    totalMonthlyPayment,
    totalInterestPaid,
    totalCost,
    amortizationSchedule,
  };
}