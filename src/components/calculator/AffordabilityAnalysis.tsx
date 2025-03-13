import { useState, useEffect } from 'react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { calculateAffordability, formatCurrency } from '../../lib/calculatorUtils';

import { CurrencyType } from "../../lib/currencyUtils";

interface AffordabilityAnalysisProps {
  interestRate: number;
  propertyTax: number;
  homeInsurance: number;
  loanTerm: number;
  currency: CurrencyType;
}

export default function AffordabilityAnalysis({
  interestRate,
  propertyTax,
  homeInsurance,
  loanTerm,
}: AffordabilityAnalysisProps) {
  const [annualIncome, setAnnualIncome] = useState(80000);
  const [monthlyDebts, setMonthlyDebts] = useState(500);
  const [downPaymentAmount, setDownPaymentAmount] = useState(60000);
  const [results, setResults] = useState({
    purchasePrice: 0,
    affordablePayment: 0,
    dtiRatio: 0
  });

  const calculateResults = () => {
    const affordability = calculateAffordability({
      annualIncome,
      monthlyDebts,
      downPayment: downPaymentAmount,
      interestRate,
      propertyTaxRate: propertyTax,
      homeInsuranceRate: homeInsurance,
      loanTerm
    });
    
    setResults(affordability);
  };

  // Calculate on initial render and when inputs change
  useEffect(() => {
    calculateResults();
  }, []);

  return (
    <div className="mb-6">
      <h3 className="font-medium mb-2">How Much House Can You Afford?</h3>
      <p className="text-sm text-gray-600">Use this calculator to determine a comfortable mortgage amount based on your income and expenses.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <div className="mb-4">
            <Label htmlFor="annual-income" className="block text-sm font-medium text-gray-700 mb-1">
              Annual Household Income
            </Label>
            <div className="flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                $
              </span>
              <Input
                type="number"
                id="annual-income"
                min={10000}
                max={1000000}
                step={1000}
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                className="rounded-none rounded-r-md"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <Label htmlFor="monthly-debts" className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Debt Payments
            </Label>
            <div className="flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                $
              </span>
              <Input
                type="number"
                id="monthly-debts"
                min={0}
                max={10000}
                step={100}
                value={monthlyDebts}
                onChange={(e) => setMonthlyDebts(Number(e.target.value))}
                className="rounded-none rounded-r-md"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <Label htmlFor="down-payment-affordability" className="block text-sm font-medium text-gray-700 mb-1">
              Available Down Payment
            </Label>
            <div className="flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                $
              </span>
              <Input
                type="number"
                id="down-payment-affordability"
                min={0}
                max={1000000}
                step={1000}
                value={downPaymentAmount}
                onChange={(e) => setDownPaymentAmount(Number(e.target.value))}
                className="rounded-none rounded-r-md"
              />
            </div>
          </div>
          
          <Button
            onClick={calculateResults}
            className="w-full bg-primary text-white"
          >
            Calculate Affordability
          </Button>
        </div>
        
        <div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-4">Affordability Results</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Comfortable Purchase Price</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(results.purchasePrice)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Affordable Monthly Payment</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(results.affordablePayment)}</p>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">Debt-to-Income Ratio</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1 mb-1">
                  <div 
                    className={`h-2.5 rounded-full ${
                      results.dtiRatio <= 36 ? 'bg-green-500' : 
                      results.dtiRatio <= 43 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(results.dtiRatio * 100 / 43, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>
                    {results.dtiRatio.toFixed(0)}% 
                    ({results.dtiRatio <= 36 ? 'Good' : 
                      results.dtiRatio <= 43 ? 'Acceptable' : 'High'})
                  </span>
                  <span>43% Max</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
