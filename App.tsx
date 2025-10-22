
import React, { useState, useCallback } from 'react';
import { PlusIcon, TrashIcon, CalculatorIcon } from './components/icons';

interface NumberInput {
  id: number;
  value: string;
}

const App: React.FC = () => {
  const [numbers, setNumbers] = useState<NumberInput[]>([
    { id: Date.now() + 1, value: '' },
    { id: Date.now() + 2, value: '' }
  ]);
  const [sum, setSum] = useState<number | null>(null);

  const handleAddNumber = useCallback(() => {
    setNumbers(prevNumbers => [...prevNumbers, { id: Date.now(), value: '' }]);
    setSum(null);
  }, []);

  const handleRemoveNumber = useCallback((id: number) => {
    setNumbers(prevNumbers => prevNumbers.filter(num => num.id !== id));
    setSum(null);
  }, []);

  const handleNumberChange = useCallback((id: number, value: string) => {
    setNumbers(prevNumbers =>
      prevNumbers.map(num => (num.id === id ? { ...num, value } : num))
    );
    setSum(null);
  }, []);

  const handleCalculateSum = useCallback(() => {
    const total = numbers.reduce((acc, current) => {
      const numValue = parseFloat(current.value);
      return acc + (isNaN(numValue) ? 0 : numValue);
    }, 0);
    setSum(total);
  }, [numbers]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-6 transform hover:scale-105 transition-transform duration-300">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Máy Tính Tổng</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Nhập các số để tính tổng</p>
        </header>

        <div className="space-y-4">
          {numbers.map((numberInput, index) => (
            <div key={numberInput.id} className="flex items-center space-x-3">
              <span className="text-gray-500 dark:text-gray-400 font-semibold w-8 text-center">{index + 1}.</span>
              <input
                type="number"
                value={numberInput.value}
                onChange={(e) => handleNumberChange(numberInput.id, e.target.value)}
                placeholder="Nhập số..."
                className="flex-grow p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                onClick={() => handleRemoveNumber(numberInput.id)}
                className="p-3 bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-400 dark:hover:bg-red-900/80 rounded-full transition-colors duration-200 disabled:opacity-50"
                disabled={numbers.length <= 1}
                aria-label="Xóa số"
              >
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleAddNumber}
          className="w-full flex items-center justify-center p-3 bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-900/80 rounded-lg font-semibold transition-colors duration-200"
        >
          <PlusIcon />
          <span className="ml-2">Thêm số</span>
        </button>

        <div className="border-t-2 border-dashed border-gray-200 dark:border-gray-700 my-6"></div>

        {sum !== null && (
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300">Tổng là</p>
            <p className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
              {new Intl.NumberFormat('vi-VN').format(sum)}
            </p>
          </div>
        )}

        <button
          onClick={handleCalculateSum}
          className="w-full flex items-center justify-center p-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <CalculatorIcon />
          <span className="ml-2">Tính Tổng</span>
        </button>
      </div>
    </div>
  );
};

export default App;
