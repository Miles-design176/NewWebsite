import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { XIcon } from "lucide-react";
import { ComparisonScenario } from "../../types/calculator";
import { calculateMonthlyPayment, formatCurrency } from "../../lib/calculatorUtils";

interface ComparisonItemProps {
  scenario: ComparisonScenario;
  scenarioNumber: number;
  onRemove: () => void;
  onChange: (updates: Partial<ComparisonScenario>) => void;
}

export default function ComparisonItem({
  scenario,
  scenarioNumber,
  onRemove,
  onChange,
}: ComparisonItemProps) {
  const monthlyPayment = calculateMonthlyPayment(
    scenario.loanAmount,
    scenario.interestRate,
    scenario.loanTerm
  );

  return (
    <div className="border border-gray-200 rounded-md p-3">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-sm">Scenario {scenarioNumber}</span>
        <button 
          className="text-gray-400 hover:text-gray-600"
          onClick={onRemove}
        >
          <XIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <label className="block text-gray-600">Interest Rate</label>
          <div className="flex mt-1">
            <Input
              type="number"
              value={scenario.interestRate}
              min={0.1}
              max={20}
              step={0.125}
              onChange={(e) => onChange({ interestRate: Number(e.target.value) })}
              className="w-full p-1 text-xs"
            />
            <span className="inline-flex items-center px-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-xs">
              %
            </span>
          </div>
        </div>
        <div>
          <label className="block text-gray-600">Term (years)</label>
          <div className="flex rounded-md shadow-sm">
            <Input
              type="number"
              value={scenario.loanTerm}
              min={1}
              max={50}
              onChange={(e) => onChange({ loanTerm: Number(e.target.value) })}
              className="text-xs h-8"
            />
            <span className="inline-flex items-center px-1 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-xs">
              yrs
            </span>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex justify-between text-xs text-gray-800">
          <span>Monthly payment:</span>
          <span className="font-semibold">{formatCurrency(monthlyPayment)}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-800">
          <span>Total interest:</span>
          <span className="font-semibold">{formatCurrency(monthlyPayment * 12 * scenario.loanTerm - scenario.loanAmount)}</span>
        </div>
      </div>
    </div>
  );
}
