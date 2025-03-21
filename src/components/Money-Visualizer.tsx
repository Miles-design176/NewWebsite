// MoneyVisualizer.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "./NavBar/navbar";

interface Item {
  id: number;
  name: string;
  cost: number;
}

const MoneyVisualizer: React.FC = () => {
  const navigate = useNavigate();
  const [moneyInput, setMoneyInput] = useState<string>('');
  const [totalMoney, setTotalMoney] = useState<number>(0);
  const [items, setItems] = useState<Item[]>([]);
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemCost, setNewItemCost] = useState<string>('');
  const [remaining, setRemaining] = useState<number>(0);
  const [totalItemsCost, setTotalItemsCost] = useState<number>(0);

  useEffect(() => {
    const itemsTotal = items.reduce((sum, item) => sum + item.cost, 0);
    setTotalItemsCost(itemsTotal);
    setRemaining(totalMoney - itemsTotal);
  }, [totalMoney, items]);

  const handleMoneyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMoneyInput(e.target.value);
  };

  const calculateTotalMoney = (): void => {
    // Process input like 50+50+50...
    if (!moneyInput.trim()) return;
    
    try {
      // Replace all spaces
      const cleanInput = moneyInput.replace(/\s/g, '');
      // Use eval to calculate the sum, with a basic security check
      if (!/^[0-9+.]+$/.test(cleanInput)) {
        alert('Please enter only numbers and + signs');
        return;
      }
      // Using Function constructor instead of eval for better security
      const total = Function(`'use strict'; return (${cleanInput})`)();
      setTotalMoney(Number(total));
    } catch (error) {
      alert('Invalid input format. Please use format like 50+50+50');
    }
  };

  const addItem = (): void => {
    if (!newItemName.trim() || !newItemCost.trim()) return;
    
    const cost = parseFloat(newItemCost);
    if (isNaN(cost) || cost <= 0) {
      alert('Please enter a valid cost');
      return;
    }
    
    const newItem: Item = {
      id: Date.now(),
      name: newItemName,
      cost: cost
    };
    
    setItems([...items, newItem]);
    setNewItemName('');
    setNewItemCost('');
  };

  const removeItem = (id: number): void => {
    setItems(items.filter(item => item.id !== id));
  };

  const getMoneyBarWidth = (cost: number): string => {
    if (totalMoney <= 0) return '0%';
    return `${(cost / Math.max(totalMoney, totalItemsCost)) * 100}%`;
  };

  const getRequiredMoneyWidth = (): string => {
    if (totalMoney <= 0 || totalItemsCost <= 0) return '0%';
    const maxValue = Math.max(totalMoney, totalItemsCost);
    return `${(totalItemsCost / maxValue) * 100}%`;
  };

  const getAvailableMoneyWidth = (): string => {
    if (totalMoney <= 0) return '0%';
    const maxValue = Math.max(totalMoney, totalItemsCost);
    return `${(totalMoney / maxValue) * 100}%`;
  };

  const handleBackToHome = (): void => {
    // Navigate to the root path
    navigate('/');
  };

  return (
    <>
      <Navbar activePage="money" />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-center">Money Visualizer</h1>
        </div>
        {/* Money Input Section */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Your Money</h2>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={moneyInput}
              onChange={handleMoneyInputChange}
              placeholder="Enter amount (e.g., 50+50+50)"
              className="flex-1 p-2 border rounded"
            />
            <button 
              onClick={calculateTotalMoney}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Calculate
            </button>
          </div>
          <div className="mt-3 font-medium">
            Total: ${totalMoney.toFixed(2)}
          </div>
        </div>
        
        {/* Items Section */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Add Items</h2>
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <input
              type="text"
              value={newItemName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItemName(e.target.value)}
              placeholder="Item name"
              className="flex-1 p-2 border rounded"
            />
            <input
              type="number"
              value={newItemCost}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItemCost(e.target.value)}
              placeholder="Cost"
              className="w-32 p-2 border rounded"
              min="0"
              step="0.01"
            />
            <button 
              onClick={addItem}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Add Item
            </button>
          </div>
        </div>
        
        {/* Items List Section */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Item List</h2>
          {items.length > 0 ? (
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-2 border rounded hover:bg-gray-100">
                  <span className="font-medium">{item.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">${item.cost.toFixed(2)}</span>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 bg-red-100 p-1 rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No items added yet</p>
          )}
        </div>
        
        {/* Visualization Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Money Visualization</h2>
          
          {/* Money comparison bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="font-medium">Your Available Money</span>
              <span className="text-gray-600">${totalMoney.toFixed(2)}</span>
            </div>
            <div className="h-8 bg-gray-200 rounded-lg mb-1 overflow-hidden">
              <div 
                className="h-full bg-blue-500"
                style={{ width: getAvailableMoneyWidth() }}
              ></div>
            </div>
            
            <div className="flex justify-between mb-1 mt-3">
              <span className="font-medium">Total Cost of Items</span>
              <span className="text-gray-600">${totalItemsCost.toFixed(2)}</span>
            </div>
            <div className="h-8 bg-gray-200 rounded-lg overflow-hidden">
              <div 
                className={`h-full ${remaining >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: getRequiredMoneyWidth() }}
              ></div>
            </div>
            
            {/* Money gap indicator */}
            <div className="mt-4 p-3 rounded border border-gray-300">
              {remaining >= 0 ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span>You have <span className="font-bold text-green-600">${remaining.toFixed(2)}</span> extra</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                  <span>You need <span className="font-bold text-red-600">${Math.abs(remaining).toFixed(2)}</span> more</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Individual Item bars */}
          <h3 className="text-md font-semibold mb-3">Item Breakdown</h3>
          {items.length > 0 ? (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={`viz-${item.id}`} className="relative">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-600">${item.cost.toFixed(2)}</span>
                  </div>
                  <div className="h-6 bg-gray-200 rounded overflow-hidden flex items-center">
                    <div 
                      className="h-full bg-green-500"
                      style={{ width: getMoneyBarWidth(item.cost) }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Add items to see your money allocation</p>
          )}
        </div>
        
        {/* Summary Section */}
        <div className="p-4 rounded-lg bg-gray-50">
          <h2 className="text-lg font-semibold mb-3">Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Total Money:</p>
              <p className="text-xl font-bold text-blue-600">${totalMoney.toFixed(2)}</p>
            </div>
            <div>
              <p className="font-medium">Total Cost:</p>
              <p className="text-xl font-bold text-purple-600">${totalItemsCost.toFixed(2)}</p>
            </div>
            <div className="col-span-2">
              <p className="font-medium">
                {remaining >= 0 ? "Remaining:" : "Shortage:"}
              </p>
              <p className={`text-xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(remaining).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoneyVisualizer;