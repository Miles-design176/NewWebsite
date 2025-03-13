import { useState } from "react";
import MonthlyPaymentSummary from "./MonthlyPaymentSummary";
import LoanSummary from "./LoanSummary";
import AmortizationTable from "./AmortizationTable";
import PayoffStrategies from "./PayoffStrategies";
import AffordabilityAnalysis from "./AffordabilityAnalysis";
import MortgageTypeComparison from "./MortgageTypeComparison";
import FinancialTips from "./FinancialTips";
import PrintResults from "./PrintResults";
import { AmortizationSchedule, PaymentFrequency } from "@/types/calculator";
import { CurrencyType } from "@/lib/currencyUtils";

interface ResultsPanelProps {
  homePrice: number;
  downPayment: number;
  loanTerm: number;
  interestRate: number;
  propertyTax: number;
  homeInsurance: number;
  hoaFees: number;
  pmiRate: number;
  extraPayment: number;
  paymentFrequency: PaymentFrequency;
  loanAmount: number;
  principalAndInterest: number;
  taxesAndInsurance: number;
  pmi: number;
  totalMonthlyPayment: number;
  totalInterestPaid: number;
  totalCost: number;
  amortizationSchedule: AmortizationSchedule[];
  currency: CurrencyType;
}

export default function ResultsPanel({
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
  loanAmount,
  principalAndInterest,
  taxesAndInsurance,
  pmi,
  totalMonthlyPayment,
  totalInterestPaid,
  totalCost,
  amortizationSchedule,
  currency,
}: ResultsPanelProps) {
  const [activeTab, setActiveTab] = useState<'amortization' | 'payoff-strategies' | 'affordability' | 'mortgage-type'>('amortization');

  return (
    <div className="lg:col-span-2">
      {/* Monthly Payment Summary */}
      <MonthlyPaymentSummary 
        principalAndInterest={principalAndInterest}
        taxesAndInsurance={taxesAndInsurance}
        totalMonthlyPayment={totalMonthlyPayment}
        pmi={pmi}
        hoaFees={hoaFees}
        propertyTax={propertyTax / 12}
        homeInsurance={homeInsurance / 12}
        currency={currency} // Added currency prop
      />

      {/* Loan Summary */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8" id="mortgage-calculator-results">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Loan Summary</h2>
            <PrintResults />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <h3 className="text-xs font-medium text-gray-500">Loan Amount</h3>
              <p className="text-lg font-semibold text-gray-900" id="loan-amount">
                {currency === 'USD' ? '$' : 'C$'} {loanAmount.toLocaleString()}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-medium text-gray-500">Loan Term</h3>
              <p className="text-lg font-semibold text-gray-900">
                {loanTerm} years
              </p>
            </div>

            <div>
              <h3 className="text-xs font-medium text-gray-500">Total Interest</h3>
              <p className="text-lg font-semibold text-gray-900">
                {currency === 'USD' ? '$' : 'C$'} {totalInterestPaid.toLocaleString()}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-medium text-gray-500">Total Cost</h3>
              <p className="text-lg font-semibold text-gray-900">
                {currency === 'USD' ? '$' : 'C$'} {totalCost.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Amortization Chart */}
          <LoanSummary 
            amortizationSchedule={amortizationSchedule}
            currency={currency} // Added currency prop
          />

          {/* Interactive Feature Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button 
                className={`mr-8 py-4 text-sm font-medium ${
                  activeTab === 'amortization' 
                    ? 'border-b-2 border-primary text-primary font-semibold' 
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('amortization')}
              >
                Amortization Table
              </button>
              <button 
                className={`mr-8 py-4 text-sm font-medium ${
                  activeTab === 'payoff-strategies' 
                    ? 'border-b-2 border-primary text-primary font-semibold' 
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('payoff-strategies')}
              >
                Payoff Strategies
              </button>
              <button 
                className={`mr-8 py-4 text-sm font-medium ${
                  activeTab === 'affordability' 
                    ? 'border-b-2 border-primary text-primary font-semibold' 
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('affordability')}
              >
                Affordability Analysis
              </button>
              <button 
                className={`mr-8 py-4 text-sm font-medium ${
                  activeTab === 'mortgage-type' 
                    ? 'border-b-2 border-primary text-primary font-semibold' 
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('mortgage-type')}
              >
                Fixed vs ARM
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="py-4">
            {activeTab === 'amortization' && (
              <AmortizationTable amortizationSchedule={amortizationSchedule} currency={currency}/>
            )}

            {activeTab === 'payoff-strategies' && (
              <PayoffStrategies 
                homePrice={homePrice}
                downPayment={downPayment}
                loanTerm={loanTerm}
                interestRate={interestRate}
                currentMonthlyPayment={principalAndInterest}
                loanAmount={loanAmount}
                currency={currency} // Added currency prop
              />
            )}

            {activeTab === 'affordability' && (
              <AffordabilityAnalysis 
                interestRate={interestRate}
                propertyTax={propertyTax}
                homeInsurance={homeInsurance}
                loanTerm={loanTerm}
                currency={currency} // Added currency prop
              />
            )}

            {activeTab === 'mortgage-type' && (
              <MortgageTypeComparison 
                loanAmount={loanAmount}
                loanTerm={loanTerm}
                fixedRate={interestRate}
                currency={currency} // Added currency prop
              />
            )}
          </div>
        </div>
      </div>

      {/* Financial Tips Section */}
      <FinancialTips />
    </div>
  );
}