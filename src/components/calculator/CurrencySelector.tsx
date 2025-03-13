
import React from 'react';
import { CurrencyType } from '../../lib/currencyUtils';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

interface CurrencySelectorProps {
  currency: CurrencyType;
  onCurrencyChange: (currency: CurrencyType) => void;
}

export default function CurrencySelector({ 
  currency, 
  onCurrencyChange 
}: CurrencySelectorProps) {
  return (
    <div className="flex items-center">
      <span className="text-sm font-medium text-gray-600 mr-2">Currency:</span>
      <Select
        value={currency}
        onValueChange={(value) => onCurrencyChange(value as CurrencyType)}
      >
        <SelectTrigger className="w-24 h-8">
          <SelectValue placeholder="USD" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="USD">USD</SelectItem>
          <SelectItem value="CAD">CAD</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
