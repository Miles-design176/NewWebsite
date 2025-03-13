import { useState, useEffect } from 'react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent } from "../../components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { calculateMonthlyPayment, formatCurrency } from '../../lib/calculatorUtils';

interface MortgageTypeComparisonProps {
  loanAmount: number;
  loanTerm: number;
  fixedRate: number;
}

export default function MortgageTypeComparison({
  loanAmount,
  loanTerm,
  fixedRate,
}: MortgageTypeComparisonProps) {
  const [initialArmRate, setInitialArmRate] = useState(fixedRate - 0.75);
  const [armAdjustmentPeriod, setArmAdjustmentPeriod] = useState(5);
  const [expectedRateIncrease, setExpectedRateIncrease] = useState(1.0);
  const [comparisonData, setComparisonData] = useState<any[]>([]);

  useEffect(() => {
    // Calculate comparison data between fixed and ARM
    const data = [];
    const fixedPayment = calculateMonthlyPayment(loanAmount, fixedRate, loanTerm);
    
    // Calculate initial ARM period
    const initialArmPayment = calculateMonthlyPayment(loanAmount, initialArmRate, loanTerm);
    
    // Calculate remaining balance at adjustment time
    let remainingLoanAmount = loanAmount;
    let totalFixedPaid = 0;
    let totalArmPaid = 0;
    
    // Add initial period comparison
    data.push({
      period: `Years 1-${armAdjustmentPeriod}`,
      fixed: fixedPayment,
      arm: initialArmPayment,
      fixedDifference: 0,  // Reference point
      armDifference: initialArmPayment - fixedPayment
    });
    
    // Calculate months in initial period
    const initialPeriodMonths = armAdjustmentPeriod * 12;
    
    // Calculate remaining balance after initial period
    const monthlyInterestRate = initialArmRate / 100 / 12;
    for (let i = 0; i < initialPeriodMonths; i++) {
      const interestPortion = remainingLoanAmount * monthlyInterestRate;
      const principalPortion = initialArmPayment - interestPortion;
      remainingLoanAmount -= principalPortion;
      
      totalFixedPaid += fixedPayment;
      totalArmPaid += initialArmPayment;
    }
    
    // Now calculate adjusted rate periods
    const remainingYears = Math.max(0, loanTerm - armAdjustmentPeriod);
    if (remainingYears > 0) {
      // Calculate new ARM payment after adjustment
      const adjustedRate = initialArmRate + expectedRateIncrease;
      const adjustedArmPayment = calculateMonthlyPayment(
        remainingLoanAmount, 
        adjustedRate, 
        remainingYears
      );
      
      data.push({
        period: `Years ${armAdjustmentPeriod+1}-${loanTerm}`,
        fixed: fixedPayment,
        arm: adjustedArmPayment,
        fixedDifference: 0,
        armDifference: adjustedArmPayment - fixedPayment
      });
      
      // Calculate totals for the entire loan term
      const remainingMonths = remainingYears * 12;
      totalFixedPaid += fixedPayment * remainingMonths;
      totalArmPaid += adjustedArmPayment * remainingMonths;
    }
    
    // Add lifetime comparison
    data.push({
      period: 'Lifetime Average',
      fixed: totalFixedPaid / (loanTerm * 12),
      arm: totalArmPaid / (loanTerm * 12),
      fixedDifference: 0,
      armDifference: (totalArmPaid - totalFixedPaid) / (loanTerm * 12)
    });
    
    setComparisonData(data);
  }, [loanAmount, loanTerm, fixedRate, initialArmRate, armAdjustmentPeriod, expectedRateIncrease]);

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Fixed Rate vs. ARM Comparison</h3>
        <p className="text-sm text-gray-600 mb-6">
          Compare a fixed-rate mortgage with an adjustable-rate mortgage (ARM). ARM loans typically start with a lower interest rate 
          but can change after the initial period.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <Label htmlFor="initial-arm-rate" className="text-sm font-medium mb-1">
              Initial ARM Rate (%)
            </Label>
            <Input
              type="number"
              id="initial-arm-rate"
              value={initialArmRate}
              min={0.1}
              max={20}
              step={0.125}
              onChange={(e) => setInitialArmRate(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="arm-adjustment-period" className="text-sm font-medium mb-1">
              Adjustment Period (years)
            </Label>
            <Input
              type="number"
              id="arm-adjustment-period"
              value={armAdjustmentPeriod}
              min={1}
              max={10}
              step={1}
              onChange={(e) => setArmAdjustmentPeriod(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="expected-rate-increase" className="text-sm font-medium mb-1">
              Expected Rate Increase (%)
            </Label>
            <Input
              type="number"
              id="expected-rate-increase"
              value={expectedRateIncrease}
              min={0}
              max={10}
              step={0.25}
              onChange={(e) => setExpectedRateIncrease(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2">Monthly Payment Comparison</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={comparisonData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis tickFormatter={(value) => `$${value.toFixed(0)}`} />
                <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, undefined]} />
                <Legend />
                <Bar name="Fixed Rate" dataKey="fixed" fill="#3b82f6" />
                <Bar name="ARM" dataKey="arm" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 className="font-medium text-blue-900 mb-2">Fixed Rate Benefits</h4>
            <ul className="text-sm space-y-2 text-gray-700">
              <li>• Predictable payments for the entire loan term</li>
              <li>• No risk of payment increases if interest rates rise</li>
              <li>• Simpler to understand and plan for long-term</li>
              <li>• Better for those planning to stay in home long-term</li>
            </ul>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
            <h4 className="font-medium text-orange-900 mb-2">ARM Benefits</h4>
            <ul className="text-sm space-y-2 text-gray-700">
              <li>• Lower initial rate and payment</li>
              <li>• Good option if you plan to move before adjustment period</li>
              <li>• Potential savings if rates stay low or decrease</li>
              <li>• Often easier to qualify for with lower initial payments</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium mb-2">Cost Comparison Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Initial ARM savings per month:</span>
              <span className="font-medium text-green-600">
                {comparisonData.length > 0 
                  ? formatCurrency(Math.abs(comparisonData[0].armDifference)) 
                  : '$0'}
                {comparisonData.length > 0 && comparisonData[0].armDifference < 0 ? ' savings' : ' more'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>Post-adjustment ARM difference:</span>
              <span className={`font-medium ${comparisonData.length > 1 && comparisonData[1].armDifference > 0 
                ? 'text-red-600' 
                : 'text-green-600'}`}>
                {comparisonData.length > 1 
                  ? formatCurrency(Math.abs(comparisonData[1].armDifference)) 
                  : '$0'}
                {comparisonData.length > 1 && comparisonData[1].armDifference < 0 ? ' savings' : ' more'}
              </span>
            </div>
            
            <div className="pt-2 border-t border-gray-200 mt-2">
              <div className="flex justify-between font-medium">
                <span>Lifetime difference:</span>
                <span className={`${comparisonData.length > 2 && comparisonData[2].armDifference > 0 
                  ? 'text-red-600' 
                  : 'text-green-600'}`}>
                  {comparisonData.length > 2 
                    ? formatCurrency(Math.abs(comparisonData[2].armDifference) * loanTerm * 12) 
                    : '$0'}
                  {comparisonData.length > 2 && comparisonData[2].armDifference < 0 ? ' savings with ARM' : ' more with ARM'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}