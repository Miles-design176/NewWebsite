import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip";
import { PaymentFrequency } from "../../types/calculator";

interface AdvancedOptionsProps {
  propertyTax: number;
  onPropertyTaxChange: (value: number) => void;
  homeInsurance: number;
  onHomeInsuranceChange: (value: number) => void;
  hoaFees: number;
  onHoaFeesChange: (value: number) => void;
  pmiRate: number;
  onPmiRateChange: (value: number) => void;
  extraPayment: number;
  onExtraPaymentChange: (value: number) => void;
  paymentFrequency: PaymentFrequency;
  onPaymentFrequencyChange: (value: PaymentFrequency) => void;
  startDate: string;
  onStartDateChange: (value: string) => void;
}

export default function AdvancedOptions({
  propertyTax,
  onPropertyTaxChange,
  homeInsurance,
  onHomeInsuranceChange,
  hoaFees,
  onHoaFeesChange,
  pmiRate,
  onPmiRateChange,
  extraPayment,
  onExtraPaymentChange,
  paymentFrequency,
  onPaymentFrequencyChange,
  startDate,
  onStartDateChange,
}: AdvancedOptionsProps) {
  return (
    <div className="mt-4 space-y-6">
      {/* Property Tax Input */}
      <div>
        <div className="flex justify-between">
          <Label htmlFor="property-tax" className="text-sm font-medium mb-1 flex items-center">
            Property Tax (yearly)
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Annual property tax for this home</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
        </div>
        <div className="flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
            $
          </span>
          <Input
            type="number"
            id="property-tax"
            value={propertyTax}
            min={0}
            max={50000}
            step={100}
            onChange={(e) => onPropertyTaxChange(Number(e.target.value))}
            className="rounded-none rounded-r-md"
          />
        </div>
      </div>

      {/* Home Insurance Input */}
      <div>
        <div className="flex justify-between">
          <Label htmlFor="home-insurance" className="text-sm font-medium mb-1 flex items-center">
            Home Insurance (yearly)
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Annual insurance premium for this home</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
        </div>
        <div className="flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
            $
          </span>
          <Input
            type="number"
            id="home-insurance"
            value={homeInsurance}
            min={0}
            max={10000}
            step={100}
            onChange={(e) => onHomeInsuranceChange(Number(e.target.value))}
            className="rounded-none rounded-r-md"
          />
        </div>
      </div>

      {/* HOA Fees Input */}
      <div>
        <div className="flex justify-between">
          <Label htmlFor="hoa-fees" className="text-sm font-medium mb-1 flex items-center">
            HOA Fees (monthly)
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Monthly homeowners association fees, if applicable</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
        </div>
        <div className="flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
            $
          </span>
          <Input
            type="number"
            id="hoa-fees"
            value={hoaFees}
            min={0}
            max={2000}
            step={10}
            onChange={(e) => onHoaFeesChange(Number(e.target.value))}
            className="rounded-none rounded-r-md"
          />
        </div>
      </div>

      {/* PMI Input */}
      <div>
        <div className="flex justify-between">
          <Label htmlFor="pmi" className="text-sm font-medium mb-1 flex items-center">
            PMI Rate
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Private mortgage insurance rate (typically required if down payment is less than 20%)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
        </div>
        <div className="flex rounded-md shadow-sm">
          <Input
            type="number"
            id="pmi"
            value={pmiRate}
            min={0}
            max={2}
            step={0.05}
            onChange={(e) => onPmiRateChange(Number(e.target.value))}
            className="rounded-l-md"
          />
          <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
            %
          </span>
        </div>
      </div>

      {/* Extra Payment Input */}
      <div>
        <div className="flex justify-between">
          <Label htmlFor="extra-payment" className="text-sm font-medium mb-1 flex items-center">
            Extra Monthly Payment
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Additional amount to pay monthly to reduce loan term</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
        </div>
        <div className="flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
            $
          </span>
          <Input
            type="number"
            id="extra-payment"
            value={extraPayment}
            min={0}
            max={10000}
            step={50}
            onChange={(e) => onExtraPaymentChange(Number(e.target.value))}
            className="rounded-none rounded-r-md"
          />
        </div>
      </div>

      {/* Payment Frequency */}
      <div>
        <Label htmlFor="payment-frequency" className="text-sm font-medium mb-1 flex items-center">
          Payment Frequency
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>How often you make mortgage payments</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <Select 
          value={paymentFrequency} 
          onValueChange={(value: string) => onPaymentFrequencyChange(value as PaymentFrequency)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select payment frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="biweekly">Bi-weekly (26 payments/year)</SelectItem>
            <SelectItem value="accelerated">Accelerated Bi-weekly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Start Date */}
      <div>
        <Label htmlFor="start-date" className="text-sm font-medium mb-1 flex items-center">
          Start Date
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>When your mortgage payments begin</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <Input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
}
