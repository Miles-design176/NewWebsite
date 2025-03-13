import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { AmortizationSchedule } from '@/types/calculator';
import { formatCurrency } from '@/lib/calculatorUtils';

interface LoanSummaryProps {
  amortizationSchedule: AmortizationSchedule[];
}

export default function LoanSummary({ amortizationSchedule }: LoanSummaryProps) {
  // Prepare data for the chart
  const chartData = amortizationSchedule.map(year => ({
    year: year.year,
    principal: year.principalYTD,
    interest: year.interestYTD,
    balance: year.endingBalance
  }));

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Amortization Schedule</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              label={{ value: 'Year', position: 'insideBottomRight', offset: -10 }} 
            />
            <YAxis 
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} 
              label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]} 
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="principal" 
              stackId="1" 
              stroke="#3b82f6" 
              fill="#3b82f6" 
              fillOpacity={0.6}
              name="Principal"
            />
            <Area 
              type="monotone" 
              dataKey="interest" 
              stackId="1" 
              stroke="#f97316" 
              fill="#f97316" 
              fillOpacity={0.6}
              name="Interest"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
