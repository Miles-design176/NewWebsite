import { useState } from "react";
import BasicInputs from "./BasicInputs";
import AdvancedOptions from "./AdvancedOptions";
import LoanComparison from "./LoanComparison";
import ResultsPanel from "./ResultsPanel";
import { useMortgageCalculator } from "../../hooks/useMortgageCalculator";
import { Button } from "../../components/ui/button";
import { Home, ChevronDown, ChevronUp, Sliders } from "lucide-react";
import CurrencySelector from "./CurrencySelector";
import Navbar from "../NavBar/navbar";

export default function MortgageCalculator() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const calculator = useMortgageCalculator();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Navbar activePage="calc" />
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Home className="h-6 w-6 text-primary mr-2" />
            Advanced Mortgage Calculator
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Mortgage Details</h2>
                  <CurrencySelector
                    currency={calculator.currency}
                    onCurrencyChange={calculator.setCurrency}
                  />
                </div>

                <BasicInputs 
                  homePrice={calculator.homePrice}
                  onHomePriceChange={calculator.setHomePrice}
                  downPayment={calculator.downPayment}
                  onDownPaymentChange={calculator.setDownPayment}
                  loanTerm={calculator.loanTerm}
                  onLoanTermChange={calculator.setLoanTerm}
                  interestRate={calculator.interestRate}
                  onInterestRateChange={calculator.setInterestRate}
                  currency={calculator.currency}
                />

                {/* Advanced Options Toggle */}
                <div className="mt-8 border-t border-gray-200 pt-4">
                  <Button 
                    variant="ghost" 
                    className="flex items-center text-primary font-medium w-full justify-start p-0"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                  >
                    <Sliders className="h-4 w-4 mr-2" />
                    <span>Advanced Options</span>
                    {showAdvanced ? (
                      <ChevronUp className="ml-2 h-4 w-4 transition-transform duration-200" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-200" />
                    )}
                  </Button>

                  {showAdvanced && (
                    <AdvancedOptions
                      propertyTax={calculator.propertyTax}
                      onPropertyTaxChange={calculator.setPropertyTax}
                      homeInsurance={calculator.homeInsurance}
                      onHomeInsuranceChange={calculator.setHomeInsurance}
                      hoaFees={calculator.hoaFees}
                      onHoaFeesChange={calculator.setHoaFees}
                      pmiRate={calculator.pmiRate}
                      onPmiRateChange={calculator.setPmiRate}
                      extraPayment={calculator.extraPayment}
                      onExtraPaymentChange={calculator.setExtraPayment}
                      paymentFrequency={calculator.paymentFrequency}
                      onPaymentFrequencyChange={calculator.setPaymentFrequency}
                      startDate={calculator.startDate}
                      onStartDateChange={calculator.setStartDate}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Loan Comparison */}
            <LoanComparison 
              homePrice={calculator.homePrice}
              downPayment={calculator.downPayment}
              loanTerm={calculator.loanTerm}
              interestRate={calculator.interestRate}
              scenarios={calculator.comparisonScenarios}
              onAddScenario={calculator.addComparisonScenario}
              onRemoveScenario={calculator.removeComparisonScenario}
              onUpdateScenario={calculator.updateComparisonScenario}
            />
          </div>

          {/* Right Column - Results */}
          <ResultsPanel 
            homePrice={calculator.homePrice}
            downPayment={calculator.downPayment}
            loanTerm={calculator.loanTerm}
            interestRate={calculator.interestRate}
            propertyTax={calculator.propertyTax}
            homeInsurance={calculator.homeInsurance}
            hoaFees={calculator.hoaFees}
            pmiRate={calculator.pmiRate}
            extraPayment={calculator.extraPayment}
            paymentFrequency={calculator.paymentFrequency}
            loanAmount={calculator.loanAmount}
            principalAndInterest={calculator.principalAndInterest}
            taxesAndInsurance={calculator.taxesAndInsurance}
            pmi={calculator.pmi}
            totalMonthlyPayment={calculator.totalMonthlyPayment}
            totalInterestPaid={calculator.totalInterestPaid}
            totalCost={calculator.totalCost}
            amortizationSchedule={calculator.amortizationSchedule}
            currency={calculator.currency}
          />
        </div>
      </main>
    </div>
  );
}