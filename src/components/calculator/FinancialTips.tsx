import { Card, CardContent } from "../../components/ui/card";
import {
  Lightbulb,
  Banknote,
  Percent,
  Calculator,
  Info,
} from "lucide-react";

export default function FinancialTips() {
  return (
    <Card>
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Mortgage Tips & Advice</h2>
      </div>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <h3 className="font-medium mb-2 flex items-center">
              <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
              20% Down Payment Benefits
            </h3>
            <p className="text-sm text-gray-600">
              Putting 20% down avoids PMI (Private Mortgage Insurance), which can save you thousands over the life of your loan.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <h3 className="font-medium mb-2 flex items-center">
              <Banknote className="h-5 w-5 text-green-500 mr-2" />
              Bi-weekly Payments
            </h3>
            <p className="text-sm text-gray-600">
              Making bi-weekly payments results in 13 "monthly" payments each year instead of 12, reducing your loan term and interest.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <h3 className="font-medium mb-2 flex items-center">
              <Percent className="h-5 w-5 text-red-500 mr-2" />
              Understanding APR
            </h3>
            <p className="text-sm text-gray-600">
              The Annual Percentage Rate (APR) includes your interest rate plus other loan costs, giving you a more complete picture of loan expenses.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <h3 className="font-medium mb-2 flex items-center">
              <Calculator className="h-5 w-5 text-purple-500 mr-2" />
              The 28/36 Rule
            </h3>
            <p className="text-sm text-gray-600">
              Your mortgage payment should be no more than 28% of your monthly income, and total debt payments no more than 36%.
            </p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="font-medium mb-2 flex items-center">
            <Info className="h-5 w-5 text-blue-500 mr-2" />
            Did You Know?
          </h3>
          <p className="text-sm text-gray-700">
            Making just one extra payment per year can shorten a 30-year mortgage by 4 years and save over $30,000 in interest on a $300,000 loan.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
