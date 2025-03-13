import { useState, useEffect } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Slider } from "../../components/ui/slider";
import { Button } from "../../components/ui/button";
import { InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip";
import { formatCurrency, formatPercentage } from "../../lib/calculatorUtils";

interface BasicInputsProps {
  homePrice: number;
  onHomePriceChange: (value: number) => void;
  downPayment: number;
  onDownPaymentChange: (value: number) => void;
  loanTerm: number;
  onLoanTermChange: (value: number) => void;
  interestRate: number;
  onInterestRateChange: (value: number) => void;
}

export default function BasicInputs({
  homePrice,
  onHomePriceChange,
  downPayment,
  onDownPaymentChange,
  loanTerm,
  onLoanTermChange,
  interestRate,
  onInterestRateChange,
}: BasicInputsProps) {
  const [downPaymentPercent, setDownPaymentPercent] = useState(
    Math.round((downPayment / homePrice) * 100)
  );

  useEffect(() => {
    setDownPaymentPercent(Math.round((downPayment / homePrice) * 100));
  }, [downPayment, homePrice]);

  const handleDownPaymentPercentChange = (value: number) => {
    setDownPaymentPercent(value);
    onDownPaymentChange(Math.round((homePrice * value) / 100));
  };

  const handleHomePriceChange = (value: number) => {
    onHomePriceChange(value);
    // Maintain the same down payment percentage when home price changes
    onDownPaymentChange(Math.round((value * downPaymentPercent) / 100));
  };

  const handleRawDownPaymentChange = (value: number) => {
    onDownPaymentChange(value);
    setDownPaymentPercent(Math.round((value / homePrice) * 100));
  };

  const loanTermOptions = [10, 15, 30];

  return (
    <div className="space-y-6">
      {/* Home Price Input */}
      <div>
        <div className="flex justify-between">
          <Label htmlFor="home-price" className="text-sm font-medium mb-1 flex items-center">
            Home Price
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>The total purchase price of the home</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <span className="text-sm font-semibold">{formatCurrency(homePrice)}</span>
        </div>
        <div className="flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
            $
          </span>
          <Input
            type="number"
            id="home-price"
            value={homePrice}
            min={50000}
            max={2000000}
            step={5000}
            onChange={(e) => handleHomePriceChange(Number(e.target.value))}
            className="rounded-none rounded-r-md"
          />
        </div>
        <div className="py-4">
          <Slider
            id="home-price-slider"
            value={[homePrice]}
            min={50000}
            max={2000000}
            step={5000}
            onValueChange={(value) => handleHomePriceChange(value[0])}
            className="w-full"
          />
        </div>
      </div>

      {/* Down Payment Input */}
      <div>
        <div className="flex justify-between">
          <Label htmlFor="down-payment" className="text-sm font-medium mb-1 flex items-center">
            Down Payment
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>The initial payment you make upfront</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <div className="flex space-x-4">
            <span className="text-sm font-semibold">{downPaymentPercent}%</span>
            <span className="text-sm font-semibold">{formatCurrency(downPayment)}</span>
          </div>
        </div>
        <div className="flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
            $
          </span>
          <Input
            type="number"
            id="down-payment"
            value={downPayment}
            min={0}
            max={homePrice}
            step={1000}
            onChange={(e) => handleRawDownPaymentChange(Number(e.target.value))}
            className="rounded-none rounded-r-md"
          />
        </div>
        <div className="py-4">
          <Slider
            id="down-payment-slider"
            value={[downPayment]}
            min={0}
            max={homePrice * 0.5}
            step={1000}
            onValueChange={(value) => handleRawDownPaymentChange(value[0])}
            className="w-full"
          />
        </div>
      </div>

      {/* Loan Term Input */}
      <div>
        <Label htmlFor="loan-term" className="text-sm font-medium mb-1 flex items-center">
          Loan Term
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>The number of years you have to repay the loan</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <div className="flex space-x-2 mb-2">
          {loanTermOptions.map((term) => (
            <Button
              key={term}
              variant={loanTerm === term ? "default" : "outline"}
              onClick={() => onLoanTermChange(term)}
              className={`flex-1 ${loanTerm === term ? "bg-[#101729] text-white" : "hover:bg-slate-100"}`}
            >
              {term} Years
            </Button>
          ))}
        </div>
        <div className="flex rounded-md shadow-sm">
          <Input
            type="number"
            id="custom-loan-term"
            placeholder="Custom term"
            min={1}
            max={50}
            value={![10, 15, 30].includes(loanTerm) ? loanTerm : ""}
            onChange={(e) => onLoanTermChange(Number(e.target.value))}
            className="rounded-l-md"
          />
          <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
            Years
          </span>
        </div>
      </div>

      {/* Interest Rate Input */}
      <div>
        <div className="flex justify-between">
          <Label htmlFor="interest-rate" className="text-sm font-medium mb-1 flex items-center">
            Interest Rate
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Annual interest rate for this mortgage</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <span className="text-sm font-semibold">{formatPercentage(interestRate)}</span>
        </div>
        <div className="flex rounded-md shadow-sm">
          <Input
            type="number"
            id="interest-rate"
            value={interestRate}
            min={0.1}
            max={20}
            step={0.125}
            onChange={(e) => onInterestRateChange(Number(e.target.value))}
            className="rounded-l-md"
          />
          <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
            %
          </span>
        </div>
        <div className="py-4">
          <Slider
            id="interest-rate-slider"
            value={[interestRate]}
            min={0.1}
            max={20}
            step={0.125}
            onValueChange={(value) => onInterestRateChange(value[0])}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}