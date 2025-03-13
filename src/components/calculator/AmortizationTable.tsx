import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Download } from 'lucide-react';
import { AmortizationSchedule } from '../../types/calculator';
import { formatCurrency } from '../../lib/calculatorUtils';

import { CurrencyType } from "../../lib/currencyUtils";

interface AmortizationTableProps {
  amortizationSchedule: AmortizationSchedule[];
  currency: CurrencyType;
}

export default function AmortizationTable({ amortizationSchedule }: AmortizationTableProps) {
  const [showRows, setShowRows] = useState(10);
  
  const downloadCSV = () => {
    const headers = ['Year', 'Payment', 'Principal', 'Interest', 'Balance'];
    const csvContent = amortizationSchedule.map(row => 
      [
        row.year,
        row.totalPayment.toFixed(2),
        row.principalYTD.toFixed(2),
        row.interestYTD.toFixed(2),
        row.endingBalance.toFixed(2)
      ].join(',')
    );
    
    const csv = [
      headers.join(','),
      ...csvContent
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'amortization_schedule.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Amortization Schedule</h3>
        <Button variant="ghost" className="text-primary text-sm flex items-center" onClick={downloadCSV}>
          <Download className="h-4 w-4 mr-1" /> Export CSV
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {amortizationSchedule.slice(0, showRows).map((row) => (
              <tr key={row.year}>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.year}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{formatCurrency(row.totalPayment)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{formatCurrency(row.principalYTD)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{formatCurrency(row.interestYTD)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{formatCurrency(row.endingBalance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {showRows < amortizationSchedule.length && (
        <div className="mt-4 flex justify-center">
          <Button 
            variant="outline" 
            onClick={() => setShowRows(Math.min(showRows + 10, amortizationSchedule.length))}
          >
            Show More
          </Button>
        </div>
      )}
    </div>
  );
}
