import React from 'react';
import { DollarSign } from 'lucide-react';

export default function IsManualPriceToggle({ p_data, setActive }) {
  return (
    <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
          <DollarSign className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Preço inserido manualmente 
          </label>
          <span className="text-red-500 ml-1">*</span>
        </div>
      </div>
      
      <label className="inline-flex items-center cursor-pointer">
        <input
          name="is_manual_price"
          onChange={(e) => {
            setActive(true);
          }}
          type="checkbox"
          className="sr-only peer"
          defaultChecked={p_data.is_manual_price}
        />
        <div className="relative w-11 h-6 bg-gray-300 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 shadow-sm"></div>
      </label>
    </div>
  );
}