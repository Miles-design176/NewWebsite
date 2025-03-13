import { Button } from "../../components/ui/button";
import { PlusIcon } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import ComparisonItem from "./ComparisonItem";
import { ComparisonScenario } from "../../types/calculator";

interface LoanComparisonProps {
  homePrice: number;
  downPayment: number;
  loanTerm: number;
  interestRate: number;
  scenarios: ComparisonScenario[];
  onAddScenario: () => void;
  onRemoveScenario: (id: string) => void;
  onUpdateScenario: (id: string, scenario: Partial<ComparisonScenario>) => void;
}

export default function LoanComparison({
  homePrice,
  downPayment,
  loanTerm,
  interestRate,
  scenarios,
  onAddScenario,
  onRemoveScenario,
  onUpdateScenario,
}: LoanComparisonProps) {
  return (
    <Card className="mt-8">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Loan Comparison</h2>
        <p className="text-sm text-gray-600 mb-4">Compare your current mortgage with different options</p>
        
        <Button 
          variant="outline" 
          onClick={onAddScenario}
          className="flex items-center"
          disabled={scenarios.length >= 3}
        >
          <PlusIcon className="h-4 w-4 mr-2" /> Add Scenario
        </Button>

        <div className="mt-4">
          <div className="space-y-4">
            {scenarios.map((scenario, index) => (
              <ComparisonItem
                key={scenario.id}
                scenario={scenario}
                scenarioNumber={index + 1}
                onRemove={() => onRemoveScenario(scenario.id)}
                onChange={(updates) => onUpdateScenario(scenario.id, updates)}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
