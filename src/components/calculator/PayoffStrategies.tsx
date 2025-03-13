import { useState, useEffect } from 'react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { calculateMonthlyPayment, calculateLoanPayoff } from '../../lib/calculatorUtils';
import { formatCurrency } from '../../lib/calculatorUtils';

import { CurrencyType } from "../../lib/currencyUtils";

interface PayoffStrategiesProps {
  homePrice: number;
  downPayment: number;
  loanTerm: number;
  interestRate: number;
  currentMonthlyPayment: number;
  loanAmount: number;
  currency: CurrencyType;
}

export default function PayoffStrategies({
  homePrice,
  downPayment,
  loanTerm,
  interestRate,
  currentMonthlyPayment,
  loanAmount,
}: PayoffStrategiesProps) {
  const [extraPayment, setExtraPayment] = useState(200);
  const [biWeeklyPayment, setBiWeeklyPayment] = useState(Math.round(currentMonthlyPayment / 2));
  const [oneTimePayment, setOneTimePayment] = useState(10000);
  const [newInterestRate, setNewInterestRate] = useState(interestRate - 1 > 0 ? interestRate - 1 : interestRate / 2);
  const [closingCosts, setClosingCosts] = useState(4000);
  
  // Extra payment strategy results
  const [extraTimeSaved, setExtraTimeSaved] = useState('');
  const [extraInterestSaved, setExtraInterestSaved] = useState(0);
  
  // Bi-weekly payment strategy results
  const [biWeeklyTimeSaved, setBiWeeklyTimeSaved] = useState('');
  const [biWeeklyInterestSaved, setBiWeeklyInterestSaved] = useState(0);
  
  // One-time payment strategy results
  const [oneTimeTimeSaved, setOneTimeTimeSaved] = useState('');
  const [oneTimeInterestSaved, setOneTimeInterestSaved] = useState(0);

  // Calculate payoff strategies
  useEffect(() => {
    // Extra payment strategy
    const { monthsReduced: extraMonths, interestSaved: extraInterest } = calculateLoanPayoff({
      loanAmount,
      interestRate,
      loanTermYears: loanTerm,
      extraPayment
    });
    
    setExtraTimeSaved(formatTimeSaved(extraMonths));
    setExtraInterestSaved(extraInterest);
    
    // Bi-weekly payment strategy
    const { monthsReduced: biWeeklyMonths, interestSaved: biWeeklyInterest } = calculateLoanPayoff({
      loanAmount,
      interestRate,
      loanTermYears: loanTerm,
      biWeekly: true
    });
    
    setBiWeeklyTimeSaved(formatTimeSaved(biWeeklyMonths));
    setBiWeeklyInterestSaved(biWeeklyInterest);
    setBiWeeklyPayment(Math.round(currentMonthlyPayment / 2));
    
    // One-time payment strategy
    const { monthsReduced: oneTimeMonths, interestSaved: oneTimeInterest } = calculateLoanPayoff({
      loanAmount,
      interestRate,
      loanTermYears: loanTerm,
      oneTimePayment
    });
    
    setOneTimeTimeSaved(formatTimeSaved(oneTimeMonths));
    setOneTimeInterestSaved(oneTimeInterest);
  }, [loanAmount, interestRate, loanTerm, extraPayment, oneTimePayment, currentMonthlyPayment]);

  // Helper to format time saved
  function formatTimeSaved(months: number): string {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${remainingMonths} months`;
    } else if (remainingMonths === 0) {
      return `${years} years`;
    } else {
      return `${years} years, ${remainingMonths} months`;
    }
  }

  const applyBiWeeklyStrategy = () => {
    // This would typically update the main calculator state
    // For demo purposes, we'll just show an alert
    alert('Bi-weekly payment strategy applied to the calculator!');
  };

  const calculateRefinanceResults = () => {
    const newMonthlyPayment = calculateMonthlyPayment(loanAmount, newInterestRate, loanTerm);
    const monthlySavings = currentMonthlyPayment - newMonthlyPayment;
    const monthsToBreakEven = Math.ceil(closingCosts / monthlySavings);
    
    alert(`
      New Monthly Payment: ${formatCurrency(newMonthlyPayment)}
      Monthly Savings: ${formatCurrency(monthlySavings)}
      Months to Break Even: ${monthsToBreakEven}
      Total Savings Over Loan Term: ${formatCurrency(monthlySavings * loanTerm * 12 - closingCosts)}
    `);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Extra Payment Strategy</h3>
        <p className="text-sm text-gray-600 mb-4">See how adding extra to your monthly payment affects your loan</p>
        
        <div className="mb-4">
          <Label htmlFor="strategy-extra-payment" className="block text-sm font-medium text-gray-700 mb-1">
            Extra Monthly Payment
          </Label>
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
              $
            </span>
            <Input
              type="number"
              id="strategy-extra-payment"
              min={0}
              max={5000}
              step={50}
              value={extraPayment}
              onChange={(e) => setExtraPayment(Number(e.target.value))}
              className="rounded-none rounded-r-md"
            />
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Time Saved:</span>
            <span className="font-medium text-gray-900">{extraTimeSaved}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Interest Saved:</span>
            <span className="font-medium text-green-600">{formatCurrency(extraInterestSaved)}</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Bi-weekly Payment Strategy</h3>
        <p className="text-sm text-gray-600 mb-4">Make half your monthly payment every two weeks</p>
        
        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Bi-weekly Payment:</span>
            <span className="font-medium text-gray-900">{formatCurrency(biWeeklyPayment)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time Saved:</span>
            <span className="font-medium text-gray-900">{biWeeklyTimeSaved}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Interest Saved:</span>
            <span className="font-medium text-green-600">{formatCurrency(biWeeklyInterestSaved)}</span>
          </div>
        </div>
        
        <Button 
          onClick={applyBiWeeklyStrategy}
          className="w-full bg-[#101729] text-white"
        >
          Apply This Strategy
        </Button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">One-Time Payment</h3>
        <p className="text-sm text-gray-600 mb-4">Add a one-time extra payment to reduce your loan</p>
        
        <div className="mb-4">
          <Label htmlFor="one-time-payment" className="block text-sm font-medium text-gray-700 mb-1">
            Payment Amount
          </Label>
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
              $
            </span>
            <Input
              type="number"
              id="one-time-payment"
              min={1000}
              max={100000}
              step={1000}
              value={oneTimePayment}
              onChange={(e) => setOneTimePayment(Number(e.target.value))}
              className="rounded-none rounded-r-md"
            />
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Time Saved:</span>
            <span className="font-medium text-gray-900">{oneTimeTimeSaved}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Interest Saved:</span>
            <span className="font-medium text-green-600">{formatCurrency(oneTimeInterestSaved)}</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Refinance Calculator</h3>
        <p className="text-sm text-gray-600 mb-4">See if refinancing could save you money</p>
        
        <div className="mb-4">
          <Label htmlFor="new-interest-rate" className="block text-sm font-medium text-gray-700 mb-1">
            New Interest Rate
          </Label>
          <div className="flex rounded-md shadow-sm">
            <Input
              type="number"
              id="new-interest-rate"
              min={0.1}
              max={20}
              step={0.125}
              value={newInterestRate}
              onChange={(e) => setNewInterestRate(Number(e.target.value))}
              className="rounded-l-md"
            />
            <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
              %
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <Label htmlFor="closing-costs" className="block text-sm font-medium text-gray-700 mb-1">
            Closing Costs
          </Label>
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
              $
            </span>
            <Input
              type="number"
              id="closing-costs"
              min={0}
              max={50000}
              step={500}
              value={closingCosts}
              onChange={(e) => setClosingCosts(Number(e.target.value))}
              className="rounded-none rounded-r-md"
            />
          </div>
        </div>
        
        <Button
          onClick={calculateRefinanceResults}
          className="w-full bg-[#101729] text-white"
        >
          Calculate Savings
        </Button>
      </div>
    </div>
  );
}
