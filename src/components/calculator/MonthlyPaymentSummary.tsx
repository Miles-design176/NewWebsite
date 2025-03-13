import { Card, CardContent } from "../../components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip as RechartsTooltip } from "recharts";
import { formatCurrency } from "../../lib/calculatorUtils";

interface MonthlyPaymentSummaryProps {
  principalAndInterest: number;
  taxesAndInsurance: number;
  pmi: number;
  hoaFees: number;
  propertyTax: number;
  homeInsurance: number;
  totalMonthlyPayment: number;
}

export default function MonthlyPaymentSummary({
  principalAndInterest,
  taxesAndInsurance,
  pmi,
  hoaFees,
  propertyTax,
  homeInsurance,
  totalMonthlyPayment,
}: MonthlyPaymentSummaryProps) {
  const chartData = [
    { name: "Principal & Interest", value: principalAndInterest, color: "#3b82f6" },
    { name: "Property Tax", value: propertyTax, color: "#f97316" },
    { name: "Insurance", value: homeInsurance, color: "#10b981" },
    { name: "HOA Fees", value: hoaFees, color: "#a855f7" },
    { name: "PMI", value: pmi, color: "#ef4444" },
  ].filter(item => item.value > 0);

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Monthly Payment</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#eff6ff] rounded-lg p-4 border border-blue-100">
            <h3 className="text-sm font-medium text-gray-500">Principal & Interest</h3>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(principalAndInterest)}</p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h3 className="text-sm font-medium text-gray-500">Taxes & Insurance</h3>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(taxesAndInsurance)}</p>
          </div>
          
          <div className="bg-[#101729] text-white rounded-lg p-4">
            <h3 className="text-sm font-medium text-white opacity-90">Total Monthly Payment</h3>
            <p className="text-2xl font-bold">{formatCurrency(totalMonthlyPayment)}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Payment Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={chartData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90} 
                  paddingAngle={1}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <RechartsTooltip 
                  formatter={(value: number) => formatCurrency(value)} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
